/* ============================================================
   Carousel content + renderer.
   Each carousel is data; render() builds true-size 1080×1350
   slide frames into #carousels, on-brand and export-ready.

   Slide block types:
     cover   — big title slide (eyebrow, display, subhead, swipe)
     step    — numbered how-to step (kicker, display, body, optional cmd/tools)
     split   — before/after two-up
     quote   — large pull statement
     day     — diary entry (day label + project + line)
     end     — closing CTA slide
   ============================================================ */

const PM = '<svg><use href="#pm" /></svg>';

const CAROUSELS = [
  {
    id: "c1",
    n: "Carousel 01",
    title: "How I use Claude Code as a designer",
    slides: [
      {
        type: "cover",
        eyebrow: "A designer's workflow",
        title: "How I use<br />Claude&nbsp;Code<br />as a designer.",
        sub: "Five ways it earns its place in my day, from a designer who ships the front-end he draws.",
      },
      {
        type: "quote",
        kicker: "Why",
        text: "A mockup is a picture of the thing. I'd rather put the thing itself in front of people.",
        foot: "So I prototype in code, and Claude Code does the parts I shouldn't.",
      },
      {
        type: "step",
        n: "01",
        kicker: "Scaffold",
        title: "It writes the boilerplate.",
        body: "I describe the layout in plain language. It returns semantic markup and the Tailwind to match, so I start from a real surface, not a blank file.",
        cmd: "build the settings page from this Figma frame",
      },
      {
        type: "step",
        n: "02",
        kicker: "Wire",
        title: "It connects the data.",
        body: "A static comp becomes a working one. Real state, real lists, real empty states, the cases a flat mockup quietly skips.",
        tools: ["React", "TypeScript", "SQLite", "WebSocket"],
      },
      {
        type: "step",
        n: "03",
        kicker: "Extract",
        title: "It does the tedious typing.",
        body: "Pull 70 pages of copy out of a source PDF and structure it as page elements. Seconds, not days. I keep my hands on the design.",
        cmd: "pull copy from the source pdf, structure as pages",
      },
      {
        type: "step",
        n: "04",
        kicker: "Iterate",
        title: "It changes ten things at once.",
        body: "“Tighten the type scale, swap the radius to 14, restate the spacing on a 4px grid.” I review the diff, I keep what reads.",
      },
      {
        type: "step",
        n: "05",
        kicker: "Ship",
        title: "It exports the artifact.",
        body: "Print-ready PDF through headless Chrome. A live URL the team can click. The design leaves as something usable, not a flat export.",
      },
      {
        type: "end",
        title: "Design the thing.<br />Let it type.",
        sub: "I care about clarity, restraint, and the rhythm of an interface. Claude Code buys back the time to get those right.",
      },
    ],
  },

  {
    id: "c2",
    n: "Carousel 02",
    title: "From Figma to live prototype in an afternoon",
    slides: [
      {
        type: "cover",
        eyebrow: "Process · Sparrow",
        title: "From Figma<br />to a live<br />prototype<br />in an afternoon.",
        sub: "How one internal tool went from frames to a working surface the team could actually use.",
      },
      {
        type: "step",
        n: "01",
        kicker: "Morning",
        title: "The frames are done.",
        body: "Pins on a PDF, a comment composer, a version switch. It reads right in Figma. None of it does anything yet.",
      },
      {
        type: "step",
        n: "02",
        kicker: "Translate",
        title: "Frames become components.",
        body: "I hand the layout to Claude Code and it returns React that matches: the viewer, the composer anchored to a pin, the thread.",
        tools: ["React", "TypeScript", "Tailwind", "PDF.js"],
      },
      {
        type: "step",
        n: "03",
        kicker: "The detail",
        title: "Click anywhere, the composer opens at the pin.",
        body: "Eyes and cursor stay together. That interaction only got designed once I could feel it, not when I drew it.",
      },
      {
        type: "split",
        kicker: "What changed",
        before: { tag: "In Figma", line: "Looks finished. Answers nothing about how it feels." },
        after: { tag: "In the browser", line: "The team pins a comment, threads a reply, switches drafts." },
      },
      {
        type: "end",
        title: "By the afternoon,<br />it was real.",
        sub: "Feedback lives on the page now, where the thing you're talking about actually is.",
      },
    ],
  },

  {
    id: "c3",
    n: "Carousel 03",
    title: "5 things Claude Code does so I can design",
    slides: [
      {
        type: "cover",
        eyebrow: "Delegation",
        title: "5 things<br />Claude&nbsp;Code<br />does so I<br />can design.",
        sub: "The work that used to eat the hours between having an idea and seeing it.",
      },
      {
        type: "step",
        n: "01",
        kicker: "Extract",
        title: "Reads the source.",
        body: "Copy out of a PDF, structured as semantic page elements.",
        meta: "Saved: a week of retyping.",
      },
      {
        type: "step",
        n: "02",
        kicker: "Scaffold",
        title: "Writes the markup.",
        body: "Semantic HTML and the styles to match, from a plain-language brief.",
        meta: "Saved: the blank-file friction.",
      },
      {
        type: "step",
        n: "03",
        kicker: "Wire",
        title: "Connects the state.",
        body: "Real data, real lists, the empty and error states a comp skips.",
        meta: "Saved: the prototype's missing 40%.",
      },
      {
        type: "step",
        n: "04",
        kicker: "Refactor",
        title: "Restates the system.",
        body: "Tokens, spacing, the type scale, applied across every file at once.",
        meta: "Saved: an afternoon of find-and-replace.",
      },
      {
        type: "step",
        n: "05",
        kicker: "Export",
        title: "Ships the artifact.",
        body: "Print-ready PDF, a deployable build, a link people can open.",
        meta: "Saved: the whole handoff step.",
      },
      {
        type: "end",
        title: "None of it<br />is the design.",
        sub: "That part is still mine. The point is to spend more of the day on it.",
      },
    ],
  },

  {
    id: "c4",
    n: "Carousel 04",
    title: "Mockups lie. Prototypes don't.",
    slides: [
      {
        type: "cover",
        eyebrow: "A point of view",
        title: "Mockups lie.<br />Prototypes<br />don't.",
        sub: "An argument for designing in something the team can actually click.",
      },
      {
        type: "quote",
        kicker: "The problem",
        text: "A static comp shows the happy path and hides everything that makes a product hard.",
        foot: "Loading. Empty. Error. Too much data. None of it lives in a rectangle.",
      },
      {
        type: "step",
        n: "01",
        kicker: "What a mockup skips",
        title: "The states between the states.",
        body: "What does it do while it loads? When the list is empty? When the name is too long? A picture can't answer.",
      },
      {
        type: "step",
        n: "02",
        kicker: "What a prototype forces",
        title: "Decisions, early.",
        body: "The moment it's clickable, the hard questions show up while they're still cheap to change.",
      },
      {
        type: "split",
        kicker: "In a review",
        before: { tag: "Mockup", line: "“Looks great.” Everyone nods. Nobody learned anything." },
        after: { tag: "Prototype", line: "“Wait, what happens if I click that twice?” Now we know." },
      },
      {
        type: "end",
        title: "Put a working<br />surface in front<br />of people.",
        sub: "Not just a picture of one. Claude Code is how I get there in an afternoon.",
      },
    ],
  },

  {
    id: "c5",
    n: "Carousel 05",
    title: "A week of designing with Claude Code",
    slides: [
      {
        type: "cover",
        eyebrow: "A working week",
        title: "A week<br />designing with<br />Claude&nbsp;Code.",
        sub: "Five days at the seam between design, motion, and front-end. Real internal tools, real users.",
      },
      {
        type: "day",
        day: "Monday",
        project: "Sparrow",
        title: "Turned frames into a clickable PDF reviewer.",
        body: "Pins, threads, the composer that opens right at the pin. By lunch the team was leaving comments.",
      },
      {
        type: "day",
        day: "Tuesday",
        project: "Letter Clash",
        title: "Got the tiles to feel like magnets.",
        body: "Motion as part of the UI, not decoration. Tuned the spring until dropping a tile felt physical.",
      },
      {
        type: "day",
        day: "Wednesday",
        project: "Playbook",
        title: "Set 70 pages of print type in the browser.",
        body: "Claude Code pulled the copy; I handled the grid, the floats, the rhythm. Exported a print-ready PDF.",
      },
      {
        type: "day",
        day: "Thursday",
        project: "Brand guidelines",
        title: "Made the brand system its own source of truth.",
        body: "A business-card generator, an asset library, tokens that the site and the docs both read from.",
      },
      {
        type: "day",
        day: "Friday",
        project: "Daily UI",
        title: "Shipped a small thing for myself.",
        body: "One interaction, designed and built end to end. The fastest way I know to keep the craft sharp.",
      },
      {
        type: "end",
        title: "Five days.<br />Five live<br />surfaces.",
        sub: "The work I'm proudest of is the work nobody notices is designed. It just feels obvious.",
      },
    ],
  },
];

/* ---------- slide renderers ---------- */

function progress(i, total) {
  let dots = "";
  for (let k = 0; k < total; k++) {
    dots += `<span class="dot${k === i ? " on" : ""}"></span>`;
  }
  return `<span class="progress">${dots}</span>`;
}

function head(left, right) {
  return `<div class="f-head">${left}${right}</div>`;
}

function foot(i, total) {
  return `<footer class="f-foot">
      <span>linkedin.com/in/rejnold</span>
      <span class="step-meta">${progress(i, total)}<span class="slide-num">${String(
    i + 1
  ).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span></span>
    </footer>`;
}

function renderSlide(s, i, total, carousel) {
  const logo = `<span class="logo">${PM}</span>`;
  let body = "";

  switch (s.type) {
    case "cover":
      body = `
        <div class="f-body">
          ${s.eyebrow ? `<p class="kicker">${s.eyebrow}</p>` : ""}
          <h3 class="display d-lg">${s.title}</h3>
          <p class="lede muted">${s.sub}</p>
          <p style="margin-top:36px"><span class="swipe">Swipe <span class="arrow">→</span></span></p>
        </div>`;
      break;

    case "step":
      body = `
        <div class="f-body">
          <p class="kicker">${s.kicker}</p>
          <h3 class="display d-md">${s.title}</h3>
          <p class="lede muted">${s.body}</p>
          ${
            s.cmd
              ? `<div class="cmd"><span class="prompt">$</span> ${s.cmd}<span class="caret"></span></div>`
              : ""
          }
          ${
            s.tools
              ? `<div class="tools">${s.tools
                  .map((t) => `<span class="chip">${t}</span>`)
                  .join("")}</div>`
              : ""
          }
          ${s.meta ? `<p class="lede" style="font-size:24px;margin-top:32px">${s.meta}</p>` : ""}
        </div>`;
      break;

    case "quote":
      body = `
        <div class="f-body">
          ${s.kicker ? `<p class="kicker">${s.kicker}</p>` : ""}
          <h3 class="display d-md">${s.text}</h3>
          ${s.foot ? `<p class="lede muted">${s.foot}</p>` : ""}
        </div>`;
      break;

    case "split":
      body = `
        <div class="f-body">
          ${s.kicker ? `<p class="kicker">${s.kicker}</p>` : ""}
          <div class="split">
            <div class="ghost">
              <span class="tag">${s.before.tag}</span>
              <p class="big">${s.before.line}</p>
            </div>
            <div>
              <span class="tag">${s.after.tag}</span>
              <p class="big">${s.after.line}</p>
            </div>
          </div>
        </div>`;
      break;

    case "day":
      body = `
        <div class="f-body">
          <p class="day">${s.day} · ${s.project}</p>
          <h3 class="display d-md">${s.title}</h3>
          <p class="lede muted">${s.body}</p>
        </div>`;
      break;

    case "end":
      body = `
        <div class="f-body">
          <h3 class="display d-lg">${s.title}</h3>
          <p class="lede muted">${s.sub}</p>
          <p class="lede" style="margin-top:40px;font-size:26px">
            Paweł Mikołajek · <span class="markline">live prototypes by Claude Code</span>
          </p>
        </div>`;
      break;
  }

  const eyebrow =
    s.type === "cover" || s.type === "end"
      ? `<span class="name" style="font-family:var(--font-display);font-size:26px;letter-spacing:var(--tracking-display)">Paweł Mikołajek</span>`
      : `<span class="eyebrow">Claude Code · designer</span>`;

  return `
    <div class="scaler" data-kind="slide">
      <div class="frame-wrap">
        <article class="frame slide grain" data-export="${carousel.id}-${String(
    i + 1
  ).padStart(2, "0")}">
          <div class="pad">
            ${head(logo, eyebrow)}
            ${body}
            ${foot(i, total)}
          </div>
        </article>
      </div>
      <div class="slide-cap">
        ${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}
        <button class="mini-dl" data-dl-one="${carousel.id}-${String(i + 1).padStart(
    2,
    "0"
  )}">PNG</button>
      </div>
    </div>`;
}

function renderCarousels() {
  const root = document.getElementById("carousels");
  root.innerHTML = CAROUSELS.map((c) => {
    const slides = c.slides
      .map((s, i) => renderSlide(s, i, c.slides.length, c))
      .join("");
    return `
      <div class="concept" id="${c.id}">
        <div class="concept-head">
          <span class="idx">${c.n}</span>
          <h2>${c.title}</h2>
          <span class="kind">${c.slides.length} slides · 1080×1350</span>
          <button class="btn dl-all" data-dl-group="${c.id}">Download all PNGs</button>
        </div>
        <div class="rail">${slides}</div>
      </div>`;
  }).join("");
}

renderCarousels();
