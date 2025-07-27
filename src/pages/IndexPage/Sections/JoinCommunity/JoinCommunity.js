import { CheckCircle, FileText, Package, Users } from 'lucide-react';

const JoinCommunity = () => {
  const developerCount = 1000;

  return (
    <section 
      id="join-community"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7c3aed 100%)'
      }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full animate-float"
            style={{
              left: `${[10, 20, 35, 50, 70, 85][i - 1]}%`,
              animationDelay: `${[0, 2, 4, 1, 3, 5][i - 1]}s`,
              animationDuration: `${[10, 12, 9, 11, 8, 13][i - 1]}s`,
              bottom: '-10px'
            }}
          />
        ))}

        {/* Gradient orbs with parallax */}
        <div
          className="absolute w-[200px] h-[200px] rounded-full blur-[40px] animate-orb-float"
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(124, 58, 237, 0.1) 50%, transparent 100%)',
            top: '10%',
            left: '15%',
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full blur-[40px] animate-orb-float"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 100%)',
            top: '60%',
            right: '10%',
          }}
        />
        <div
          className="absolute w-[150px] h-[150px] rounded-full blur-[40px] animate-orb-float"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
            bottom: '20%',
            left: '60%',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent animate-fade-up px-4 sm:px-0">
          Ready to Write Better Tests?
        </h2>
        <p className="text-lg sm:text-xl text-white/85 mb-8 sm:mb-12 leading-relaxed animate-fade-up animation-delay-200 px-4 sm:px-0">
          Join{' '}
          <span className="text-yellow-400 font-bold relative inline-block">
            {developerCount.toLocaleString()}+
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-shimmer" />
          </span>
          {' '}developers who've made their testing experience enjoyable again.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12 animate-fade-up animation-delay-400 w-full max-w-md mx-auto sm:max-w-none">
          <a
            href="/docs/quick-start"
            className="relative inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white rounded-xl font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/40 animate-button-breath group no-underline w-full sm:w-auto transform-gpu"
            style={{ 
              WebkitTransform: 'translateZ(0)',
              willChange: 'transform'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) translateZ(0)';
              e.currentTarget.style.WebkitTransform = 'scale(1.05) translateZ(0)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateZ(0)';
              e.currentTarget.style.WebkitTransform = 'scale(1) translateZ(0)';
            }}
          >
            <span className="button-text">Get Started</span>
            <span className="button-arrow transition-transform duration-300 group-hover:translate-x-1">→</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </a>
          
          <a
            href="/docs"
            className="inline-flex items-center justify-center gap-2 text-white/80 font-medium transition-all duration-300 hover:text-white hover:bg-white/10 px-6 sm:px-4 py-3 rounded-lg backdrop-blur-sm no-underline w-full sm:w-auto text-base"
          >
            <FileText size={16} />
            View Documentation
          </a>
        </div>

        {/* Badges */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 flex-wrap animate-fade-up animation-delay-600">
          <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:-translate-y-0.5 group cursor-default">
            <Users size={14} className="text-yellow-400 sm:w-4 sm:h-4" />
            <span>Active Community</span>
          </div>
          <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:-translate-y-0.5 group cursor-default">
            <Package size={14} className="text-yellow-400 sm:w-4 sm:h-4" />
            <span>100k+ Downloads/Month</span>
          </div>
          <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:-translate-y-0.5 group cursor-default">
            <CheckCircle size={14} className="text-yellow-400 sm:w-4 sm:h-4" />
            <span>Production Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
