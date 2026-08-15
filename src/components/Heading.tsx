import Title from "./Title"
import Button from "./Button"
import { DateContext } from "../context/DateContext"
import { useContext, useState } from "react"

export default function Heading()
{
  const context = useContext(DateContext);

  if (!context) {
    return null;
  }

  let {dateData, setDateData} = context;

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

  const [today] = useState(new Date());

  const currDayDate = today.getDate();
  const currDayName = days[today.getDay()];
  const currMonthName = months[today.getMonth()];
  const currYear = today.getFullYear();

  const goToPreviousWeek = () => {
    const newDate = new Date(dateData)
    newDate.setDate(newDate.getDate() - 7)
    setDateData(newDate)
  }

  const goToNextWeek = () => {
    const newDate = new Date(dateData)
    newDate.setDate(newDate.getDate() + 7)
    setDateData(newDate)
  }

  const goToToday = () => {
    setDateData(new Date())
  }
 
  return(
    <div className="flex justify-between items-center">
      <Title text="Habit Tracker"/>
      <div className="flex flex-col justify-center items-center py-4">
        <p className="text-amber-50">Today: {currDayName}, {currDayDate} {currMonthName} {currYear}</p>
        <div className="mx-4 md:flex">
          <Button onClick={goToPreviousWeek} size="medium">Prev</Button>
          <Button onClick={goToToday} size="medium">Today</Button>
          <Button onClick={goToNextWeek} size="medium">Next</Button>
        </div>
      </div>
      
    </div>
  )
}