
import React from 'react';
import { Crown } from 'lucide-react';

const UpgradeAccountCard = () => {
  return (
    <div className="flex justify-center w-full my-4">
      <div className="rainbow-border w-[260px] min-h-[280px] bg-transparent">
        <div className="bg-white rounded-[9px] p-4 flex flex-col items-center text-center h-full">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-3">
            <Crown className="text-white w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg mb-1 text-gray-900">Upgrade your account</h3>
          <p className="text-sm text-gray-500 mb-4">Get access to all premium features</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 w-full rounded-md">
            Subscribe Now
          </button>
        </div>
      </div>
      
      <style>
        {`
        .rainbow-border {
          border: 3px solid transparent;
          border-radius: 12px;
          background: linear-gradient(
            90deg,
            #8B5CF6,
            #D946EF,
            #F97316,
            #0EA5E9,
            #33C3F0,
            #8B5CF6
          ) border-box;
          -webkit-mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          background-size: 300% 100%;
          animation: rainbow-animation 3s linear infinite;
          box-sizing: border-box;
        }

        @keyframes rainbow-animation {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        `}
      </style>
    </div>
  );
};

export default UpgradeAccountCard;
