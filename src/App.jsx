import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="page-enter relative">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,_#f8fafc_0%,_#eff6ff_45%,_#fff7ed_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top_left,_rgba(216,78,85,0.1),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(251,146,60,0.09),_transparent_28%)]" />
      <div className="pulse-orb pointer-events-none absolute left-[-8rem] top-[12rem] -z-10 h-64 w-64 rounded-full bg-rose-300/20 blur-3xl" />
      <div className="pulse-orb pointer-events-none absolute right-[-6rem] top-[36rem] -z-10 h-64 w-64 rounded-full bg-orange-300/20 blur-3xl" />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
