
import Sidebar from "../components/Sidebar";
import TrendingNews from "../components/TrendingNews";
import MatchPage from "@/components/MatchPage";

export default function Home() {

  return (
    <div className="flex m-4 gap-4">
      <Sidebar />
      <MatchPage />
      <TrendingNews />
    </div>
  );
}
