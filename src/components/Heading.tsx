import Title from "./Title"
import Button from "./Button"

export default function Heading()
{
  return(
    <div className="flex justify-between items-center">
      <Title text="Habit Tracker"/>
      <div className="mx-4">



        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>




        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>



      </div>
      
    </div>
  )
}