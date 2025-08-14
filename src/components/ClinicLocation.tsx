const ClinicLocation: React.FC = () => {
  return (
    <section className="mt-16 px-4 md:px-8 max-w-7xl mx-auto text-center">
      <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-[#1e4d4f] mb-4">
        Find Us on Google Maps
      </h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-sm md:text-base tracking-wide">
        Visit our ultrasound center easily. Use the map below to get directions
        or open it in your preferred maps app.
      </p>

      <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg mb-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.2083256289075!2d84.41236897606184!3d25.027003277820917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d0fe2df32947f%3A0x7ac92f572015ec89!2sVaishnavi%20Imaging%20center(Ultrasound)!5e0!3m2!1sen!2sin!4v1752087831576!5m2!1sen!2sin"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          className="border-none"></iframe>
      </div>
    </section>
  );
};

export default ClinicLocation;
