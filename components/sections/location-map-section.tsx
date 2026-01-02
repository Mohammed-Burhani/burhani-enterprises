const LocationMapSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[#2C5F7A] mb-16 tracking-wide">
          OUR LOCATION
        </h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            {/* Embedded Google Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8267!2d80.2838!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f446a1c3187%3A0x89a76a2b9c94b7a!2sPerianna%20Maistry%20St%2C%20George%20Town%2C%20Chennai%2C%20Tamil%20Nadu%20600001!5e0!3m2!1sen!2sin!4v1704067200000!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
          
          {/* Location Details */}
          <div className="mt-8 text-center">
            <div className="bg-[#0B3059] text-white rounded-lg py-6 px-8 inline-block">
              <h3 className="text-xl font-semibold mb-2">Visit Our Office</h3>
              <p className="text-blue-100">
                Located in the heart of George Town, Chennai
              </p>
              <p className="text-blue-100 text-sm mt-2">
                Easy access via public transport and major roads
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationMapSection