
interface SynopsisProps {
  description: string;
}

const Synopsis = ({ description }: SynopsisProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
};

export default Synopsis;
