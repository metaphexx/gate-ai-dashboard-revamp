
import React from 'react';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const UserProfileBadge = () => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar className="h-9 w-9">
        <AvatarFallback className="bg-gray-100">
          <User size={18} className="text-gray-500" />
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium text-sm">Hari</p>
        <p className="text-xs text-gray-500">Free Plan</p>
      </div>
    </div>
  );
};

export default UserProfileBadge;
