import { Check, X } from 'lucide-react';

const FeaturePoint = ({ isPositive, children }) => {
  const Icon = isPositive ? Check : X;
  const iconColor = isPositive ? 'text-emerald-600' : 'text-rose-500';
  const bgColor = isPositive ? 'bg-emerald-50' : 'bg-rose-50';

  return (
    <li className="flex items-start gap-3 group cursor-default">
      <div className={`${bgColor} rounded-full p-1 transition-transform duration-200 group-hover:scale-110 transform-gpu`}>
        <Icon className={`w-4 h-4 ${iconColor}`} strokeWidth={3} />
      </div>
      <span className="text-gray-600 text-[15px] leading-relaxed">{children}</span>
    </li>
  );
};

export default FeaturePoint;
