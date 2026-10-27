// Keep stored collection names and older links compatible with the new wording.
export function fashionCopy(value = "") {
  return String(value)
    .replace(/nice[\s-]+tops?[\s-]+(?:and|&)[\s-]+downs?/gi, "Vintage Tops")
    .replace(/custom[ -]tailored/gi, "custom-designed")
    .replace(/tailoring/gi, "fashion design")
    .replace(/tailored/gi, "designed")
    .replace(/tailors/gi, "fashion designers")
    .replace(/tailor/gi, "fashion designer");
}

export function collectionSlug(name = "") {
  let label = String(name);
  try { label = decodeURIComponent(label); } catch { /* Accept incomplete URLs without breaking the page. */ }
  return fashionCopy(label).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function measurementLabel(mode) {
  return mode === "enter-yourself" ? "Customer measurements" : "Visit fashion designer";
}
