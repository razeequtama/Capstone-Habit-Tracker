import Title from "./Title"
import Button from "./Button"

export default function Heading()
{
  return(
    <div className="flex justify-between items-center">
      <Title text="Habit Tracker"/>
      <div className="mx-4 md:flex">
        <Button size="medium">Prev</Button>
        <Button size="medium">Next</Button>
      </div>
      
    </div>
  )
}