import { useContext } from "react";
import { DateContext } from "../context/DateContext";

type HabitDayProps = {
  habitId: string;
  date: Date;
  dayName: string;
  isCompleted: boolean;
  isToday: boolean;
};

export default function HabitDay({
  habitId,
  date,
  dayName,
  isCompleted,
  isToday,
}: HabitDayProps) {
  const context = useContext(DateContext);

  if (!context) {
    return null;
  }

  const { toggleHabitDay, dateToString } = context;

  const handleClick = () => {
    const dateString = dateToString(date);
    toggleHabitDay(habitId, dateString);
  };

  // Determine button styling based on completed and today states
  let buttonClasses =
    "px-4 py-3 mx-0.5 my-1 rounded-md transition-all cursor-pointer border-2 font-semibold text-sm";

  if (isCompleted && isToday) {
    // Completed AND today: green with ring
    buttonClasses +=
      " bg-green-600 text-white border-green-600 ring-2 ring-green-400 hover:bg-green-700";
  } else if (isCompleted) {
    // Completed but not today: green
    buttonClasses +=
      " bg-green-600 text-white border-green-600 hover:bg-green-700";
  } else if (isToday) {
    // Today but not completed: gray with ring
    buttonClasses +=
      " bg-gray-600 text-white border-gray-600 ring-2 ring-blue-400 hover:bg-gray-700";
  } else {
    // Not completed, not today: default gray
    buttonClasses +=
      " bg-gray-600 text-white border-gray-600 hover:bg-gray-700";
  }

  return (
    <button onClick={handleClick} className={buttonClasses}>
      {dayName} {date.getDate()}
    </button>
  );
}
