import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { studioCollections } from "../data/collections";
import { collectionSlug, fashionCopy } from "../lib/content";

let currentCollections = studioCollections;
let collectionRequest;
// Keep the unrelated construction photograph's database entry intact while
// omitting it from the public fashion portfolio.
const hiddenPortfolioIds = new Set(["NhHl0iwu0EYGAqzdrRso"]);

function fetchCollections() {
  if (!collectionRequest) {
    collectionRequest = Promise.all([
      getDocs(query(collection(db, "categories"), orderBy("createdAt", "desc"))),
      getDocs(query(collection(db, "portfolio"), orderBy("createdAt", "desc"))),
    ]).then(([categorySnapshot, portfolioSnapshot]) => {
      const portfolio = portfolioSnapshot.docs.filter(document => !hiddenPortfolioIds.has(document.id)).map(document => ({ ...document.data(), id: document.id }));
      const collections = categorySnapshot.docs.map(document => {
        const data = document.data();
        const slug = collectionSlug(data.name);
        const studio = studioCollections.find(item => item.slug === slug);
        const images = portfolio.filter(item => collectionSlug(item.category) === slug && item.imageUrl).map((item, index) => ({
          id: item.id, src: item.imageUrl,
          title: item.title?.trim().length >= 5 ? fashionCopy(item.title.trim()) : `${fashionCopy(data.name)} / ${String(index + 1).padStart(2, "0")}`,
          description: fashionCopy(item.description || ""),
        }));
        return {
          ...data, id: document.id, slug, name: fashionCopy(data.name),
          cover: studio?.images[0]?.src || images[0]?.src,
          description: studio?.description || fashionCopy(data.description || `Discover our ${data.name} collection.`),
          images: images.length ? images : (studio?.images || []),
        };
      });
      const priority = slug => {
        const index = studioCollections.findIndex(item => item.slug === slug);
        return index < 0 ? studioCollections.length : index;
      };
      if (collections.length) currentCollections = collections.sort((a, b) => priority(a.slug) - priority(b.slug));
      return currentCollections;
    }).catch(() => currentCollections);
  }
  return collectionRequest;
}

export function useCollections() {
  const [collections, setCollections] = useState(currentCollections);
  useEffect(() => {
    let active = true;
    fetchCollections().then(items => { if (active) setCollections(items); });
    return () => { active = false; };
  }, []);
  return collections;
}
