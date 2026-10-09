import type { CaseStudy } from "./_types";

export const letterClash: CaseStudy = {
  slug: "letter-clash",
  hero: {
    eyebrow: "Case study · Internal tool",
    title: "Letter Clash",
    role: "Design · Frontend · Backend",
    year: "2025",
    stack: ["React", "TypeScript", "Vite", "Zustand", "react-dnd", "Express", "WebSocket", "SQLite"],
    live: { label: "letter-clash.tools.hmn.md", href: "https://letter-clash.tools.hmn.md" },
  },
  summary:
    "A real-time multiplayer word game for the Human Made team. Drag tiles onto the board, beat a 20-second turn clock, and play against colleagues from a shared link, with every move showing up on the other side as it happens.",
  paragraphs: [
    "Letter Clash is Scrabble for a team that spends its day in browser tabs. A game is a link: sign in with your Human Made account, open the link and you're at the board. There is no lobby to configure and no app to install.",
    "The interaction that matters is moving a tile. Letters sit on a wooden rack and you drag them onto the board, where they snap into place. While you're placing a word, your opponent sees the tiles appear as faint ghosts, so a turn feels like someone playing across the table.",
    "Pace is the other design problem. Each turn runs on a 20-second clock, and whatever is left when you submit is added to your score. The bar moves from green to amber to red, and the last few seconds tick quietly. A \"Your Turn!\" prompt brings you back if you were in another tab.",
    "The server owns the game. It holds the board, the racks, the tile bag, the dictionary check and the scoring, and it validates every move before anyone sees it. Clients only send what they placed. That keeps every view identical, and a refresh puts you back in the same game with your rack. Each turn also draws a bonus letter that multiplies any word it appears in, and some racks come with a blank tile.",
    "The host can restart a game or remove a player, and the interface keeps track of who's connected. I designed and built all of it: the React front end with react-dnd and Zustand, and the Express, WebSocket and SQLite backend behind it. It runs on the internal tools platform behind Google sign-in. It is currently desktop-only, because the board and rack need the room.",
  ],
  shots: [
    {
      src: "/case-studies/letter-clash/01-placing-a-word.webp",
      alt: "Letter Clash mid-game: a 15 by 15 board with several words, a green time-bonus bar at the top, the scoreboard, and three tiles placed beside an existing letter with Submit Word and Clear buttons",
      caption:
        "A turn in progress. The bar is the clock and the remaining seconds become bonus points. Placed tiles are highlighted until you submit. Screenshots show a sample game between two demo players.",
      kind: "hero",
    },
    {
      src: "/case-studies/letter-clash/02-live-opponent-view.webp",
      alt: "The same game from the opponent's side, with the other player's three in-progress tiles shown as faint ghosts on the board",
      caption:
        "The other seat. While Maya places a word, Tom watches the tiles arrive as ghosts, before anything is scored.",
      kind: "wide",
    },
    {
      src: "/case-studies/letter-clash/03-turn-prompt.webp",
      alt: "A Your Turn prompt over the dimmed board with a Start My Turn button",
      caption:
        "When it's your move, a prompt takes you straight back into the game, even if you were working in another tab.",
      kind: "wide",
    },
  ],
};
