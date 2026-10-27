import vintage from "../assets/Y.jpeg";
import kaftan from "../assets/manaff.jpeg";
import grey from "../assets/manafff.jpeg";
import occasion from "../assets/manaf.WEBP";
import kids from "../assets/Kid.jpeg";
import family from "../assets/family.jpeg";
import yellow from "../assets/ye.jpeg";

// Existing studio photographs also keep the portfolio available on slow connections.
export const studioCollections = [
  {
    id: "studio-vintage", slug: "vintage-tops", name: "Vintage Tops",
    description: "Expressive prints. Easy silhouettes. A little character in every detail.",
    images: [{ id: "vintage-print", src: vintage, title: "The Abstract Print Top" }],
  },
  {
    id: "studio-kaftan", slug: "kaftan-for-men", name: "Kaftan For Men",
    description: "Clean lines and quiet confidence, designed around your personal style.",
    images: [{ id: "sand-kaftan", src: kaftan, title: "The Sand Kaftan" }, { id: "grey-kaftan", src: grey, title: "The Slate Kaftan" }, { id: "yellow-set", src: yellow, title: "The Ochre Set" }],
  },
  {
    id: "studio-three-piece", slug: "3-in-1-for-men", name: "3-In-1 For Men",
    description: "A considered statement for celebrations and life's memorable occasions.",
    images: [{ id: "gold-occasion", src: occasion, title: "The Heritage Ensemble" }],
  },
  {
    id: "studio-kids", slug: "kids", name: "Kids",
    description: "Playful colour and thoughtful details for the little ones, too.",
    images: [{ id: "kids-print", src: kids, title: "The Little Statement Set" }, { id: "family-print", src: family, title: "The Family Print Story" }],
  },
];
