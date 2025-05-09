
interface NotFoundProps {
  title: string;
  message: string;
}

const NotFound = ({ title, message }: NotFoundProps) => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2">{message}</p>
      </div>
    </div>
  );
};

export default NotFound;
