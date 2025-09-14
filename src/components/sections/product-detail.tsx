'use client'

import { Typography, Card, CardBody, Chip, Button } from '@material-tailwind/react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description: string
  longDescription: string
  image: string
  category: string
  features: string[]
  specifications: Record<string, string>
}

interface Props {
  product: Product
}

export function ProductDetail({ product }: Props) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Typography
            className="text-blue-gray-600"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <Link href="/" className="hover:text-amber-600">Home</Link>
            {' > '}
            <Link href="/products" className="hover:text-amber-600">Products</Link>
            {' > '}
            <span className="text-blue-gray-900">{product.name}</span>
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative">
            <Card 
              className="overflow-hidden shadow-2xl"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <div className="relative h-96 lg:h-[500px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Chip
                    value={product.category}
                    className="bg-amber-400 text-black"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Typography
                variant="h1"
                className="mb-4 font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-blue-gray-900"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                {product.name}
              </Typography>
              <Typography
                variant="lead"
                className="text-blue-gray-600 mb-6"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                {product.description}
              </Typography>
            </div>

            {/* Features */}
            <div>
              <Typography
                variant="h6"
                className="mb-3 font-semibold text-blue-gray-900"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Key Features
              </Typography>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <Chip
                    key={feature}
                    value={feature}
                    variant="outlined"
                    className="border-amber-400 text-amber-600"
                  />
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-amber-400 text-black hover:bg-amber-500 transition-all duration-300"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <Link href="/contact">Request Custom Quote</Link>
              </Button>
              <Button
                variant="outlined"
                size="lg"
                className="border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-50"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Description */}
          <Card 
            className="shadow-lg"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <CardBody 
              className="p-8"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <Typography
                variant="h5"
                className="mb-4 font-playfair font-bold text-blue-gray-900"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Detailed Description
              </Typography>
              <Typography
                className="text-blue-gray-600 leading-relaxed"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                {product.longDescription}
              </Typography>
            </CardBody>
          </Card>

          {/* Specifications */}
          <Card 
            className="shadow-lg"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <CardBody 
              className="p-8"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <Typography
                variant="h5"
                className="mb-4 font-playfair font-bold text-blue-gray-900"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Specifications
              </Typography>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center border-b border-blue-gray-100 pb-2">
                    <Typography
                      className="font-medium text-blue-gray-700"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      {key}:
                    </Typography>
                    <Typography
                      className="text-blue-gray-600"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      {value}
                    </Typography>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
}