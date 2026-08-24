import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import FocusBand from "@/components/FocusBand";
import Footer from "@/components/Footer";

// Landing page, built up step by step.
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Certifications />
        <FocusBand />
      </main>
      <Footer />
    </>
  );
}
