
import React from 'react';
import { Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UpgradeAccountCard = () => {
  return (
    <div className="rainbow-border rounded-lg">
      <div className="bg-white rounded-lg p-4 flex flex-col items-center text-center">
        <div className="bg-[#1d7dff] rounded-full p-2 mb-3">
          <Crown className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold">Upgrade your account</h3>
        <p className="text-sm text-gray-500 mb-4">Get access to all premium features</p>
        <Button 
          className="w-full bg-[#1d7dff] hover:bg-[#0a6eef] transition-all transform hover:scale-105 shadow-sm hover:shadow-md"
        >
          Subscribe Now
        </Button>
      </div>
      
      <style>{`
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
          margin-top: auto;
          margin-bottom: 1rem;
          width: 100%;
          overflow: visible;
        }

        @keyframes rainbow-animation {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </div>
  );
};

export default UpgradeAccountCard;
