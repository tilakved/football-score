import { Bookmark, ChevronRight } from "lucide-react";
import bannerNewsImage from "../assets/images/news_banner.png";
import image1 from "../assets/images/new_image_1.jpg";
import image2 from "../assets/images/new_image_2.jpg";
import image3 from "../assets/images/new_image_3.jpg";
import image4 from "../assets/images/new_image_4.jpg";
import image5 from "../assets/images/new_image_5.jpg";

const bannerNews = {
    id: 1,
    title: "Results And Scores From The Premier League….!!",
    image: bannerNewsImage,
    time: "5 Hours Ago",
    filled: false
}
const newsData = [
    {
        id: 2,
        title: "Here Are The Top 100 Players And Managers",
        image: image1,
        time: "11 Oct 2023, 06:00 AM",
        filled: false
    },
    {
        id: 3,
        title: "Results And Scores From The Premier League….!!",
        image: image2,
        time: "10 Oct 2023, 09:00 PM",
        filled: false
    },
    {
        id: 4,
        title: "Join Or Start A Competition Now!",
        image: image3,
        time: "10 Oct 2023, 02:40 PM",
        filled: false

    },
    {
        id: 5,
        title: "Results And Scores From The Premier League….!!",
        image: image4,
        time: "09 Oct 2023, 08:12 AM",
        filled: false

    },
    {
        id: 6,
        title: "Results And Scores From The Premier League….!!",
        image: image5,
        time: "09 Oct 2023, 02:00 PM",
        filled: false

    },
];

export default function TrendingNews() {
    return (
        <div className="bg-darker text-black dark:text-white p-4 max-w-[300px] rounded-2xl bg-gray-100 dark:bg-gray-900">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold ">Trending News</h3>
                <span className="text-primary text-xl"><ChevronRight/></span>
            </div>
            <div key={bannerNews.id} className="flex items-center gap-4 flex-col">
                <img
                    src={bannerNews.image}
                    alt={bannerNews.title}
                    className="w-full h-32 rounded-lg object-cover"
                />
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <h4 className="text-sm font-semibold ">{bannerNews.title}</h4>
                        <p className="text-xs text-gray-400">{bannerNews.time}</p>
                    </div>
                    <Bookmark className="text-primary w-5 h-5" />
                </div>
            </div>
            <div className="space-y-4">
                {newsData.map((news, index) => (
                    <div key={news.id} className="flex items-center gap-4">
                        <img
                            src={news.image}
                            alt={news.title}
                            className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold ">{news.title}</h4>
                            <p className="text-xs text-gray-400">{news.time}</p>
                        </div>
                        <Bookmark className="text-primary w-5 h-5" />
                    </div>
                ))}
            </div>
        </div>
    );
}
