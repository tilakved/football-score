
import Sidebar from "../components/Sidebar";
import TrendingNews from "../components/TrendingNews";
import MatchPage from "@/components/MatchPage";

export default function Home() {

  return (
    <div className="flex m-4 gap-4 h-screen overflow-hidden" style={{height:"calc(100vh - 32px)"}}>
      <Sidebar />
      <MatchPage />
      <TrendingNews />
    </div>
  );
}
