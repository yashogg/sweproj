
import React from 'react';

interface StatusBadgeProps {
  status: 'Now Playing' | 'Upcoming' | 'Finished';
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let bgColor = '';
  let textColor = '';
  
  switch (status) {
    case 'Now Playing':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'Upcoming':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case 'Finished':
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      break;
  }
  
  return (
    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
