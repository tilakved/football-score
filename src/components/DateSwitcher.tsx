import { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { Calendar } from "lucide-react";

const generateDates = () => {
  const today = new Date();
  return Array.from({ length: 6 }, (_, i) => addDays(today, i - 2)); // 2 days before, today, 3 days after
};

export default function DateSwitcher({ onDateChange }: { onDateChange: (date: string) => void }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const dates = generateDates();

  const handleDateClick = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    onDateChange(formattedDate);
  };

  return (
    <div className="mt-4 flex items-center gap-2 overflow-x-auto whitespace-nowrap w-full">
      {dates.map((date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        const isToday = formattedDate === new Date().toISOString().split("T")[0];

        return (
          <button
            key={formattedDate}
            onClick={() => handleDateClick(date)}
            className={`w-full px-4 py-2 rounded-lg text-sm ${selectedDate === formattedDate
              ? "border border-yellow-500 text-yellow-400"
              : "bg-gray-800 text-gray-300"
              }`}
          >
            <div className="text-xs">
              {isToday ? "Today" : format(date, "EEEE")}
            </div>
            <div className="font-bold">{format(date, "dd MMM")}</div>
          </button>
        );
      })}
      <button className="flex items-center px-4 py-1 text-white border border-yellow-500 rounded-lg bg-gray-800 hover:bg-yellow-500/10 transition">
        <Calendar size={18} className="mr-2 text-yellow-400" />
        <span className="flex flex-col flex-start text-left">
          <span className="text-sm font-semibold text-yellow-400">View</span>
          <span className="text-sm font-semibold text-yellow-400">Calendar</span>
        </span>

      </button>

    </div>
  );
}
