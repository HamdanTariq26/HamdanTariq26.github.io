"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Systems from "@/components/Systems";
import FocusBand from "@/components/FocusBand";
import Experience from "@/components/Experience";
import Outreach from "@/components/Outreach";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* dark panel hero */}
        <Hero />
        {/* cream — orientation / about */}
        <About />
        {/* dark panel — capabilities */}
        <Systems />
        {/* cream — selected work */}
        <FocusBand />
        {/* muted panel — trajectory / professional experience */}
        <Experience />
        {/* cream panel — outreach & STEM engagement */}
        <Outreach />
        {/* cream — credentials & professional development */}
        <Certifications />
      </main>
      {/* dark panel — contact + footer */}
      <Footer />
    </>
  );
}
