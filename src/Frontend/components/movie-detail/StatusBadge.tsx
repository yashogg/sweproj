
interface StatusBadgeProps {
  status: 'Now Playing' | 'Upcoming' | 'Finished';
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const isUpcoming = status === 'Upcoming';
  
  return (
    <div className="mb-6">
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        isUpcoming 
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-green-100 text-green-800'
      }`}>
        {status}
      </span>
    </div>
  );
};

export default StatusBadge;
