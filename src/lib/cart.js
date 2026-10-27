import { fashionCopy } from "./content";

export function readCart() {
  try {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!Array.isArray(stored)) return [];
    return stored.filter(item => item && typeof item.id === "string" && typeof item.image === "string").map(item => ({
      ...item, title: fashionCopy(item.title || "Selected design"), category: fashionCopy(item.category || "Manaf Clothing"),
      quantity: Math.min(99, Math.max(1, Math.floor(Number(item.quantity) || 1))),
    }));
  } catch { return []; }
}

export function addSelection(image, category) {
  const items = readCart();
  const id = `design-${image.id}`;
  const existing = items.find(item => item.id === id);
  if (existing) existing.quantity = Math.min(99, existing.quantity + 1);
  else items.push({ id, title: fashionCopy(image.title), image: image.src, category: fashionCopy(category), quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}
