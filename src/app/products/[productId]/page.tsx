import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductDetail } from '@/components/sections/product-detail'
import { notFound } from 'next/navigation'

const products = [
  {
    id: "1",
    name: "Paris",
    description: "Embroidered bullion crest with the finest materials, showcasing intricate detail work and premium gold threading.",
    longDescription: "This exquisite Paris crest represents the pinnacle of embroidery craftsmanship. Created using traditional bullion threading techniques passed down through generations, each piece features hand-selected premium materials including genuine gold thread and the finest silk backing. The intricate detail work showcases our commitment to preserving classical embroidery arts while meeting modern quality standards.",
    image: "/1.jpg",
    category: "Institutional",
    features: ["Bullion Threading", "Premium Materials", "Custom Design", "Hand Finished"],
    specifications: {
      "Dimensions": "4\" x 3\"",
      "Materials": "Gold bullion thread, silk backing",
      "Technique": "Hand embroidered",
      "Finish": "Professional backing with attachment points"
    }
  },
  {
    id: "2", 
    name: "Carleton",
    description: "A badge created for Carleton university with the utmost precision, featuring the university's official crest and colors.",
    longDescription: "Commissioned by Carleton University, this badge exemplifies our ability to work with institutional clients to create pieces that honor tradition while meeting contemporary needs. Every element has been carefully researched and approved by university officials to ensure historical accuracy and brand compliance.",
    image: "/2.jpg",
    category: "University",
    features: ["University Official", "Precision Crafted", "Authentic Colors", "Brand Compliant"],
    specifications: {
      "Dimensions": "3.5\" x 2.5\"",
      "Materials": "Polyester thread, cotton backing",
      "Technique": "Machine embroidered with hand finishing",
      "Finish": "Heat-sealed edges with velcro backing"
    }
  },
  {
    id: "3",
    name: "Corrections",
    description: "Machined Badge for the Ontario Corrections Office, meeting all official specifications and durability requirements.",
    longDescription: "This government-grade badge for the Ontario Corrections Office demonstrates our capability to meet stringent official requirements. Built to withstand daily professional use while maintaining a distinguished appearance, this piece undergoes rigorous quality testing to ensure it meets all government specifications.",
    image: "/3.jpg",
    category: "Government",
    features: ["Official Specification", "Durable Construction", "Government Grade", "Quality Tested"],
    specifications: {
      "Dimensions": "4\" x 2.75\"",
      "Materials": "Heavy-duty polyester, reinforced backing",
      "Technique": "Machine embroidered",
      "Finish": "Reinforced edges with secure attachment system"
    }
  },
]

interface Props {
  params: {
    productId: string
  }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    productId: product.id,
  }))
}

export function generateMetadata({ params }: Props) {
  const product = products.find(p => p.id === params.productId)
  
  if (!product) {
    return {
      title: 'Product Not Found - Alamra Embroidery'
    }
  }

  return {
    title: `${product.name} - Alamra Embroidery`,
    description: product.description,
  }
}

export default function ProductPage({ params }: Props) {
  const product = products.find(p => p.id === params.productId)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </main>
  )
}