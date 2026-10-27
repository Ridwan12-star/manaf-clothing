import { lazy, Suspense, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/sections/Hero";
import OurWork from "./components/sections/OurWork";
import About from "./components/sections/About";
import ServicesPreview from "./components/sections/ServicesPreview";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import Gallery from "./components/sections/Gallery";
import Contact from "./components/sections/Contact";
import SocialMedia from "./components/sections/SocialMedia";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsappFloat";
import Cart from "./components/Cart";
import CategoryGallery from "./components/CategoryGallery";

const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

function App() {
  const [route, setRoute] = useState(window.location.hash);
  const isAdmin = route === "#admin" || window.location.pathname === "/admin";
  const selectedCategory = route.startsWith("#category/") ? route.slice(10) : null;

  useEffect(() => {
    const updateRoute = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", updateRoute);
    window.addEventListener("popstate", updateRoute);
    return () => {
      window.removeEventListener("hashchange", updateRoute);
      window.removeEventListener("popstate", updateRoute);
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (selectedCategory || isAdmin) window.scrollTo({ top: 0, behavior: "instant" });
      else if (route) document.getElementById(route.slice(1))?.scrollIntoView({ behavior: "auto" });
    });
    return () => cancelAnimationFrame(frame);
  }, [route, selectedCategory, isAdmin]);

  return (
    <MotionConfig reducedMotion="user">
      {isAdmin ? <main><Suspense fallback={<div className="site-container py-28 text-sm text-primary" role="status">Opening the studio…</div>}><AdminDashboard /></Suspense></main> : (
        <>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <Header />
          <main id="main-content">
            {selectedCategory ? <CategoryGallery key={selectedCategory} categoryId={selectedCategory} /> : (
              <>
                <Hero />
                <OurWork />
                <About />
                <ServicesPreview />
                <WhyChooseUs />
                <Gallery />
                <Contact />
                <SocialMedia />
              </>
            )}
          </main>
          <Footer />
          <WhatsAppFloat />
          <Cart />
        </>
      )}
    </MotionConfig>
  );
}

export default App;
