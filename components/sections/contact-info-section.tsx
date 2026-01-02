const ContactInfoSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[#2C5F7A] mb-16 tracking-wide">
          CONTACT US
        </h2>
        
        <div className="max-w-2xl mx-auto space-y-12">
          {/* Phone Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              Phone
            </h3>
            <div className="bg-white rounded-lg py-4 px-6 shadow-sm">
              <p className="text-[#0B3059] font-medium text-lg">
                +91 98413 47052 / +91 98415 30723
              </p>
            </div>
          </div>

          {/* Email Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              Email
            </h3>
            <div className="bg-white rounded-lg py-4 px-6 shadow-sm">
              <p className="text-[#0B3059] font-medium text-lg">
                burhanienterprises.hussain@yahoo.com
              </p>
            </div>
          </div>

          {/* Address Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              Address
            </h3>
            <div className="bg-white rounded-lg py-4 px-6 shadow-sm">
              <p className="text-[#0B3059] font-medium text-lg">
                No 7/9, Perianna Maistry Street, Parrys, Chennai - 01
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactInfoSection