import AnimatedNumber from "./AnimatedNumber";

const PluginStats = () => {
  const stats = [
    {
      value: <AnimatedNumber end={20} suffix="+" delay={100} />,
      label: "Built-in Plugins",
      description: 'Ready to use out of the box'
    },
    {
      value: <AnimatedNumber end={50} suffix="+" delay={100} />,
      label: "Community Plugins",
      description: 'Created by developers worldwide'
    },
    {
      value: "∞",
      label: "Possibilities",
      description: 'Build exactly what you need',
      gradient: true
    }
  ];

  return (
    <div className="py-8 md:py-12 px-4 md:px-0">
      <style>{`
        .divider-with-gradient {
          position: relative;
        }
        
        /* Mobile: horizontal divider */
        @media (max-width: 639px) {
          .divider-with-gradient::before {
            content: '';
            position: absolute;
            top: 0;
            left: 20%;
            right: 20%;
            height: 1px;
            background: linear-gradient(to right, transparent, #e5e7eb, transparent);
          }
          
          .stat-value {
            font-size: 1.875rem !important;
          }
          .stat-label {
            font-size: 0.875rem !important;
          }
        }
        
        /* Desktop: vertical divider */
        @media (min-width: 640px) {
          .divider-with-gradient::before {
            content: '';
            position: absolute;
            left: 0;
            top: 20%;
            bottom: 20%;
            width: 1px;
            background: linear-gradient(to bottom, transparent, #e5e7eb, transparent);
          }
        }
      `}</style>
      <div className="flex flex-col sm:flex-row max-w-3xl mx-auto bg-white rounded-xl border border-gray-100 overflow-hidden">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`flex-1 h-28 sm:h-40 p-4 sm:p-6 flex flex-col items-center justify-center ${
              index !== 0 ? 'divider-with-gradient' : ''
            }`}
          >
            <div className={`stat-value text-2xl sm:text-3xl font-bold mb-1 ${
              stat.gradient 
                ? 'text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text' 
                : 'text-gray-900'
            }`}>
              {stat.value}
            </div>
            <div className="stat-label text-xs sm:text-sm text-gray-600 text-center">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PluginStats;
