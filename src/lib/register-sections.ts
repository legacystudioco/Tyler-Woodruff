/**
 * Section Registration
 *
 * Import and register sections here in the order they should appear.
 * Each section should be registered with a unique id and order number.
 */

import { Hero } from "@/components/sections/Hero";
import { MeetTheCreative } from "@/components/sections/MeetTheCreative";
import { Projects } from "@/components/sections/Projects";
import { LetsConnect } from "@/components/sections/LetsConnect";
import { TOC } from "@/components/sections/TOC";
import { SectionRegistry } from "./section-registry";

SectionRegistry.register({
  id: "hero",
  order: 0,
  component: Hero,
});

SectionRegistry.register({
  id: "toc",
  order: 1,
  component: TOC,
});

SectionRegistry.register({
  id: "meet-the-creative",
  order: 2,
  component: MeetTheCreative,
});

SectionRegistry.register({
  id: "projects",
  order: 3,
  component: Projects,
});

SectionRegistry.register({
  id: "lets-connect",
  order: 4,
  component: LetsConnect,
});
