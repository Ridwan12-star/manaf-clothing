import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Hero from "./components/sections/Hero";
import ServicesPreview from "./components/sections/ServicesPreview";
import About from "./components/sections/About";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import Gallery from "./components/sections/Gallery";
import OurWork from "./components/sections/OurWork";
import SocialMedia from "./components/sections/SocialMedia";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsappFloat";
import Cart from "./components/Cart";
import AdminDashboard from "./components/AdminDashboard";
import CategoryGallery from "./components/CategoryGallery";
function App() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(() => {
    // Only treat as admin if:
    // - Opened as installed PWA, or
    // - URL explicitly points to admin
    const isPWA =
      window.matchMedia &&
      window.matchMedia("(display-mode: standalone)").matches;
    if (isPWA) return true;
    return window.location.hash === "#admin" || window.location.pathname === "/admin";
  });
  const [selectedCategory, setSelectedCategory] = useState(
    window.location.hash.startsWith("#category/")
      ? window.location.hash.split("/")[1]
      : null
  );
  useEffect(() => {
    // Clear any old persisted admin flag so browser visits don't get stuck in admin
    try {
      localStorage.removeItem("is_admin_mode");
    } catch {}
    const handleHashChange = () => {
      const isCurrentlyAdmin =
        window.location.hash === "#admin" ||
        window.location.pathname === "/admin";
      if (isCurrentlyAdmin) {
        setIsAdmin(true);
      } else if (window.location.hash === "#exit-admin") {
        setIsAdmin(false);
        window.location.hash = "";
      } else if (window.location.hash.startsWith("#category/")) {
        setIsAdmin(false);
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
      // Ensure body scrolling is enabled after preloader
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }, 500);
  };

  // Manage body scroll during preloader
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      // Always ensure scroll is enabled when not loading
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
    
    // Cleanup function to ensure scroll is always enabled
    return () => {
      if (!loading) {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
      }
    };
  }, [loading]);
  
  // Additional safety check - ensure scroll is enabled after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  // #region agent log
  try {
    fetch("http://127.0.0.1:7244/ingest/b5944c08-8a4f-4bff-b0a6-afa3bb47d378", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "debug-session",
        runId: "pre-fix-1",
        hypothesisId: "H1",
        location: "App.jsx:94",
        message: "App render mode",
        data: {
          isAdmin,
          selectedCategory,
          hash: window.location.hash,
          path: window.location.pathname,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
  } catch {}
  // #endregion agent log
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