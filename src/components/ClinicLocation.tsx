import { MapPin, Phone, Globe, Clock, Mail } from "lucide-react";

const ClinicLocation: React.FC = () => {
  return (
    <section className="mt-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-[#1e4d4f] mb-3">
          Find Us on Google Maps
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base tracking-wide">
          Visit our ultrasound center easily. Use the map below to get
          directions or explore our contact details and opening hours.
        </p>
      </div>

      {/* Clinic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Address */}
        <div className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-xl p-5 shadow-sm transition border border-[#42998d]">
          <div className="bg-[#42998d]/10 p-3 rounded-full">
            <MapPin className="w-6 h-6 text-[#42998d]" />
          </div>
          <p className="text-gray-500 text-sm font-medium tracking-wide">
            NH-139, Tiwari Mohalla, Daudnagar, Aurangabad, Bihar
          </p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-xl p-5 shadow-sm transition border border-[#42998d]">
          <div className="bg-[#42998d]/10 p-3 rounded-full">
            <Phone className="w-6 h-6 text-[#42998d]" />
          </div>
          <a
            href="tel:+919876543210"
            className="text-gray-500 text-sm font-medium tracking-wide hover:text-[#0b968d] transition">
            +91 9876543210
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-xl p-5 shadow-sm transition border border-[#42998d]">
          <div className="bg-[#42998d]/10 p-3 rounded-full">
            <Mail className="w-6 h-6 text-[#42998d]" />
          </div>
          <a
            href="mailto:info@vaishnaviimaging.com"
            className="text-gray-500 text-sm font-medium tracking-wide hover:text-[#0b968d] transition">
            info@vaishnaviimaging.com
          </a>
        </div>

        {/* Website */}
        <div className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-xl p-5 shadow-sm transition border border-[#42998d]">
          <div className="bg-[#42998d]/10 p-3 rounded-full">
            <Globe className="w-6 h-6 text-[#42998d]" />
          </div>
          <a
            href="https://www.vaishnaviimagingcenter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 text-sm font-medium tracking-wide hover:text-[#0b968d] transition">
            www.vaishnaviimagingcenter.com
          </a>
        </div>

        {/* Opening Hours */}
        <div className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-xl p-5 shadow-sm transition border border-[#42998d]">
          <div className="bg-[#42998d]/10 p-3 rounded-full">
            <Clock className="w-6 h-6 text-[#42998d]" />
          </div>
          <div className="text-gray-500 text-sm font-medium tracking-wide">
            <p>Mon – Sat: 7:30 AM – 8:00 PM</p>
            <p>Sunday: 9:00 AM – 2:00 PM</p>
          </div>
        </div>

        {/* CTA Buttons - span full width */}
        <div className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-xl p-4 shadow-sm transition border border-[#42998d]">
          <a
            href="https://maps.google.com/?q=Vaishnavi+Imaging+Center"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-[#0b968d] hover:bg-[#02867d] text-white rounded-md text-sm transition tracking-wide font-semibold">
            Get Directions
          </a>
          <a
            href="tel:+919876543210"
            className="px-6 py-2 border border-[#0b968d] text-[#0b968d] hover:bg-[#0b968d] hover:text-white rounded-md text-sm transition tracking-wide font-semibold">
            Call Now
          </a>
        </div>
      </div>

      {/* Grid Layout */}
      <div>
        {/* Google Map */}
        <div className="w-full h-[350px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.2083256289075!2d84.41236897606184!3d25.027003277820917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d0fe2df32947f%3A0x7ac92f572015ec89!2sVaishnavi%20Imaging%20center(Ultrasound)!5e0!3m2!1sen!2sin!4v1752087831576!5m2!1sen!2sin"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            className="border-none"></iframe>
        </div>
      </div>
    </section>
  );
};

export default ClinicLocation;
