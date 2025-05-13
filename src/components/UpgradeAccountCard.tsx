
import React from 'react';
import { Crown } from 'lucide-react';

const UpgradeAccountCard = () => {
  return (
    <div className="flex justify-center w-full my-4">
      <div className="rainbow-border p-[2px] rounded-xl w-[270px] min-h-[240px] overflow-visible">
        <div className="bg-white rounded-xl p-4 text-center flex flex-col items-center justify-between h-full">
          <div className="bg-blue-500 p-2 rounded-full text-white">
            <Crown size={20} />
          </div>
          <div className="mt-3 font-semibold text-black">Upgrade your account</div>
          <div className="text-sm text-gray-500 mb-3">Get access to all premium features</div>
          <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 w-full">
            Subscribe Now
          </button>
        </div>
      </div>
      
      <style>
        {`
        .rainbow-border {
          border: 3px solid transparent;
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
