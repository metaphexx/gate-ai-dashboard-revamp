import React from 'react';
import { Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
const UpgradeAccountCard = () => {
  return <div className="relative overflow-visible mb-4 w-full">
      <div className="rainbow-border">
        <div className="bg-white rounded-lg p-4 flex flex-col items-center text-center relative z-20">
          <div className="bg-[#1d7dff] rounded-full p-2 mb-3">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Upgrade your account</h3>
          <p className="text-sm text-gray-600 mb-4">Get access to all premium features</p>
          <Button className="w-full bg-[#1d7dff] hover:bg-[#0a6eef] transition-all transform hover:scale-105 shadow-sm hover:shadow-md text-white font-medium">
            Subscribe Now
          </Button>
        </div>
      </div>
      
      <style>{`
        .rainbow-border {
          position: relative;
          border-radius: 0.5rem;
          padding: 3px;
          background: linear-gradient(
            90deg,
            #8B5CF6,
            #D946EF,
            #F97316,
            #0EA5E9,
            #33C3F0,
            #8B5CF6
          );
          background-size: 300% 100%;
          animation: rainbow-animation 3s linear infinite;
          margin-bottom: 1rem;
          width: 100%;
          z-index: 10;
        }

        .rainbow-border:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 0.5rem;
          z-index: 5;
        }

        @keyframes rainbow-animation {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </div>;
};
export default UpgradeAccountCard;