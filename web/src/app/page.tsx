import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import ReservaTableView from "@/views/ReservaTableView";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="homeBg">
        <ReservaTableView />
      </div>
    </ProtectedRoute>
  );
}
