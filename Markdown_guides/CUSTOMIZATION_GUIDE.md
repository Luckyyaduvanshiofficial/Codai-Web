# 🎨 Quick Customization Guide - CodaiPro Try-Now Page

This guide shows you how to quickly customize the new Try-Now page design to match your preferences.

## 🌈 Color Customization

### Change Primary Blue Color

Find and replace `#2D7FF9` with your color in `page.tsx`:

```tsx
// Current blue
from-[#2D7FF9] to-[#7C3AED]

// Example: Change to cyan
from-[#06B6D4] to-[#7C3AED]

// Example: Change to emerald
from-[#10B981] to-[#7C3AED]
```

**Locations to update:**
- Hero icon gradient
- Button gradients
- Send button
- Gradient text in heading
- Loading dots
- User message background
- Focus glow effect

### Change Purple Accent

Find and replace `#7C3AED` with your color:

```tsx
// Current purple
to-[#7C3AED]

// Example: Change to indigo
to-[#6366F1]

// Example: Change to violet
to-[#8B5CF6]
```

### Change Pink Accent

Find and replace `#EC4899` in the gradient heading:

```tsx
// Current
from-[#2D7FF9] via-[#7C3AED] to-[#EC4899]

// Remove pink (2-color gradient)
from-[#2D7FF9] to-[#7C3AED]

// Change to orange
from-[#2D7FF9] via-[#7C3AED] to-[#F97316]
```

### Customize Prompt Card Colors

In the prompt cards array (around line 380):

```tsx
{[
  { 
    text: 'Write a Python function to reverse a string',
    icon: '🐍',
    color: 'from-blue-500 to-blue-600',        // Change this
    shadowColor: 'shadow-blue-500/20 hover:shadow-blue-500/40'  // And this
  },
  // ... more cards
]}
```

**Available Tailwind colors:**
- `blue-500`, `purple-500`, `green-500`, `orange-500`
- `red-500`, `yellow-500`, `pink-500`, `indigo-500`
- `cyan-500`, `teal-500`, `emerald-500`, `violet-500`

## 🎭 Animation Customization

### Adjust Animation Speeds

```tsx
// Icon Breathing (currently 2s)
transition={{ 
  duration: 2,  // Change to 1.5 or 3
  repeat: Infinity,
  ease: 'easeInOut',
}}

// Icon Floating (currently 3s)
transition={{ 
  duration: 3,  // Change to 2 or 4
  repeat: Infinity,
  ease: 'easeInOut'
}}

// Gradient Text (in globals.css)
animation: gradient 3s linear infinite;  // Change 3s to your preference
```

### Disable Specific Animations

#### Disable Floating Symbols
Comment out in `page.tsx`:

```tsx
{/* Floating Code Symbols */}
{/* <div className="absolute inset-0 overflow-hidden">
  <FloatingSymbol delay={0}>&lt;/&gt;</FloatingSymbol>
  ...
</div> */}
```

#### Disable Icon Breathing
Remove the animate prop:

```tsx
<motion.div
  className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#2D7FF9] to-[#7C3AED]"
  // Remove this:
  // animate={{ scale: [1, 1.05, 1] }}
  // transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
>
```

#### Disable Orbiting Dots
Comment out the map:

```tsx
{/* Orbiting Dots */}
{/* {[0, 1, 2].map((i) => (
  <motion.div ... />
))} */}
```

## 📝 Text Customization

### Change Heading Text

```tsx
<motion.h1>
  How can I help you code today?  // Change this
</motion.h1>
```

### Change Subheading

```tsx
<motion.p>
  Ask me anything about programming, debugging, or code explanations  // Change this
</motion.p>
```

### Change Placeholder Text

```tsx
<Textarea
  placeholder="Ask me anything about coding..."  // Change this
/>
```

### Customize Prompt Card Text

```tsx
{ 
  text: 'Write a Python function to reverse a string',  // Change this
  icon: '🐍',  // Change emoji
  // ...
}
```

## 🎨 Background Customization

### Change Gradient Background

```tsx
// Light mode gradient
className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"

// Example: Green theme
className="bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50"

// Example: Warm theme
className="bg-gradient-to-br from-orange-50 via-pink-50 to-red-50"

// Example: Monochrome
className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
```

### Disable Grid Pattern

Comment out:

```tsx
{/* Animated Background Grid Pattern */}
{/* <div className="absolute inset-0 bg-[linear-gradient(...)]" /> */}
```

### Change Grid Pattern

```tsx
// Current: 14px × 24px
bg-[size:14px_24px]

// Larger grid
bg-[size:28px_48px]

// Smaller grid
bg-[size:7px_12px]
```

## 🔘 Button Customization

### Change Button Text

```tsx
// Header button
<Button>
  <Sparkles className="w-4 h-4" />
  Try Now  // Change this
</Button>
```

### Remove Sparkle Icon from Button

```tsx
<Button>
  {/* <Sparkles className="w-4 h-4" /> */}
  Try Now
</Button>
```

### Change Button Colors

```tsx
// Current gradient
className="bg-gradient-to-r from-[#2D7FF9] to-[#7C3AED]"

// Solid color
className="bg-blue-600 hover:bg-blue-700"

// Different gradient
className="bg-gradient-to-r from-green-500 to-emerald-600"
```

## 🎯 Icon Customization

### Change Hero Icon

```tsx
// Current: Sparkles
<Sparkles className="w-10 h-10 text-white" />

// Options from lucide-react:
<Code2 className="w-10 h-10 text-white" />      // Code icon
<Zap className="w-10 h-10 text-white" />        // Lightning
<Rocket className="w-10 h-10 text-white" />     // Rocket
<Bot className="w-10 h-10 text-white" />        // Robot
<Brain className="w-10 h-10 text-white" />      // Brain
```

### Change Input Icons

```tsx
// Change sparkle prefix
<Sparkles className="w-5 h-5 text-[#2D7FF9]" />
// to
<MessageSquare className="w-5 h-5 text-[#2D7FF9]" />

// Change microphone
<Mic className="w-5 h-5 text-gray-600 dark:text-gray-400" />
// to
<Camera className="w-5 h-5 text-gray-600 dark:text-gray-400" />
```

## 📐 Size Customization

### Change Hero Icon Size

```tsx
// Current: 80px × 80px
className="relative w-20 h-20"

// Larger: 96px × 96px
className="relative w-24 h-24"

// Smaller: 64px × 64px
className="relative w-16 h-16"
```

### Change Card Spacing

```tsx
// Current gap
className="grid grid-cols-1 sm:grid-cols-2 gap-4"

// More space
className="grid grid-cols-1 sm:grid-cols-2 gap-6"

// Less space
className="grid grid-cols-1 sm:grid-cols-2 gap-2"
```

### Change Input Size

```tsx
// Current height
className="min-h-[50px] max-h-[150px]"

// Taller
className="min-h-[60px] max-h-[200px]"

// Shorter
className="min-h-[40px] max-h-[120px]"
```

## 🎪 Layout Customization

### Change Container Width

```tsx
// Current: max-w-4xl (896px)
<div className="max-w-4xl mx-auto">

// Wider: max-w-5xl (1024px)
<div className="max-w-5xl mx-auto">

// Narrower: max-w-3xl (768px)
<div className="max-w-3xl mx-auto">
```

### Change Prompt Card Layout

```tsx
// Current: 2 columns on desktop
className="grid grid-cols-1 sm:grid-cols-2 gap-4"

// 3 columns on desktop
className="grid grid-cols-1 sm:grid-cols-3 gap-4"

// Single column always
className="grid grid-cols-1 gap-4"
```

## 🌓 Dark Mode Customization

### Adjust Dark Mode Colors

Find dark mode classes and update:

```tsx
// Current
className="dark:bg-gray-900/80"

// Darker
className="dark:bg-gray-950/90"

// Lighter
className="dark:bg-gray-800/70"
```

## 💡 Quick Tips

### Make Animations Faster (Snappier Feel)
- Reduce all `duration` values by 25-50%
- Example: `duration: 0.3` → `duration: 0.15`

### Make Animations Slower (Smoother Feel)
- Increase all `duration` values by 25-50%
- Example: `duration: 0.3` → `duration: 0.45`

### Reduce Motion for Accessibility
Add at the top of the file:

```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Then use:
duration: prefersReducedMotion ? 0 : 0.3
```

### Remove Footer Links
Comment out in `page.tsx`:

```tsx
{/* Minimal Footer - Just Essential Links */}
{/* <motion.div className="text-center mt-4">
  ...
</motion.div> */}
```

### Add More Navigation Links
In the header nav:

```tsx
{['Dashboard', 'Features', 'Docs', 'Pricing', 'Contact'].map((item, i) => (
  // ... existing code
))}
```

## 🔧 Advanced Customization

### Change Font Family
Update in `globals.css`:

```css
body {
  font-family: 'Your Font', system-ui, sans-serif;
}
```

### Add Custom Shadow
```tsx
className="shadow-[0_0_50px_rgba(45,127,249,0.3)]"
```

### Change Border Radius
Find all `rounded-*` classes and update:
- `rounded-2xl` → `rounded-3xl` (more rounded)
- `rounded-xl` → `rounded-lg` (less rounded)

---

## 📚 Resources

- **Tailwind CSS Docs**: https://tailwindcss.com
- **Framer Motion Docs**: https://www.framer.com/motion
- **Lucide Icons**: https://lucide.dev
- **Color Picker**: https://colorhunt.co or https://coolors.co

---

**Pro Tip**: Make one change at a time and test immediately to see the effect! 🎨
