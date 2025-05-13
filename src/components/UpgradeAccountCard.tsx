
import React from 'react';
import { Question } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UpgradeAccountCard = () => {
  return (
    <div className="upgrade-border">
      <div className="upgrade-inner">
        <div className="bg-[#009dff] rounded-lg p-2 mb-2">
          <Question className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold">Upgrade your account</h3>
        <p className="text-sm text-gray-500 mb-4">Get access to all premium features</p>
        <Button 
          className="w-full bg-[#009dff] hover:bg-[#009dff]/90 transition-all transform hover:scale-105 shadow-sm hover:shadow-md"
        >
          Subscribe Now
        </Button>
      </div>
      
      <style jsx>{`
        .upgrade-border {
          border-radius: 16px;
          padding: 2px;
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
        }

        .upgrade-inner {
          background-color: white;
          border-radius: 14px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
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
