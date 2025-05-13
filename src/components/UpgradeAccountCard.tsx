
import React from 'react';
import { Crown } from 'lucide-react';

const UpgradeAccountCard = () => {
  return (
    <div className="upgrade-card relative mb-4 mt-auto">
      <div className="icon-circle">
        <Crown className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-lg font-bold mt-3">Upgrade your account</h3>
      <p className="text-sm text-gray-500 my-2 mb-5">Get access to all premium features</p>
      
      <button className="subscribe-btn w-full">
        Subscribe Now
      </button>
      
      <style>{`
        .upgrade-card {
          position: relative;
          border-radius: 16px;
          padding: 24px;
          background: white;
          text-align: center;
          overflow: hidden;
          z-index: 1;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .upgrade-card::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(
            135deg,
            #ff6ec4,
            #7873f5,
            #2af598,
            #fec051,
            #ff6ec4
          );
          background-size: 400% 400%;
          animation: borderShift 6s ease infinite;
          z-index: -1;
          border-radius: 18px;
        }

        .icon-circle {
          background: #007bff;
          width: 56px;
          height: 56px;
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
          transform: scale(1.05);
          box-shadow: 0 6px 12px rgba(0, 123, 255, 0.25);
        }

        @keyframes borderShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default UpgradeAccountCard;
