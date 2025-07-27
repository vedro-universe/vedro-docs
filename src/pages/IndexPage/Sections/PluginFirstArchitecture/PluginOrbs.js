import { BarChart3, Chrome, Code, Dices, FileText, FlaskConical, Repeat, Tag } from 'lucide-react';

const PluginOrbs = () => {
  const plugins = {
    inner: [
      { icon: Dices, name: 'Seeder', angle: 0 },
      { icon: Tag, name: 'Tagger', angle: 90 },
      { icon: Repeat, name: 'Repeater', angle: 180 },
      { icon: FileText, name: 'Reporter', angle: 270 },
    ],
    outer: [
      { icon: Code, name: 'HTTPX', angle: 45 },
      { icon: Chrome, name: 'Playwright', angle: 135 },
      { icon: BarChart3, name: 'Allure', angle: 225 },
      { icon: FlaskConical, name: 'xUnit', angle: 315 },
    ],
  };

  const orbitConfigs = {
    inner: { radius: 110, duration: 50, reverse: false },
    outer: { radius: 180, duration: 70, reverse: true },
  };

  const getPosition = (angle, radius) => {
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return {
      left: `calc(50% + ${x}px - 30px)`,
      top: `calc(50% + ${y}px - 30px)`,
    };
  };

  return (
    <div style={{ width: '100%', overflow: 'hidden', padding: '40px 10px' }}>
      <div className="plugin-orbs-container">
        <style>{`
        .plugin-orbs-container {
          position: relative;
          width: 100%;
          max-width: 360px;
          height: 360px;
          margin: 0 auto;
          overflow: visible;
        }

        .orbit-line {
          position: absolute;
          border: 2px dashed rgba(168, 85, 247, 0.35);
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .rotating-container-inner {
          position: absolute;
          inset: 0;
          animation: spin-forward 50s linear infinite;
          z-index: 2;
          pointer-events: none;
        }

        .rotating-container-outer {
          position: absolute;
          inset: 0;
          animation: spin-reverse 70s linear infinite;
          z-index: 1;
          pointer-events: none;
        }

        .plugin-node {
          position: absolute;
          width: 60px;
          height: 60px;
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 500;
          color: #374151;
          cursor: default;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          pointer-events: auto;
          z-index: 10;
        }

        .plugin-node-inner {
          animation: spin-reverse 50s linear infinite;
        }

        .plugin-node-outer {
          animation: spin-forward 70s linear infinite;
        }

        .plugin-node:hover {
          transform: scale(1.15);
          border-color: #a855f7;
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.1);
          z-index: 100;
        }

        .plugin-node:hover,
        .plugin-node:hover.plugin-node-inner,
        .plugin-node:hover.plugin-node-outer {
          animation-play-state: paused;
        }

        .plugin-icon {
          margin-bottom: 4px;
          transition: color 0.3s ease;
          color: #6b7280;
        }

        .plugin-node:hover .plugin-icon {
          color: #a855f7;
        }

        .core {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 90px;
          height: 90px;
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 15px;
          color: white;
          box-shadow: 0 0 60px rgba(139, 92, 246, 0.5);
          z-index: 40;
          text-align: center;
          line-height: 1.2;
          cursor: default;
          transition: all 0.3s ease;
        }

        .core:hover {
          transform: translate(-50%, -50%) scale(1.05);
          box-shadow: 0 0 70px rgba(139, 92, 246, 0.6);
        }
      `}</style>

      {Object.entries(orbitConfigs).map(([orbit, config]) => (
        <div key={orbit}>
          <div 
            className="orbit-line"
            style={{
              width: `${config.radius * 2}px`,
              height: `${config.radius * 2}px`,
            }}
          />
          
          <div className={`rotating-container-${orbit}`}>
            {plugins[orbit].map((plugin, index) => {
              const Icon = plugin.icon;
              
              return (
                <div
                  key={`${orbit}-${index}`}
                  className={`plugin-node plugin-node-${orbit}`}
                  style={getPosition(plugin.angle, config.radius)}
                >
                  <Icon 
                    size={20} 
                    className="plugin-icon"
                  />
                  <div>{plugin.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

        <div className="core">
          Tiny<br />Core
        </div>
      </div>
    </div>
  );
};

export default PluginOrbs;
