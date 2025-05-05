
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const UpcomingMovie = () => {
  return (
    <div className="bg-ticketeer-purple-dark p-6 rounded-md">
      <h3 className="font-bold text-xl mb-4 text-white">Coming Soon</h3>
      <Alert className="bg-blue-500/20 border-blue-500 text-white">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This movie is not yet available for booking. Check back closer to the release date.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default UpcomingMovie;
