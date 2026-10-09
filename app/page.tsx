import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { DailyUi } from "@/components/sections/DailyUi";
import { Experience } from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";
import { ToolsStrip } from "@/components/sections/ToolsStrip";
import { Contact } from "@/components/sections/Contact";
import { FavouriteBooks } from "@/components/sections/FavouriteBooks";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SelectedWork />
      <DailyUi />
      <About />
      <Capabilities />
      <Experience />
      <Testimonials />
      <ToolsStrip />
      <FavouriteBooks />
      <Contact />
    </main>
  );
}
