import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

  const handleLoadingComplete = () => {
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <BrowserRouter>
      {loading && <Preloader onLoadingComplete={handleLoadingComplete} />}

      <div className={loading ? "hidden" : "block"}>
        <Routes>
          {/* Public homepage */}
          <Route
            path="/"
            element={
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
                <WhatsAppFloat />
                <Cart />
              </>
            }
          />

          {/* Category page */}
          <Route
            path="/category/:id"
            element={
              <>
                <Header />
                <CategoryGallery />
                <Footer />
              </>
            }
          />

          {/* Admin dashboard (PWA opens here) */}
          <Route
            path="/admin"
            element={
              <main>
                <AdminDashboard />
              </main>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
