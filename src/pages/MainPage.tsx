import Heading from "../components/Heading"
import HabitList from "../components/HabitList"
import { DateContextProvider } from "../context/DateContext"

export default function MainPage(){
    return(
        <>
            <DateContextProvider>
                <Heading />
                <HabitList />
            </DateContextProvider>
        </>
    )
}