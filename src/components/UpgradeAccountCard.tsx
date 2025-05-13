
import React from 'react';
import { Crown } from 'lucide-react';

const UpgradeAccountCard = () => {
  return (
    <div className="rainbow-border relative mb-4 mt-auto mx-auto">
      <div className="card-content">
        <div className="icon-circle">
          <Crown className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-bold mt-3">Upgrade your account</h3>
        <p className="text-sm text-gray-500 my-2 mb-5">Get access to all premium features</p>
        
        <button className="subscribe-btn w-full">
          Subscribe Now
        </button>
      </div>
      
      <style>{`
        .rainbow-border {
          padding: 3px;
          border-radius: 16px;
          background: linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #ff0080);
          background-size: 300% 300%;
          animation: rainbow-border-animation 3s linear infinite;
          width: 280px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .card-content {
          background: white;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          width: 100%;
          height: 100%;
        }

        @keyframes rainbow-border-animation {
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
