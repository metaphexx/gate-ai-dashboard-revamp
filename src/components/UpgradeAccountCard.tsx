
import React from 'react';
import { Crown } from 'lucide-react';

const UpgradeAccountCard = () => {
  return (
    <div className="rainbow-border relative mb-4 mt-auto bg-white rounded-xl p-6 shadow-sm text-center w-full md:w-[90%] mx-auto">
      <div className="icon-circle">
        <Crown className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-lg font-bold mt-3">Upgrade your account</h3>
      <p className="text-sm text-gray-500 my-2 mb-5">Get access to all premium features</p>
      
      <button className="subscribe-btn w-full">
        Subscribe Now
      </button>
      
      <style>{`
        .rainbow-border {
          border: 3px solid transparent;
          background: linear-gradient(90deg, #8B5CF6, #D946EF, #F97316, #0EA5E9, #33C3F0, #8B5CF6) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          background-size: 400% 100%;
          animation: rainbow-animation 6s linear infinite;
        }

        @keyframes rainbow-animation {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .icon-circle {
          background: #007bff;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .subscribe-btn {
          background-color: #007bff;
          color: white;
          padding: 12px 20px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 16px;
          border: none;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .subscribe-btn:hover {
          transform: scale(1.02);
          background-color: #0069d9;
          box-shadow: 0 4px 8px rgba(0, 123, 255, 0.25);
        }
      `}</style>
    </div>
  );
};

export default UpgradeAccountCard;
