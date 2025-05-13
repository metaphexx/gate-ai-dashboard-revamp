
import React from 'react';
import { Crown } from 'lucide-react';

const UpgradeAccountCard = () => {
  return (
    <div className="rainbow-border relative mb-4 mt-auto mx-auto">
      <div className="card-content">
        <div className="icon-circle">
          <Crown className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-base font-semibold text-center mt-2">Upgrade your account</h3>
        <p className="text-gray-500 text-center text-sm mb-4">Get access to all premium features</p>
        
        <button className="subscribe-btn w-full">
          Subscribe Now
        </button>
      </div>
      
      <style>{`
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
          width: 280px;
          box-sizing: border-box;
          height: 280px;
        }

        .card-content {
          background: white;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
        }

        @keyframes rainbow-animation {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .icon-circle {
          background-color: #2563eb;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }

        .subscribe-btn {
          background-color: #2563eb;
          color: white;
          padding: 8px 0;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          border: none;
          transition: all 0.2s ease;
          cursor: pointer;
          width: 100%;
          margin-top: auto;
        }

        .subscribe-btn:hover {
          background-color: #1d4ed8;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};

export default UpgradeAccountCard;
