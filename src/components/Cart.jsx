import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, MessageCircle, CheckCircle, Copy, ExternalLink } from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState("");

  // Order Details
  const [measurementsMode, setMeasurementsMode] = useState("visit-tailor");
  const [measurements, setMeasurements] = useState({
    chest: "",
    waist: "",
    hips: "",
    length: "",
  });
  const [colorMode, setColorMode] = useState("match-image");
  const [colorHex, setColorHex] = useState("#8B6F47");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const handleCartUpdate = () => {
      const items = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(items);
      updateCartCount(items.length);
    };

    const handleCartOpen = () => {
      setIsOpen(true);
      setIsSuccess(false);
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    window.addEventListener("open-cart", handleCartOpen);
    handleCartUpdate();

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
      window.removeEventListener("open-cart", handleCartOpen);
    };
  }, []);

  const updateCartCount = (count) => {
    const countElements = document.querySelectorAll("#cart-count, #cart-count-mobile");
    countElements.forEach((el) => {
      if (count > 0) {
        el.textContent = count;
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    });
  };

  const removeFromCart = (id) => {
    const items = cartItems.filter((item) => item.id !== id);
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
    updateCartCount(items.length);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const generateOrderId = () => {
    const now = new Date();
    const y = now.getFullYear().toString();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const h = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const sec = String(now.getSeconds()).padStart(2, "0");

    // Using simple timestamp + random for uniqueness
    return `MN-${y}${m}${d}-${h}${min}${sec}`;
  };

  const handleCreateOrder = async () => {
    if (cartItems.length === 0) return;

    const id = generateOrderId();
    const order = {
      id,
      status: "Pending",
      items: cartItems,
      measurementsMode,
      measurements: measurementsMode === "enter-yourself" ? measurements : {},
      colorChoice: {
        mode: colorMode,
        hex: colorHex,
      },
      notes,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "orders"), order);

      // Save locally too
      const existing = JSON.parse(localStorage.getItem("orders") || "[]");
      existing.push(order);
      localStorage.setItem("orders", JSON.stringify(existing));

      setGeneratedId(id);
      setIsSuccess(true);

      // Clear cart
      setCartItems([]);
      localStorage.setItem("cart", JSON.stringify([]));
      updateCartCount(0);
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Failed to generate order. Please check your connection.");
    }
  };

  const sendToWhatsApp = () => {
    const phoneNumber = "233249494505";
    // Sending ONLY the order number as requested
    const message = `Order Number: ${generatedId}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center p-0 md:p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="bg-white w-full md:w-[500px] h-[90vh] md:h-auto max-h-[90vh] rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b">
              <h2 className="text-2xl font-serif font-black text-black flex items-center gap-3">
                <ShoppingCart className="text-primary" size={28} />
                {isSuccess ? "Order Success" : "Your Selection"}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {isSuccess ? (
                /* Success View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-500" size={48} />
                  </div>
                  <h3 className="text-3xl font-serif font-black mb-2">Order Received!</h3>
                  <p className="text-gray-500 mb-8">Your order has been generated successfully.</p>

                  <div className="bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-200 mb-8">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Order Number</p>
                    <p className="text-2xl font-mono font-bold text-black">{generatedId}</p>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={sendToWhatsApp}
                      className="w-full py-5 bg-green-500 text-white rounded-[1.5rem] font-black flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-lg"
                    >
                      <MessageCircle size={24} /> SEND TO WHATSAPP
                    </button>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                      Click the button above to send your order number <br /> directly to our master tailor.
                    </p>
                  </div>
                </motion.div>
              ) : (
                /* Cart Content */
                <>
                  {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingCart size={32} className="text-gray-300" />
                      </div>
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Nothing selected yet</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Items List */}
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group relative">
                            <img src={item.image} className="w-20 h-20 object-cover rounded-xl shadow-sm" alt="" />
                            <div className="flex-1">
                              <h4 className="font-bold text-black">{item.title}</h4>
                              <p className="text-xs text-gray-500 font-medium">{item.category}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-red-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Customize Section */}
                      <div className="pt-6 border-t space-y-6">
                        {/* Measurements */}
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Measurements</p>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => setMeasurementsMode("visit-tailor")}
                              className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${measurementsMode === "visit-tailor" ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-200"}`}
                            >
                              Visit Tailor
                            </button>
                            <button
                              onClick={() => setMeasurementsMode("enter-yourself")}
                              className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${measurementsMode === "enter-yourself" ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-200"}`}
                            >
                              Enter Details
                            </button>
                          </div>
                          {measurementsMode === "enter-yourself" && (
                            <div className="grid grid-cols-2 gap-3 mt-4">
                              {["chest", "waist", "hips", "length"].map(f => (
                                <input
                                  key={f}
                                  placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                                  value={measurements[f]}
                                  onChange={e => setMeasurements({ ...measurements, [f]: e.target.value })}
                                  className="p-3 bg-gray-50 border rounded-xl text-sm"
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Notes */}
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Special Requests</p>
                          <textarea
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="Anything else we should know?"
                            className="w-full p-4 bg-gray-50 border rounded-2xl text-sm h-24 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sticky Actions */}
            {!isSuccess && cartItems.length > 0 && (
              <div className="p-8 border-t bg-white">
                <button
                  onClick={handleCreateOrder}
                  className="w-full py-5 bg-primary text-white rounded-[1.5rem] font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl uppercase tracking-widest text-sm"
                >
                  Generate Order Number
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
