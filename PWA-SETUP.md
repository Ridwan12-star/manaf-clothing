# PWA Setup Guide for Manaf Clothing

## ✅ What's Been Configured

1. **PWA Plugin**: `vite-plugin-pwa` added to `vite.config.js`
2. **Manifest**: `public/manifest.json` created with proper settings
3. **Viewport**: Updated `index.html` with mobile-optimized viewport and PWA meta tags
4. **CSS**: Added styles to prevent screen shaking and horizontal scroll
5. **Touch Events**: Added handlers to prevent zoom and pull-to-refresh

## 📱 Installation Steps

### Step 1: Install PWA Plugin

```bash
npm install vite-plugin-pwa --save-dev
```

### Step 2: Create PWA Icons

You need to create two icon files in the `public` folder:

- `public/icon-192.png` (192x192 pixels)
- `public/icon-512.png` (512x512 pixels)

**Option A: Use the icon generator**
1. Open `create-icons.html` in your browser
2. Click "Download icon-192.png" and save to `public/icon-192.png`
3. Click "Download icon-512.png" and save to `public/icon-512.png`

**Option B: Create from your logo**
1. Use an image editor (Photoshop, GIMP, or online tool like Canva)
2. Create square images (192x192 and 512x512)
3. Use your logo centered on a `#8B6F47` background
4. Save as PNG files in the `public` folder

**Option C: Quick online tool**
- Visit https://realfavicongenerator.net/
- Upload your logo
- Download the generated icons
- Place them in `public/` folder

### Step 3: Build and Test

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🎯 Testing PWA Features

### On Desktop (Chrome/Edge):
1. Open DevTools (F12)
2. Go to "Application" tab
3. Check "Manifest" section - should show your PWA details
4. Check "Service Workers" - should show registered worker
5. Click "Install" button in address bar (if available)

### On Mobile (iOS Safari):
1. Open your website
2. Tap Share button
3. Tap "Add to Home Screen"
4. Open from home screen - should open fullscreen without URL bar

### On Mobile (Android Chrome):
1. Open your website
2. Tap menu (3 dots)
3. Tap "Add to Home Screen" or "Install App"
4. Open from home screen - should open fullscreen without URL bar

## 🔧 Troubleshooting

### URL bar still showing?
- Make sure `display: "standalone"` is in `manifest.json`
- Check that `apple-mobile-web-app-capable` meta tag is set to "yes"
- Clear browser cache and reinstall

### Screen still shaking?
- Check that viewport meta tag has `user-scalable=no`
- Verify CSS `overscroll-behavior: none` is applied
- Test on actual device, not just browser dev tools

### Service worker not registering?
- Make sure `vite-plugin-pwa` is installed
- Check browser console for errors
- Verify you're accessing via HTTPS (or localhost for development)

### Icons not showing?
- Verify icon files exist in `public/` folder
- Check file names match exactly: `icon-192.png` and `icon-512.png`
- Clear browser cache and reinstall PWA

## 📝 Key Features Enabled

✅ **Standalone Display**: Opens fullscreen without browser UI  
✅ **No URL Bar**: Clean app-like experience  
✅ **Prevent Shaking**: Fixed viewport and touch handling  
✅ **No Zoom**: Prevents accidental zoom on double-tap  
✅ **No Pull-to-Refresh**: Prevents accidental refresh  
✅ **Offline Support**: Service worker caches assets  
✅ **Fast Loading**: Cached resources load instantly  

## 🚀 Next Steps

After setup is complete:
1. Test on actual mobile devices
2. Deploy to production (Firebase Hosting, Netlify, Vercel)
3. Ensure HTTPS is enabled (required for PWA)
4. Test "Add to Home Screen" on both iOS and Android
