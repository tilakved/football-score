import { useState } from "react";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const generateDates = () => {
  const today = new Date();
  return Array.from({ length: 6 }, (_, i) => addDays(today, i - 2)); // 2 days before, today, 3 days after
};

export default function DateSwitcher({ onDateChange }: { onDateChange: (date: string) => void }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dates = generateDates();

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateChange(format(date, "yyyy-MM-dd"));
  };

  return (
    <div className="relative w-full flex items-center gap-2 overflow-x-auto whitespace-nowrap">
      {/* Quick Date Selection Buttons */}
      {dates.map((date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        const isToday = formattedDate === format(new Date(), "yyyy-MM-dd");

        return (
          <button
            key={formattedDate}
            onClick={() => handleDateClick(date)}
            className={`w-full px-4 py-2 rounded-lg text-sm ${
              format(selectedDate, "yyyy-MM-dd") === formattedDate
                ? "border border-yellow-500 text-yellow-400"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            <div className="text-xs">{isToday ? "Today" : format(date, "EEEE")}</div>
            <div className="font-bold">{format(date, "dd MMM")}</div>
          </button>
        );
      })}

      {/* View Calendar Button */}
      <button
        onClick={() => setIsCalendarOpen(true)}
        className="flex items-center px-4 py-1 text-white border border-yellow-500 rounded-lg bg-gray-800 hover:bg-yellow-500/10 transition"
      >
        <CalendarIcon size={18} className="mr-2 text-yellow-400" />
        <span className="flex flex-col flex-start text-left">
          <span className="text-sm font-semibold text-yellow-400">View</span>
          <span className="text-sm font-semibold text-yellow-400">Calendar</span>
        </span>
      </button>

      {/* Calendar Pop-up (Centered & Responsive) */}
      {isCalendarOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="flex flex-col bg-gray-900 p-8 rounded-lg shadow-lg">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                if (date) {
                  handleDateClick(date);
                  setIsCalendarOpen(false); // Close the pop-up
                }
              }}
              inline
              className="w-full text-black"
            />
            <button
              onClick={() => setIsCalendarOpen(false)}
              className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
