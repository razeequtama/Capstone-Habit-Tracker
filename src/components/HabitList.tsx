import Button from "./Button";
import { useContext } from "react";
import { DateContext } from "../context/DateContext";
import AddHabit from "./AddHabit";
import HabitDay from "./HabitDay";

export default function HabitList() {
    const context = useContext(DateContext);

    if (!context) {
        return null;
    }

    let { dateData, habits, deleteHabit, dateToString } = context;

    // Get today's date for comparison
    const today = new Date();
    const todayString = dateToString(today);

    // Start of the current week
    const startOfWeek = new Date(dateData);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    let days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const months: string[] = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const handleDeleteHabit = (habitId: string) => {
        if (window.confirm("Are you sure you want to delete this habit?")) {
            deleteHabit(habitId);
        }
    };

    return (
        <div className="mx-5">
            <AddHabit />
            {habits.length === 0 ? (
                <div className="bg-gray-800 mx-0 px-3 py-6 rounded-md text-center">
                    <p className="text-amber-50 text-lg">
                        No habits yet. Add your first habit above!
                    </p>
                </div>
            ) : (
                habits.map((habit) => {
                    return (
                        <div
                            key={habit.id}
                            className="bg-gray-800 mx-0 px-3 py-3 rounded-md mb-4 flex-col gap-2 justify-between md:flex-wrap md:justify-center sm:flex-wrap sm:justify-center"
                        >
                            <div className="flex justify-between items-center px-2">
                                <div className="flex flex-col gap-2 py-2">
                                    <p className="text-amber-50 text-2xl">{habit.name}</p>
                                    <p className="text-amber-50 text-1xl">
                                        {months[dateData.getMonth()]}{" "}
                                        {dateData.getFullYear()}
                                    </p>
                                </div>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteHabit(habit.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                            <div className="flex justify-between flex-wrap">
                                {days.map((dayName, index) => {
                                    const thisDate = new Date(startOfWeek);
                                    thisDate.setDate(
                                        startOfWeek.getDate() + index
                                    );
                                    const dateString = dateToString(thisDate);
                                    const isCompleted =
                                        habit.completedDates[dateString] || false;
                                    const isToday = dateString === todayString;

                                    return (
                                        <HabitDay
                                            key={index}
                                            habitId={habit.id}
                                            date={thisDate}
                                            dayName={dayName}
                                            isCompleted={isCompleted}
                                            isToday={isToday}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}