const Section = ({ id, label, title, description, children, bgClass }) => {
  return (
    <section id={id} className={`py-20 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeInUp">
          <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider block mb-4">
            {label}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <div className="max-w-5xl mx-auto animate-fadeInUp">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
