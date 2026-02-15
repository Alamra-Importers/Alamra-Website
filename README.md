# Alamra Importers - Premium Ceremonial Insignia & Bullion Craftsmanship

The official website for **Alamra Importers**, a leading provider of premium ceremonial insignia, bullion crests, badges, and traditional military craftsmanship. Built with modern web technologies for a professional and elegant showcase of our products.

**Live Site**: [alamraimporters.com](https://alamraimporters.com)

## About Alamra Importers

Alamra Importers specializes in premium ceremonial insignia and traditional bullion embroidery craftsmanship. We serve military organizations, law enforcement agencies, educational institutions, and ceremonial groups across Canada with:

- **Bullion Crests**: Hand-embroidered bullion work for police, fire services, military, and institutions
- **Ceremonial Buttons**: Premium buttons for dress uniforms and ceremonial occasions
- **Machined Badges**: Precision-machined insignia meeting government and official specifications
- **Aiguillette & Braids**: Traditional ceremonial cords and braiding

## ✨ Features

- **Modern Design**: Clean, professional interface showcasing traditional craftsmanship
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Product Gallery**: Elegant showcase of 27+ premium products across 5 categories
- **Mobile Drawer Navigation**: Smooth mobile navigation experience
- **Contact System**: Integrated contact form with email functionality
- **SEO Optimized**: Proper meta tags and structured data
- **Performance**: CDN-hosted images and fast loading times
- **Accessibility**: WCAG compliant design and navigation

## 🛠 Tech Stack

- **Framework**: Vite + React 18
- **Routing**: TanStack Router (file-based routing)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Material Tailwind
- **Animations**: Framer Motion
- **Icons**: Heroicons + Lucide React
- **Email**: Nodemailer
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Deployment**: Cloudflare Pages
- **Testing**: Jest + React Testing Library

## 📦 Product Categories

### Bullion Crests (15 products)
- Royal Canadian Legion, Carleton University, Trent University
- Fire Marshall Ontario, Toronto Fire Service
- OPP Teardrop, Orangeville Police, and more
- University crests, Squadron badges, Wings crests

### Buttons (7 products)
- OPP Textured & Untextured
- Fire Department Silver, Fire Marshall Textured
- Police Service Gold, Police Service Antique
- Silver Eagle Button

### Machined Badges (3 products)
- OPP Machined Badge
- Royal Harp Badge
- Swords Badge

### Braids (1 product)
- Canadian Silver Braiding

### Aiguillette (1 product)
- Gold Aiguillette

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Alamra-Website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## 📁 Project Structure

```
src/
├── routes/                 # TanStack Router pages
│   ├── __root.tsx         # Root layout
│   ├── index.tsx          # Home page
│   ├── about.tsx          # About page
│   └── products/          # Products pages
│       ├── index.tsx      # Products grid
│       └── $productId.tsx # Individual product detail
├── components/            # Reusable components
│   ├── layout/           # Layout components (Header, Footer, MobileDrawer)
│   └── sections/         # Page sections
├── data/                 # Data files
│   └── products.ts       # Product data (27 products)
├── types/                # TypeScript types
│   └── Product.ts        # Product interface
├── utils/                # Utility functions
│   └── productValidation.ts # Product validation helpers
└── __mocks__/            # Jest mocks
```

## 🎨 Design System

### Colors
- **Primary**: Amber (Gold) - `#f59e0b` - Represents quality and tradition
- **Secondary**: Blue Gray - `#475569`
- **Background**: Gray shades for sections
- **Text**: Blue Gray variants

### Typography
- **Headings**: Playfair Display (serif) - Elegant and traditional
- **Body**: Inter (sans-serif) - Clean and readable

### Components
- Material Tailwind components for consistency
- Framer Motion for smooth animations
- Responsive grid layouts
- Mobile-first drawer navigation

## 🧪 Testing

Run the test suite:

```bash
npm test                # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

Test files are colocated with source files using the `.test.ts(x)` extension.

### Test Examples
- **Unit Tests**: `src/utils/productValidation.test.ts`
- **Component Tests**: `src/components/layout/MobileDrawer.test.tsx`
- **Integration Tests**: `src/components/layout/Header.test.tsx`

## 🔧 Customization

### Adding New Products

Edit the products array in `src/data/products.ts`:

```typescript
{
  id: "product-id",
  name: "Product Name",
  description: "Short description",
  longDescription: "Detailed description",
  images: ["image1.webp", "image2.webp"],
  thumbnail: "thumbnail.webp",
  category: "Bullion Crests",
  features: ["Feature 1", "Feature 2"],
  specifications: {
    "Materials": "Gold bullion thread",
    "Technique": "Hand embroidered"
  }
}
```

### Styling
- Modify `tailwind.config.js` for theme customization
- Update global styles in your CSS files
- Use Tailwind utility classes for component styling

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px (with drawer navigation)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

The site is deployed on **Cloudflare Pages** and accessible at [alamraimporters.com](https://alamraimporters.com).

### Deployment Configuration

- Platform: Cloudflare Pages
- Build Command: `npm run build`
- Build Output Directory: `dist`
- Node Version: 18+

Images are served via CloudFront CDN for optimal performance.

## 📄 License

This project is private and proprietary to Alamra Importers.

## 🤝 Contributing

This is a private project. For any changes or improvements, please contact the development team.

## 📞 Contact

For inquiries about our products or services, visit [alamraimporters.com](https://alamraimporters.com) and use our contact form.

---

Built with ❤️ for Alamra Importers - Traditional Craftsmanship, Modern Excellence
