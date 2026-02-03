import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db, auth } from "../firebase";
import {
  collection, query, where, getDocs, addDoc,
  serverTimestamp, updateDoc, doc, deleteDoc, orderBy, limit
} from "firebase/firestore";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import {
  Image as ImageIcon, Search, Inbox, CheckCircle2,
  Loader2, LogOut, Lock, Settings, Plus, Trash2, Edit2, Clock, MapPin, Palette, FileText, AlertCircle, Menu, X, ChevronRight, Globe
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [searchId, setSearchId] = useState("");
  const [foundOrder, setFoundOrder] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Recent Orders State
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  // Categories from Firestore
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Upload UI state
  const [uploadPreview, setUploadPreview] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Category Management State
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [editingCatId, setEditingCatId] = useState(null);

  // Auth State
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Categories & Recent Orders
  useEffect(() => {
    if (user) {
      fetchCategories();
      fetchRecentOrders();
    }
  }, [user]);

  const fetchCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const q = query(collection(db, "categories"), orderBy("name"));
      const snap = await getDocs(q);
      const cats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setCategories(cats);

      if (cats.length > 0 && !uploadCategory) {
        setUploadCategory(cats[0].name);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const fetchRecentOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(20));
      const snap = await getDocs(q);
      const orders = snap.docs.map(d => ({ docId: d.id, ...d.data() }));
      setRecentOrders(orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleSearchOrder = async (e) => {
    if (e) e.preventDefault();
    if (!searchId.trim()) return;

    setIsSearching(true);
    try {
      const q = query(collection(db, "orders"), where("id", "==", searchId.trim().toUpperCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setFoundOrder(querySnapshot.docs[0].data());
      } else {
        setFoundOrder(null);
        alert("Order not found.");
      }
    } catch (error) {
      console.error("Error searching order:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName) return;
    setIsAddingCat(true);
    try {
      if (editingCatId) {
        await updateDoc(doc(db, "categories", editingCatId), {
          name: newCatName,
          description: newCatDesc
        });
      } else {
        await addDoc(collection(db, "categories"), {
          name: newCatName,
          description: newCatDesc,
          createdAt: serverTimestamp()
        });
      }
      setNewCatName("");
      setNewCatDesc("");
      setEditingCatId(null);
      await fetchCategories();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsAddingCat(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, "categories", id));
      await fetchCategories();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleActualUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !uploadTitle || !uploadCategory) {
      setUploadMessage("Fields incomplete.");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "manaf-upload");
      formData.append("cloud_name", "dlcj2rtey");

      const response = await fetch("https://api.cloudinary.com/v1_1/dlcj2rtey/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Upload failed");

      await addDoc(collection(db, "portfolio"), {
        title: uploadTitle,
        category: uploadCategory,
        description: uploadDescription,
        imageUrl: data.secure_url,
        createdAt: serverTimestamp()
      });

      setUploadPreview(null);
      setUploadTitle("");
      setUploadDescription("");
      setSelectedFile(null);
      setUploadMessage("Styles Published!");
    } catch (error) {
      setUploadMessage(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (isAuthChecking) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>;

  if (!user) return (
    <section className="min-h-screen flex items-center justify-center bg-[#F8F9FA] p-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="text-primary" size={32} />
          </div>
          <h2 className="text-3xl font-serif font-black text-black uppercase tracking-tight">Login</h2>
        </div>
        <form onSubmit={async (e) => {
          e.preventDefault();
          setIsLoggingIn(true);
          setAuthError("");
          try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
          } catch (err) {
            setAuthError("Invalid credentials.");
          } finally {
            setIsLoggingIn(false);
          }
        }} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 bg-gray-50 border-0 rounded-2xl font-bold" placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 bg-gray-50 border-0 rounded-2xl font-bold" placeholder="Password" required />
          {authError && <p className="text-red-500 text-[10px] font-black uppercase text-center">{authError}</p>}
          <button type="submit" disabled={isLoggingIn} className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl text-xs">
            {isLoggingIn ? "Verifying..." : "Enter Portal"}
          </button>
        </form>
      </motion.div>
    </section>
  );

  const navItems = [
    { id: "upload", icon: Plus, label: "Add Style" },
    { id: "categories", icon: Settings, label: "Your Collections" },
    { id: "orders", icon: Clock, label: "Order Numbers" }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-100 p-6 flex justify-between items-center sticky top-0 z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-black text-xs uppercase">M</div>
          <div>
            <h2 className="text-lg font-black text-black uppercase tracking-tight">MANAF PANEL</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Active</p>
            </div>
          </div>
        </div>

        {/* Menu Toggle (Right Side) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-black hover:bg-gray-100 transition-all shadow-sm"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Slide-out Menu (Right Side) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 bg-white z-[80] shadow-2xl flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-xl font-black text-black uppercase tracking-[0.1em]">Navigation</h3>
                <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center"><X size={20} /></button>
              </div>

              <nav className="flex-1 space-y-3">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
                    className={`w-full flex items-center gap-4 p-5 rounded-3xl transition-all ${activeTab === item.id ? "bg-black text-white shadow-xl" : "text-gray-400 hover:bg-gray-50 hover:text-black"}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeTab === item.id ? "bg-primary/20 text-primary" : "bg-gray-50"}`}>
                      <item.icon size={16} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                    <ChevronRight size={14} className="ml-auto opacity-30" />
                  </button>
                ))}

                {/* Exit to Website Option */}

              </nav>

              <div className="pt-8 border-t border-gray-100">
                <button
                  onClick={() => {
                    signOut(auth);
                    localStorage.removeItem("is_admin_mode");
                    window.location.hash = "";
                    window.location.reload();
                  }}
                  className="w-full flex items-center gap-4 p-5 rounded-3xl text-red-400 hover:bg-red-50 hover:text-red-600 transition-all font-black text-xs uppercase tracking-widest"
                >
                  <div className="w-8 h-8 bg-red-50 flex items-center justify-center rounded-lg"><LogOut size={16} /></div>
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === "upload" && (
            <motion.div key="upload" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-serif font-black text-black mb-6 uppercase tracking-tight">Upload Style</h3>
                <form onSubmit={handleActualUpload} className="space-y-5">
                  <div className="border-2 border-dashed rounded-2xl bg-gray-50/50 text-center hover:bg-gray-100 transition-all cursor-pointer relative overflow-hidden group">
                    <input type="file" accept="image/*" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setUploadPreview(URL.createObjectURL(file));
                        setSelectedFile(file);
                      }
                    }} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    {uploadPreview ? (
                      <div className="p-4">
                        <img src={uploadPreview} className="w-full max-h-64 md:max-h-80 object-cover rounded-xl shadow-md" alt="Preview" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadPreview(null);
                            setSelectedFile(null);
                          }}
                          className="mt-3 text-xs text-red-500 font-bold hover:text-red-700"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div className="p-8 md:p-12">
                        <Plus className="mx-auto text-gray-300 mb-3" size={36} />
                        <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Tap to upload photo</p>
                        <p className="text-gray-300 text-[9px] mt-1">JPG, PNG up to 10MB</p>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Title</label>
                      <input type="text" placeholder="Enter title" value={uploadTitle} onChange={e => setUploadTitle(e.target.value)} className="w-full p-3 md:p-4 bg-gray-50 border-0 rounded-xl font-bold placeholder:text-gray-200 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Collection</label>
                      <select value={uploadCategory} onChange={e => setUploadCategory(e.target.value)} className="w-full p-3 md:p-4 bg-gray-50 border-0 rounded-xl font-bold bg-white text-black text-sm">
                        {isLoadingCategories ? (
                          <option>Loading...</option>
                        ) : categories.length > 0 ? (
                          categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)
                        ) : (
                          <option>No categories available</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <button type="submit" disabled={isUploading || !selectedFile || !uploadTitle || !uploadCategory} className="w-full py-4 md:py-5 bg-black text-white rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                    {isUploading ? "Uploading..." : "Publish To Site"}
                  </button>
                  {uploadMessage && (
                    <p className={`text-center font-black uppercase text-[10px] tracking-[0.2em] mt-2 ${uploadMessage.includes("Error") || uploadMessage.includes("incomplete") ? "text-red-500" : "text-primary"}`}>
                      {uploadMessage}
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === "categories" && (
            <motion.div key="categories" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h3 className="text-2xl font-serif font-black mb-6 uppercase tracking-tight">{editingCatId ? "Edit Info" : "New Collection"}</h3>
                <form onSubmit={handleAddCategory} className="space-y-4">
                  <input type="text" placeholder="Category Name" value={newCatName} onChange={e => setNewCatName(e.target.value)} className="w-full p-4 bg-gray-50 border-0 rounded-2xl font-bold" required />
                  <textarea placeholder="Description" value={newCatDesc} onChange={e => setNewCatDesc(e.target.value)} className="w-full p-4 bg-gray-50 border-0 rounded-2xl font-bold resize-none h-32" />
                  <button type="submit" disabled={isAddingCat} className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl">
                    {isAddingCat ? "Saving..." : editingCatId ? "Update" : "Create"}
                  </button>
                </form>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h3 className="text-2xl font-serif font-black text-black uppercase tracking-tight mb-8">Collections</h3>
                <div className="space-y-4">
                  {categories.map(cat => (
                    <div key={cat.id} className="p-6 bg-gray-50 border-0 rounded-2xl flex justify-between items-center group hover:bg-white hover:shadow-xl transition-all">
                      <div>
                        <h4 className="font-black text-black uppercase tracking-widest text-xs">{cat.name}</h4>
                        <p className="text-[10px] text-gray-400 font-bold tracking-tight mt-1 truncate max-w-[150px]">{cat.description || 'Collection'}</p>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => { setEditingCatId(cat.id); setNewCatName(cat.name); setNewCatDesc(cat.description || ""); }} className="p-3 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full"><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteCategory(cat.id)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "orders" && (
            <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex gap-4 max-w-3xl mx-auto">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input type="text" placeholder="LOOKUP ORDER..." value={searchId} onChange={e => setSearchId(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl font-black text-sm uppercase tracking-widest" />
                </div>
                <button onClick={handleSearchOrder} className="px-8 py-4 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Find</button>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-1 space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {recentOrders.map(order => (
                    <button key={order.docId} onClick={() => setFoundOrder(order)} className={`w-full p-6 rounded-2xl border transition-all text-left ${foundOrder?.id === order.id ? "bg-black text-white border-black shadow-xl" : "bg-white text-black border-gray-100 shadow-sm"}`}>
                      <p className="font-black text-sm tracking-widest">{order.id}</p>
                      <p className="text-[9px] font-bold opacity-40 mt-1 uppercase tracking-widest">{new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                    </button>
                  ))}
                </div>

                <div className="xl:col-span-2">
                  {foundOrder ? (
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden sticky top-6">
                      <div className="bg-black p-10 text-white flex justify-between items-center">
                        <div>
                          <h3 className="text-3xl font-serif font-black">{foundOrder.id}</h3>
                          <p className="text-[10px] font-black uppercase text-primary mt-2">Status: {foundOrder.status}</p>
                        </div>
                        <CheckCircle2 color="#8B6F47" size={32} />
                      </div>
                      <div className="p-10 space-y-10">
                        <div className="grid grid-cols-3 gap-3">
                          {foundOrder.items?.map((item, i) => (
                            <div key={i} className="aspect-square rounded-2xl border-2 border-gray-50 overflow-hidden shadow-sm">
                              <img src={item.image} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                          <p className="text-[10px] font-black text-gray-400 uppercase mb-4">Requests</p>
                          <p className="text-xs font-bold text-black italic leading-relaxed">"{foundOrder.notes || 'None'}"</p>
                        </div>
                        {foundOrder.measurementsMode === 'enter-yourself' && (
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(foundOrder.measurements).map(([k, v]) => (
                              <div key={k} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <p className="text-[8px] font-black text-gray-400 uppercase mb-1">{k}</p>
                                <p className="text-lg font-black text-black">{v || '-'}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-100 text-gray-300">
                      <Inbox size={48} className="mb-4 opacity-50" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em]">Select an order</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
