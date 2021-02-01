import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  colors?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  colors,
}) => {
  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-3">
      <div className="flex flex-row bg-white shadow-sm rounded p-4">
        <div
          className={`flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl ${
            colors ?? 'bg-blue-100 text-blue-500'
          }`}
        >
          {icon}
        </div>
        <div className="flex flex-col flex-grow ml-4">
          <div className="text-sm text-gray-500 font-bold">{title}</div>
          <div className="font-bold text-lg">{value}</div>
        </div>
      </div>
    </div>
  );
};
