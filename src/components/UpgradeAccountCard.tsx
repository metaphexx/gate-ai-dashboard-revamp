
import React from 'react';
import { Crown } from 'lucide-react';

const UpgradeAccountCard = () => {
  return (
    <div className="rainbow-border relative mb-4 mt-auto mx-auto">
      <div className="card-content">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-3">
          <Crown className="text-white w-6 h-6" />
        </div>
        
        <h3 className="text-base font-semibold">Upgrade your account</h3>
        <p className="text-gray-500 text-sm mt-1 mb-4">Get access to all premium features</p>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 w-full rounded-md mt-auto">
          Subscribe Now
        </button>
      </div>
      
      <style jsx>{`
        .rainbow-border {
          border: 3px solid transparent;
          border-radius: 12px;
          background: linear-gradient(90deg, #8B5CF6, #D946EF, #F97316, #0EA5E9, #33C3F0, #8B5CF6) border-box;
          -webkit-mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          background-size: 400% 100%;
          animation: rainbow-animation 3s linear infinite;
          width: 260px;
        }

        .card-content {
          background: white;
          border-radius: 12px;
          padding: 20px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-sizing: border-box;
        }

        @keyframes rainbow-animation {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default UpgradeAccountCard;
