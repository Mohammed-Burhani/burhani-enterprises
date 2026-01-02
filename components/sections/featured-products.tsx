import ProductCard from '../ui/product-card'

const FeaturedProducts = () => {
  const products = [
    {
      title: "High-Precision Digital Caliper",
      description: "The ultimate in precision measurement for quality assurance and machining. We stock instruments from Mitutoyo and BAKER for guaranteed accuracy.",
      buttonText: "Get Quote",
      image: "/home/products/prod-2.png"
    },
    {
      title: "Heavy-Duty Torque Wrench", 
      description: "Essential for critical assembly in Aviation and Petrochemical sectors. We supply calibrated tools from Snap-on and Blue-Point to ensure superior joint integrity.",
      buttonText: "Get Quote",
      image: "/home/products/prod-1.png"
    },
    {
      title: "Bi-Metal Bandsaw Blade",
      description: "Designed for high-speed, durable cutting of various metals. Our blades from BIPICO and Hakanson offer extended life and cleaner cuts in heavy fabrication.", 
      buttonText: "Get Quote",
      image: "/home/products/prod-3.png"
    }
  ]

  return (
    <section className="bg-[#D2E6FB] py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl text-[#0B3059] mb-8 tracking-widest">
          FEATURED PRODUCTS
        </h2>
        <div className="flex justify-center gap-6 flex-wrap">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
              buttonText={product.buttonText}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts