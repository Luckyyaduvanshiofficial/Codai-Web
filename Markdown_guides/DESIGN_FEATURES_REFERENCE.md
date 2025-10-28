# 🎨 CodaiPro Try-Now Page - Visual Design Features Reference

## 🎯 Animation Specifications

### Hero Icon Animations
```
Breathing Animation:
- Duration: 2s
- Scale: 1 → 1.05 → 1
- Infinite loop
- Easing: easeInOut

Floating Animation:
- Duration: 3s
- Y-axis: 0 → -10px → 0
- Infinite loop
- Easing: easeInOut

Glow Pulse:
- Duration: 2s
- Scale: 1 → 1.2 → 1
- Opacity: 0.3 → 0.5 → 0.3
- Infinite loop
- Blur: 2xl (24px)

Orbiting Dots (3 dots):
- Duration: 3s per rotation
- 360° rotation
- 120° spacing between dots
- 0.3s stagger delay
- Size: 2 × 2 (8px × 8px)
```

### Floating Code Symbols
```
Symbols: </>  { }  ( )  ;  [ ]  =>
Animation:
- Start: y: 100vh (bottom)
- End: y: -100vh (top)
- Duration: 15-25s (randomized)
- Infinite loop
- Opacity: 0.1 (10%)
- Font size: 2xl-4xl (24px-36px)
- Random X offset: -50 to +50
```

### Gradient Text Animation
```css
/* Heading Gradient */
background: linear-gradient(
  to right,
  #2D7FF9,  /* Blue */
  #7C3AED,  /* Purple */
  #EC4899   /* Pink */
);
background-size: 200% auto;
animation: gradient 3s linear infinite;

@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

## 🎴 Prompt Cards Color Scheme

| Card | Icon | Accent Color | Shadow |
|------|------|--------------|--------|
| Python | 🐍 | Blue (#3B82F6 → #2563EB) | blue-500/20 → blue-500/40 |
| JavaScript | ⚡ | Purple (#A855F7 → #9333EA) | purple-500/20 → purple-500/40 |
| API | 🚀 | Green (#22C55E → #16A34A) | green-500/20 → green-500/40 |
| Debug | 🐛 | Orange (#F97316 → #EA580C) | orange-500/20 → orange-500/40 |

### Card Hover Effects
```
Scale: 1 → 1.02
Y-translate: 0 → -4px
Shadow: Intensity increases
Ripple: Gradient overlay appears
Duration: 300ms
Easing: ease-in-out
```

## 🌈 Background Gradients

### Light Mode
```css
background: linear-gradient(
  to bottom right,
  #EFF6FF,  /* blue-50 */
  #FAF5FF,  /* purple-50 */
  #FCE7F3   /* pink-50 */
);
```

### Dark Mode
```css
background: linear-gradient(
  to bottom right,
  #030712,  /* gray-950 */
  #1e3a8a,  /* blue-950 */
  #581c87   /* purple-950 */
);
```

### Grid Pattern
```css
background-image:
  linear-gradient(to right, #8080800a 1px, transparent 1px),
  linear-gradient(to bottom, #8080800a 1px, transparent 1px);
background-size: 14px 24px;
mask-image: radial-gradient(
  ellipse 60% 50% at 50% 50%,
  #000 70%,
  transparent 100%
);
```

## 💬 Chat Input Glassmorphism

```css
/* Input Container */
background: rgba(255, 255, 255, 0.8);  /* Light mode */
backdrop-filter: blur(12px);
border-radius: 24px;
border: 1px solid rgba(229, 231, 235, 1);
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Dark Mode */
background: rgba(17, 24, 39, 0.8);
border: 1px solid rgba(55, 65, 81, 1);

/* Focus Glow */
position: absolute;
inset: -4px;
background: linear-gradient(to right, #3B82F6, #A855F7);
opacity: 0 → 0.3;
blur: 24px;
border-radius: 24px;
```

## 🎨 Button Gradient Specs

### Primary CTA Button (Header)
```css
background: linear-gradient(to right, #2D7FF9, #7C3AED);
box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);

/* Hover */
background: linear-gradient(to right, #1F6FE8, #6B2DD4);
box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5);

/* Glow Effect */
background: linear-gradient(to right, #60A5FA, #C084FC);
opacity: 0 → 0.2;
blur: 24px;
```

### Send Button
```css
background: linear-gradient(to right, #2D7FF9, #7C3AED);
box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
size: 40px × 40px;
border-radius: 12px;

/* Hover */
scale: 1.05;
box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5);
```

## 💭 Message Bubble Specs

### User Messages
```css
background: linear-gradient(
  to bottom right,
  #2D7FF9,
  #7C3AED
);
color: white;
padding: 12px 16px;
border-radius: 16px;
box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.2);
animation: slide-in-right;
```

### Assistant Messages
```css
background: rgba(255, 255, 255, 0.8);  /* Light */
background: rgba(17, 24, 39, 0.8);     /* Dark */
backdrop-filter: blur(4px);
border: 1px solid rgba(229, 231, 235, 1);
padding: 12px 16px;
border-radius: 16px;
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
animation: slide-in-left;
```

## 🔄 Loading Animations

### Initial Load (3 Dots)
```
Dot 1: delay 0ms
Dot 2: delay 200ms
Dot 3: delay 400ms

Each dot:
- Size: 12px × 12px
- Color: #2D7FF9
- Scale: 1 → 1.2 → 1
- Opacity: 1 → 0.5 → 1
- Duration: 1s
- Infinite
```

### Typing Indicator
```
Same as above but with:
- Size: 8px × 8px
- Inside glassmorphism bubble
- Gradient color
```

## 📏 Spacing & Sizing

```
Container max-width: 1024px (4xl)
Section padding-y: 32px (py-8)
Card gap: 16px
Icon sizes:
  - Hero: 80px × 80px
  - Avatar: 40px × 40px
  - Button icons: 20px × 20px
Border radius:
  - Cards: 16px (2xl)
  - Input: 24px (3xl)
  - Buttons: 12px (xl)
  - Code blocks: 12px (xl)
```

## 🎭 Transition Timings

```
Instant: 100ms (color changes)
Quick: 200ms (hover states)
Normal: 300ms (scale, translate)
Slow: 500-600ms (page entrance)
Ambient: 2-3s (breathing, pulsing)
Float: 3s (up-down motion)
Drift: 15-25s (floating symbols)
```

## 🎯 Z-Index Layers

```
Background grid: 0
Floating symbols: 0
Main content: 1
Header: 10
Focus glow: -1 (behind input)
Tooltips: 50
Modals: 100
```

## 🌟 Special Effects Summary

1. **Glassmorphism**: backdrop-blur + semi-transparent bg
2. **Gradient Glow**: colored shadow that blurs
3. **Ripple**: gradient overlay on hover
4. **Breathing**: subtle scale animation
5. **Floating**: y-axis drift
6. **Orbiting**: circular path animation
7. **Gradient Text**: animated background position
8. **Slide-in**: x-axis entrance animations
9. **Pulse**: opacity + scale combo
10. **Stagger**: delayed sequential animations

---

## 🚀 Quick Customization Tips

**Change primary color:**
- Find all `#2D7FF9` and replace with your color
- Update gradient stops accordingly

**Adjust animation speed:**
- Breathing: Change `duration: 2` to your preference
- Floating: Change `duration: 3` to your preference

**Modify glow intensity:**
- Adjust opacity values (currently 0.3-0.5)
- Change blur amount (currently 2xl = 24px)

**Customize cards:**
- Update gradient colors in card array
- Change emoji icons
- Modify shadow colors

---

**All animations are GPU-accelerated (transform, opacity) for smooth 60fps performance!** ⚡
