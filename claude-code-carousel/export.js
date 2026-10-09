/* ============================================================
   One-click PNG export.
   Frames render at true LinkedIn pixel size (1080×1080 / 1080×1350)
   but are visually shrunk by a transform on .frame-wrap. html-to-image
   captures an element's own intrinsic box, so we capture the .frame
   directly at pixelRatio 1 and get exact-dimension PNGs.
   ============================================================ */

const toast = document.getElementById("toast");
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function frameByExport(name) {
  return document.querySelector(`.frame[data-export="${name}"]`);
}

// every frame in a concept block (post = 1, carousel = all slides)
function framesInGroup(groupId) {
  const block = document.getElementById(groupId);
  return block ? Array.from(block.querySelectorAll(".frame[data-export]")) : [];
}

async function fontsReady() {
  try {
    await document.fonts.ready;
    // a beat so Fraunces optical sizing settles before raster
    await new Promise((r) => setTimeout(r, 60));
  } catch (_) {}
}

async function capture(frame) {
  const wrap = frame.closest(".frame-wrap");
  // neutralize the preview down-scale and force settled motion
  const prevTransform = wrap ? wrap.style.transform : null;
  if (wrap) wrap.style.transform = "none";
  frame.classList.add("capture");

  const w = frame.offsetWidth;
  const h = frame.offsetHeight;

  // run twice: first pass primes the web-font glyphs into the cache,
  // second pass renders them reliably (known html-to-image behaviour)
  const opts = {
    width: w,
    height: h,
    pixelRatio: 1,
    cacheBust: true,
    backgroundColor: "#151515",
    style: { transform: "none", margin: "0" },
  };
  await window.htmlToImage.toPng(frame, opts);
  const dataUrl = await window.htmlToImage.toPng(frame, opts);

  // restore preview state
  frame.classList.remove("capture");
  if (wrap) wrap.style.transform = prevTransform;

  return { dataUrl, name: frame.dataset.export };
}

function download(dataUrl, name) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `pm-${name}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function exportOne(name) {
  const frame = frameByExport(name);
  if (!frame) return;
  await fontsReady();
  showToast("Rendering…");
  const { dataUrl } = await capture(frame);
  download(dataUrl, name);
  showToast("Saved " + name + ".png");
}

async function exportGroup(groupId, btn) {
  const frames = framesInGroup(groupId);
  if (!frames.length) return;
  await fontsReady();
  if (btn) {
    btn.disabled = true;
  }
  for (let i = 0; i < frames.length; i++) {
    showToast(`Rendering ${i + 1} / ${frames.length}…`);
    const { dataUrl, name } = await capture(frames[i]);
    download(dataUrl, name);
    // stagger so the browser doesn't drop simultaneous downloads
    await new Promise((r) => setTimeout(r, 350));
  }
  if (btn) {
    btn.disabled = false;
  }
  showToast(
    frames.length === 1 ? "Saved" : `Saved ${frames.length} PNGs`
  );
}

document.addEventListener("click", (e) => {
  const one = e.target.closest("[data-dl-one]");
  if (one) {
    exportOne(one.dataset.dlOne);
    return;
  }
  const group = e.target.closest("[data-dl-group]");
  if (group) {
    exportGroup(group.dataset.dlGroup, group);
  }
});

/* ---- ?iso=<frame> : isolate one frame at native size, top-left.
       Handy for pixel-exact manual screenshots / headless capture. ---- */
(function () {
  const want = new URLSearchParams(location.search).get("iso");
  if (!want) return;
  function go() {
    const el = frameByExport(want);
    if (!el) {
      setTimeout(go, 80);
      return;
    }
    const wrap = el.closest(".frame-wrap");
    if (wrap) wrap.style.transform = "none";
    el.classList.add("capture");
    const stage = document.createElement("div");
    stage.style.cssText =
      "position:fixed;left:0;top:0;z-index:99999;background:#151515";
    document.body.appendChild(stage);
    stage.appendChild(el);
    document.documentElement.style.background = "#151515";
    document.body.style.cssText = "margin:0;background:#151515;overflow:hidden";
    document.querySelectorAll(".site-nav,.intro,.concept,.toast").forEach((n) => {
      if (!n.contains(el)) n.remove();
    });
    window.scrollTo(0, 0);
  }
  if (document.readyState === "complete") go();
  else window.addEventListener("load", go);
})();

/* ---- play entrance motion when a frame scrolls into view ---- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) en.target.classList.add("in-view");
    });
  },
  { threshold: 0.25 }
);
document.querySelectorAll(".scaler").forEach((s) => io.observe(s));
