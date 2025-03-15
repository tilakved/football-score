
import Sidebar from "../components/Sidebar";
import TrendingNews from "../components/TrendingNews";
import MatchPage from "@/components/MatchPage";

export default function Home() {

  return (
    <div className="flex">
      <Sidebar />
      <MatchPage />
      <TrendingNews />
    </div>
  );
}
