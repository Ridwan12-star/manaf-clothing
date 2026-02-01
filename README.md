# Moniek - Professional Tailoring Business Website

A modern, mobile-responsive single-page website for Moniek tailoring business built with React, Vite, Tailwind CSS, and Framer Motion.

## 🎨 Features

- **Beautiful Preloader**: Animated loading spinner with rotating rings
- **Sticky Navigation**: Responsive header with mobile hamburger menu
- **Hero Section**: Eye-catching hero with CTA button and smooth animations
- **Services Preview**: Three service cards with numbered badges and hover effects
- **About Section**: Overlapping image layout with content box
- **Why Choose Us**: Four feature cards with animated icons
- **Gallery**: Filterable image gallery with lightbox modal
- **Testimonials**: Auto-sliding carousel with customer reviews
- **Social Media**: Grid with hover overlay effects
- **Footer**: Three-column layout with social links and opening hours
- **Framer Motion Animations**: Smooth scroll animations throughout
- **Fully Responsive**: Optimized for all screen sizes

## 🎨 Color Scheme

- **Primary**: `#9c7d6d` (Brown/Tan)
- **Secondary**: `#f2e1d9` (Light Beige)
- **Background**: White
- **Text**: Black (default), White (on colored backgrounds)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

The project is already set up! Just run:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The website will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📦 Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Swiper** - Testimonials carousel
- **Yet Another React Lightbox** - Gallery lightbox
- **Lucide React** - Icon library

## 📁 Project Structure

```
tailor/
├── src/
│   ├── assets/              # Images and static assets
│   ├── components/
│   │   ├── sections/        # Page sections
│   │   │   ├── Hero.jsx
│   │   │   ├── ServicesPreview.jsx
│   │   │   ├── About.jsx
│   │   │   ├── WhyChooseUs.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── SocialMedia.jsx
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Footer.jsx       # Footer component
│   │   └── Preloader.jsx    # Loading animation
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── package.json
```

## 🎯 Sections Overview

### 1. Preloader
- Beautiful animated spinner with rotating rings
- Displays for 2 seconds on page load
- Smooth fade-out transition

### 2. Header/Navigation
- Sticky positioning
- Logo: "Moniek" in primary color
- Desktop: Horizontal navigation
- Mobile: Hamburger menu with slide-in animation
- Smooth scroll to sections

### 3. Hero Section
- Two-column layout (text left, image right)
- Large heading with primary color accent
- CTA button linking to services
- Scroll indicator animation
- Dark background with image overlay

### 4. Services Preview
- Three service cards in grid layout
- Numbered circular badges (1, 2, 3)
- Hover effects with image zoom
- Professional service images

### 5. About Section
- Desktop: Overlapping image with content box
- Content box with secondary background color
- Mobile: Stacked layout
- "More About Us" CTA button

### 6. Why Choose Us
- Four feature cards with icons
- Icons: Scissors, Sparkles, Ruler, Award
- Hover animations on cards and icons
- Grid layout: 4 columns desktop, 2x2 mobile

### 7. Gallery
- Filterable image grid (All, Custom, Alterations, Designs)
- Lightbox modal for full-size viewing
- Smooth filter transitions
- Hover effects with title overlay

### 8. Testimonials
- Auto-sliding Swiper carousel
- 5-second interval between slides
- Large quotation mark background
- Circular profile images
- Three customer testimonials

### 9. Social Media
- Grid of 6 images (3x2 desktop, 2x3 mobile)
- Hover overlay with platform icons
- Links to Instagram, WhatsApp, TikTok
- Social media links below grid

### 10. Footer
- Dark background with blue gradient overlay
- Three columns: About, Quick Links, Opening Hours
- Social media icons in primary color
- Contact information
- Copyright notice

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#9c7d6d',    // Your primary color
  secondary: '#f2e1d9',  // Your secondary color
}
```

### Changing Fonts

Edit `src/index.css` to import different Google Fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

Then update `tailwind.config.js`:

```javascript
fontFamily: {
  serif: ['Your Font', 'serif'],
  sans: ['Your Font', 'sans-serif'],
}
```

### Adding More Gallery Images

1. Add images to `src/assets/`
2. Import them in `src/components/sections/Gallery.jsx`
3. Add to the `galleryItems` array with appropriate category

### Updating Social Media Links

Edit `src/components/sections/SocialMedia.jsx` and `src/components/Footer.jsx` to update social media URLs.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ✨ Animation Details

All animations use Framer Motion for smooth, performant transitions:

- **Scroll animations**: Elements fade in and slide up when scrolling
- **Hover effects**: Scale, rotate, and color transitions
- **Page transitions**: Smooth entrance animations
- **Carousel**: Auto-sliding with pagination dots
- **Lightbox**: Smooth modal transitions

## 🔧 Troubleshooting

### Images not loading
- Ensure all images are in `src/assets/`
- Check import paths in component files

### Animations not working
- Verify Framer Motion is installed: `npm install framer-motion`
- Check browser console for errors

### Carousel not sliding
- Ensure Swiper is installed: `npm install swiper`
- Check Swiper CSS imports

## 📄 License

This project is created for Moniek tailoring business.

## 🙏 Credits

- Images generated using AI
- Icons from Lucide React
- Fonts from Google Fonts
- Built with React, Vite, and Tailwind CSS

---

**Enjoy your beautiful new website! 🎉**
