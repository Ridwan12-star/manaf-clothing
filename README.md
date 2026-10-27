# Manaf Clothing

A responsive website for Manaf Clothing, a fashion designer in Koforidua, Ghana. Built with React, Vite, Tailwind CSS, and Firebase.

## Run locally

Use Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, normally http://localhost:5173.

```sh
npm run build
npm run preview
```

## Website

- Responsive collections, including Vintage Tops, kaftans, occasion wear, and kids' designs.
- Firebase portfolio updates with existing studio photographs available while the connection loads.
- A filterable lookbook and keyboard-accessible image viewer with zoom.
- A persistent selection basket, quantities, measurements, and order creation.
- A WhatsApp enquiry form that prepares a message for the visitor to send.
- Studio login at `/#admin` or `/admin`, using Firebase Authentication.

Collection names and older links are normalized in `src/lib/content.js`, including the previous name for Vintage Tops. Firebase document IDs are preserved. Basket helpers are in `src/lib/cart.js`.

Studio photographs and fallback collections live in `src/data/collections.js`. Website styles are in `src/index.css` and `tailwind.config.js`.

Firebase project configuration lives in `src/firebase.js`. Live order submission requires network access and the project's existing Firestore permissions. The public interface never needs an administrator password.
