
interface StatusBadgeProps {
  status: 'Now Playing' | 'Upcoming' | 'Finished';
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let colorClasses = '';
  
  switch (status) {
    case 'Now Playing':
      colorClasses = 'bg-green-100 text-green-800';
      break;
    case 'Upcoming':
      colorClasses = 'bg-blue-100 text-blue-800';
      break;
    case 'Finished':
      colorClasses = 'bg-gray-100 text-gray-800';
      break;
  }
  
  return (
    <div className="mb-6">
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses}`}>
        {status}
      </span>
    </div>
  );
};

export default StatusBadge;
