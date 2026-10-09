export type DailyUiShot = {
  number: number;
  label: string;
  src: string;
  width: number;
  height: number;
  href: string;
  // The source shot on Dribbble is animated (video/GIF); the saved image is a
  // static frame. Kept here so it can be swapped for motion later if desired.
  animated?: boolean;
};

// Daily UI Challenge — newest first. Images saved under /public/daily-ui/.
// All exported at 4:3 from Dribbble's CDN.
export const dailyUi: DailyUiShot[] = [
  { number: 28, label: "Daily UI #28", src: "/daily-ui/daily-ui-28.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21634388-Daily-UI-Challenge-28" },
  { number: 27, label: "Daily UI #27", src: "/daily-ui/daily-ui-27.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21620822-Daily-UI-Challenge-27", animated: true },
  { number: 26, label: "Daily UI #26", src: "/daily-ui/daily-ui-26.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21614161-Daily-UI-Challenge-26", animated: true },
  { number: 25, label: "Daily UI #25", src: "/daily-ui/daily-ui-25.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21603153-Daily-UI-Challenge-25", animated: true },
  { number: 24, label: "Daily UI #24", src: "/daily-ui/daily-ui-24.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21593460-Daily-UI-Challenge-24" },
  { number: 23, label: "Daily UI #23", src: "/daily-ui/daily-ui-23.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21568429-Daily-UI-Challenge-23", animated: true },
  { number: 22, label: "Daily UI #22", src: "/daily-ui/daily-ui-22.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21561328-Daily-UI-Challenge-22" },
  { number: 21, label: "Daily UI #21", src: "/daily-ui/daily-ui-21.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21549653-Daily-UI-Challenge-21" },
  { number: 20, label: "Daily UI #20", src: "/daily-ui/daily-ui-20.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21540815-Daily-UI-Challenge-20" },
  { number: 19, label: "Daily UI #19", src: "/daily-ui/daily-ui-19.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21529603-Daily-UI-Challenge-19", animated: true },
  { number: 18, label: "Daily UI #18", src: "/daily-ui/daily-ui-18.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21506537-Daily-UI-Challenge-18", animated: true },
  { number: 17, label: "Daily UI #17", src: "/daily-ui/daily-ui-17.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21496190-Daily-UI-Challenge-17" },
  { number: 16, label: "Daily UI #16", src: "/daily-ui/daily-ui-16.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21486948-Daily-UI-Challenge-16" },
  { number: 15, label: "Daily UI #15", src: "/daily-ui/daily-ui-15.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21474218-Daily-UI-Challenge-15" },
  { number: 14, label: "Daily UI #14 (v2)", src: "/daily-ui/daily-ui-14-v2.gif", width: 960, height: 720, href: "https://dribbble.com/shots/21474597-Daily-UI-Challenge-14-v2", animated: true },
  { number: 14, label: "Daily UI #14", src: "/daily-ui/daily-ui-14.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21466181-Daily-UI-Challenge-14" },
  { number: 13, label: "Daily UI #13", src: "/daily-ui/daily-ui-13.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21443966-Daily-UI-Challenge-13" },
  { number: 12, label: "Daily UI #12", src: "/daily-ui/daily-ui-12.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21430230-Daily-UI-Challenge-12" },
  { number: 11, label: "Daily UI #11", src: "/daily-ui/daily-ui-11.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21420682-Daily-UI-Challenge-11" },
  { number: 10, label: "Daily UI #10", src: "/daily-ui/daily-ui-10.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21410454-Daily-UI-Challenge-10" },
  { number: 9, label: "Daily UI #09", src: "/daily-ui/daily-ui-09.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21402196-Daily-UI-Challenge-9" },
  { number: 8, label: "Daily UI #08", src: "/daily-ui/daily-ui-08.gif", width: 1600, height: 1200, href: "https://dribbble.com/shots/21388561-Daily-UI-Challenge-8", animated: true },
  { number: 7, label: "Daily UI #07", src: "/daily-ui/daily-ui-07.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21388323-Daily-UI-Challenge-7" },
  { number: 6, label: "Daily UI #06", src: "/daily-ui/daily-ui-06.png", width: 1600, height: 1200, href: "https://dribbble.com/shots/21370962-Daily-UI-Challenge-6" },
];

export const dribbbleProfile = "https://dribbble.com/dsgnpvmik";
