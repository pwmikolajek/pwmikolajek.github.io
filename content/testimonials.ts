export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Square, pre-greyscaled photo in /public/testimonials. */
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Pawel is nothing short of a world-class illustrator and designer. His strong work ethic, love of new technology, and helpfulness make him an invaluable team member. I constantly find myself in awe of his work and can never wait to see what next project he works on.",
    name: "Nicolas Mansfield",
    role: "Head of Design",
    company: "Webstacks",
    avatar: "/testimonials/nicolas-mansfield.webp",
  },
  {
    quote:
      "Pawel is an incredibly detail-oriented designer. I’ve had the pleasure of working with him on a number of projects and he has always delivered exceptional results. The speed at which he works never impacts the quality of his deliverables, and he places the user at the very center of everything he dreams up. An absolute pleasure to work with.",
    name: "Elika Dizechi",
    role: "Marketing Manager",
    company: "HubSpot",
    avatar: "/testimonials/elika-dizechi.webp",
  },
  {
    quote:
      "I worked with Pawel on DJI’s enterprise-insights.dji.com content platform. Pawel led all the web page designs with great sense in graphics as well as his in-depth understanding of my content team’s needs. He responded with valuable feedback and really efficient implementations.",
    name: "Hailey Peng",
    role: "Customer Insights Manager",
    company: "DJI",
    avatar: "/testimonials/hailey-peng.webp",
  },
  {
    quote:
      "Pawel has done several design projects for us and always done a fabulous job. On time, on budget, and high-quality work. Thoroughly recommend.",
    name: "Natalie (Krag) Lyall",
    role: "Head of Content",
    company: "Ogilvy Asia",
    avatar: "/testimonials/natalie-lyall.webp",
  },
];
