import Title from "./Title"
import Button from "./Button"

export default function Heading()
{
  return(
    <div className="flex justify-between items-center">
      <Title text="Habit Tracker"/>
      <div className="mx-4">
        <Button variant="primary">Prev</Button>
        <Button variant="primary">Next</Button>
      </div>
      
    </div>
  )
}