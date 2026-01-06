import { ArrowRight } from "lucide-react"

const ContactSection = () => {
  return (
    <section className="bg-[#D2E6FB] py-16" id="enquirynow">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl text-[#0B3059] mb-12 tracking-widest uppercase">
          Send us your queries
        </h2>
        <div className="max-w-md mx-auto">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-[#2C5F7A] bg-white text-gray-700 placeholder-gray-400"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-[#2C5F7A] bg-white text-gray-700 placeholder-gray-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-[#2C5F7A] bg-white text-gray-700 placeholder-gray-400"
            />
            <textarea
              placeholder="Message"
              className="w-full px-4 py-3 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-[#2C5F7A] bg-white text-gray-700 placeholder-gray-400"
              rows={4}
            />
            <button
              type="submit"
              className="w-full bg-[#0B3059] text-white py-3 rounded-md font-semibold transition-all duration-300 text-sm tracking-wider relative group flex gap-1 items-center justify-center ease-in-out overflow-hidden"
            >
              SUBMIT
              <ArrowRight className="translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection