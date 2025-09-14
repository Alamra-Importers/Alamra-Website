# Alamra Embroidery - Premium Custom Embroidery Website

A modern, responsive website showcasing premium custom embroidery, badges, and precision craftsmanship. Built with Next.js 14, TypeScript, and Material Tailwind for a professional and elegant user experience.

## ✨ Features

- **Modern Design**: Clean, professional interface with Material Tailwind components
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Product Showcase**: Elegant gallery of featured embroidery work
- **Contact System**: Integrated contact form with email functionality
- **SEO Optimized**: Proper meta tags and structured data
- **Performance**: Optimized images and fast loading times
- **Accessibility**: WCAG compliant design and navigation

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Material Tailwind
- **Icons**: Heroicons
- **Email**: Nodemailer
- **Fonts**: Google Fonts (Inter, Playfair Display)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd alamra-embroidery
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── products/          # Products pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Loading component
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── theme-provider.tsx # Material Tailwind provider
└── styles/               # Additional styles
```

## 🎨 Design System

### Colors
- **Primary**: Amber (Gold) - `#f59e0b`
- **Secondary**: Blue Gray - `#475569`
- **Background**: Gray shades for sections
- **Text**: Blue Gray variants

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
- Material Tailwind components for consistency
- Custom animations and transitions
- Responsive grid layouts

## 📧 Contact Form

The contact form uses Nodemailer to send emails through Gmail SMTP. Make sure to:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password for the application
3. Use the App Password in your environment variables

## 🔧 Customization

### Adding New Products
Edit the products array in:
- `src/components/sections/featured-work.tsx` (homepage)
- `src/components/sections/products-grid.tsx` (products page)
- `src/app/products/[productId]/page.tsx` (individual products)

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/app/globals.css` for global styles
- Use Material Tailwind's theming system for component styles

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 📄 License

This project is private and proprietary to Alamra Embroidery.

## 🤝 Contributing

This is a private project. For any changes or improvements, please contact the development team.

---

Built with ❤️ for Alamra Embroidery