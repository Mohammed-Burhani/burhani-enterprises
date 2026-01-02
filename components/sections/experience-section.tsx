const ExperienceSection = () => {
  const stats = [
    {
      number: "20+",
      label: "Years",
      description: "Operating since 2004, building deep industry knowledge and reliability"
    },
    {
      number: "15",
      label: "Brands", 
      description: "Authorized dealers for a massive portfolio of premium global and domestic manufacturers"
    },
    {
      number: "10+",
      label: "Sectors",
      description: "Providing critical supplies to Oil & Gas, Aviation, Thermal Power, Automobile, and Pharmaceutical industries"
    }
  ]

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl text-[#0B3059] mb-16 tracking-widest uppercase">
          Our Experience
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="text-6xl font-black text-[#0B3059] mb-4 tracking-wider"
              >
                {stat.number}
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                {stat.label}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection