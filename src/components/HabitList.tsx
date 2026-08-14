import Button from "./Button";
import { useContext } from "react";
import { DateContext } from "../context/DateContext";

export default function HabitList()
{

    const context = useContext(DateContext);

    if (!context) {
        return null;
    }

    let {dateData} = context;

    // Start of the current week
    const startOfWeek = new Date(dateData);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    let days: string[] = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];

    const months: string[] = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    return (
        <div className="bg-gray-800 mx-5 px-3 py-3 rounded-md flex-col gap-2 justify-between md:flex-wrap md:justify-center sm:flex-wrap sm:justify-center">
            <div className="flex justify-between items-center px-2">
                <div className="flex flex-col gap-2 py-2">
                    <p className="text-amber-50 text-2xl">List 1</p>
                    <p className="text-amber-50 text-1xl">{months[dateData.getMonth()]} {dateData.getFullYear()}</p>
                </div>
                <Button variant="danger">Delete</Button>
            </div>
            <div className="flex justify-between">
                {days.map((dayName, index) => {
                    const thisDate = new Date(startOfWeek);
                    thisDate.setDate(startOfWeek.getDate() + index);

                    return (
                        <Button size="large" key={index}>
                            {dayName} {thisDate.getDate()}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}