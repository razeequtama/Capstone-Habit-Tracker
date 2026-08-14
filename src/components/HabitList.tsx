import Button from "./Button";

export default function HabitList()
{
    // date as Date()'s function basis
    let date = new Date();

    // Current day as numbers, 0 - 6 = Sunday = Saturday
    let currentDayNum: number = date.getDay();

    // Current date
    let currentDateNum: number = date.getDate();

    // Start of week date = current date - current day number
    let startOfWeekDate: number = currentDateNum - currentDayNum;

    let days: string[] = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];

    function createDay(dateNum: number, dayNum: number)
    {
        return <Button>{days[dayNum]} {dateNum}</Button>
    }

    return (
        <div className="bg-gray-800 mx-5 px-3 py-3 rounded-md flex gap-2 justify-between md:flex-wrap md:justify-center sm:flex-wrap sm:justify-center">
            {days.map((dayName, index) => {
                const thisDateNum = startOfWeekDate + index;
                
                return (
                    <Button size="large" key={index}>
                        {dayName} {thisDateNum}
                    </Button>
                );
            })}
        </div>
    );
}