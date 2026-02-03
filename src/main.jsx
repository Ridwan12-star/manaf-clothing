import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Prevent zoom on double tap (iOS Safari)
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// Prevent pull-to-refresh on mobile (but allow normal scrolling)
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  const touchY = e.touches[0].clientY;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Only prevent if scrolling down from top
  if (touchY > touchStartY && scrollTop === 0) {
    e.preventDefault();
  }
}, { passive: false});

// Prevent horizontal scroll/shaking
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  const touchX = e.touches[0].clientX;
  const deltaX = Math.abs(touchX - touchStartX);
  const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
  
  // Prevent horizontal scroll if vertical scroll is intended
  if (deltaX > deltaY) {
    e.preventDefault();
  }
}, { passive: false });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
