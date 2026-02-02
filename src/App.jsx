import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Hero from "./components/sections/Hero";
import ServicesPreview from "./components/sections/ServicesPreview";
import About from "./components/sections/About";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import Gallery from "./components/sections/Gallery";
import OurWork from "./components/sections/OurWork";
import Testimonials from "./components/sections/Testimonials";
import SocialMedia from "./components/sections/SocialMedia";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsappFloat";

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <>
      {loading && <Preloader onLoadingComplete={handleLoadingComplete} />}

      <div className={loading ? "hidden" : "block"}>
        <Header />
        <main>
          <Hero />
          <ServicesPreview />
          <OurWork />
          <About />
          <WhyChooseUs />
          
          <Gallery />
          
          <SocialMedia />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  );
}

export default App;
