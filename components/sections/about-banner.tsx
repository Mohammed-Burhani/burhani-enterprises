const AboutBanner = () => {
  return (
    <section className="bg-white px-6 py-8">
      <div className="container mx-auto">
        <div className="bg-[url(/about/banner.png)] bg-cover bg-center min-h-[400px] rounded-lg flex items-center justify-end relative">
          <div className="bg-linear-to-r from-black/40 lg:from-transparent lg:via-transparent to-black/50 absolute inset-0 w-full h-full rounded-lg" />
          
          <div className="z-10 text-center lg:text-end py-12 lg:py-0 px-12">
            <h1 className="text-3xl font-bold text-white mb-6">
              INDUSTRIAL SOLUTIONS - CHENNAI
            </h1>
            <p className="text-sm text-gray-200 mb-8 max-w-xl mx-auto leading-relaxed">
              Since 2004, Burhani Enterprises has been a trusted partner for 
              India&apos;s most demanding industries. From our base in George Town, 
              Chennai, we provide authorized access to the world&apos;s leading hand 
              tools, cutting tools, and MRO solutions. We don&apos;t just supply tools; 
              we add value to your entire production chain.
            </p>
            <button className="bg-[#0B3059] text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0B3059] transition-all duration-300">
              EXPLORE OUR PRODUCTS
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutBanner