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
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsappFloat";
import Cart from "./components/Cart";
import AdminDashboard from "./components/AdminDashboard";
import CategoryGallery from "./components/CategoryGallery";

function App() {
  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(() => {
    return (
      localStorage.getItem("is_admin_mode") === "true" ||
      window.location.hash === "#admin" ||
      window.location.pathname === "/admin"
    );
  });

  const [selectedCategory, setSelectedCategory] = useState(
    window.location.hash.startsWith("#category/")
      ? window.location.hash.split("/")[1]
      : null
  );

  useEffect(() => {
    // 🔥 Detect if app is opened as PWA
    const isPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    // 🔒 Force admin mode when PWA opens
    if (isPWA) {
      setIsAdmin(true);
      localStorage.setItem("is_admin_mode", "true");
    }

    const handleHashChange = () => {
      const isCurrentlyAdmin =
        window.location.hash === "#admin" ||
        window.location.pathname === "/admin";

      if (isCurrentlyAdmin) {
        setIsAdmin(true);
        localStorage.setItem("is_admin_mode", "true");
      } else if (window.location.hash === "#exit-admin") {
        setIsAdmin(false);
        localStorage.removeItem("is_admin_mode");
        window.location.hash = "";
      } else if (window.location.hash.startsWith("#category/")) {
        setIsAdmin(false);
        localStorage.removeItem("is_admin_mode");
      }

      if (window.location.hash.startsWith("#category/")) {
        setSelectedCategory(window.location.hash.split("/")[1]);
      } else {
        setSelectedCategory(null);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <>
      {loading && <Preloader onLoadingComplete={handleLoadingComplete} />}

      <div className={loading ? "hidden" : "block"}>
        {isAdmin ? (
          <main>
            <AdminDashboard />
          </main>
        ) : selectedCategory ? (
          <>
            <Header />
            <CategoryGallery categoryId={selectedCategory} />
            <Footer />
          </>
        ) : (
          <>
            <Header />
            <main>
              <Hero />
              <OurWork />
              <ServicesPreview />
              <About />
              <WhyChooseUs />
              <Gallery />
              <SocialMedia />
            </main>
            <Footer />
          </>
        )}

        {/* Shared UI (hidden in Admin mode) */}
        {!isAdmin && (
          <>
            <WhatsAppFloat />
            <Cart />
          </>
        )}
      </div>
    </>
  );
}

export default App;
