
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UpgradeAccountCard = () => {
  return (
    <div className="upgrade-border">
      <div className="upgrade-inner">
        <div className="bg-[#009dff] rounded-full p-3">
          <HelpCircle className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mt-3">Upgrade your account</h3>
        <p className="text-sm text-gray-500 my-2 mb-5">Get access to all premium features</p>
        
        <button className="upgrade-button">
          Subscribe Now
        </button>
      </div>
      
      <style>{`
        .upgrade-border {
          border-radius: 16px;
          padding: 3px;
          background: linear-gradient(270deg,
            #ff6ec4,
            #7873f5,
            #2af598,
            #fec051,
            #ff6ec4);
          background-size: 600% 600%;
          animation: rainbow-border 8s ease infinite;
          margin-top: auto;
          margin-bottom: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .upgrade-inner {
          background-color: white;
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .upgrade-button {
          background-color: #007bff;
          color: white;
          padding: 12px 24px;
          font-weight: 600;
          font-size: 16px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          width: 100%;
        }

        .upgrade-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 12px rgba(0, 123, 255, 0.25);
        }

        @keyframes rainbow-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default UpgradeAccountCard;
