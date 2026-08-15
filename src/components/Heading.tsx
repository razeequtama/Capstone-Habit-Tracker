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

/*
============================================================
                   HEADING COMPONENT EXPLANATION
============================================================

This component is responsible for the top section of the
Habit Tracker interface.

It displays:

- The title "Habit Tracker".
- Today's date.
- A "Prev" button to move to the previous week.
- A "Today" button to return to the current week.
- A "Next" button to move to the next week.

The component uses DateContext to read and update the date
currently being viewed.

The main idea is that the user can navigate through different
weeks while still being able to quickly return to the current
week.


------------------------------------------------------------
IMPORTS
------------------------------------------------------------

`Title` is a reusable component used to display the main
application title.

`Button` is the reusable button component used for the
previous, today, and next navigation buttons.

`DateContext` is the shared React Context containing the
current date being viewed and the function used to change it.

`useContext` allows this component to access DateContext.

`useState` is used to store today's date when the component
initially renders.


------------------------------------------------------------
COMPONENT
------------------------------------------------------------

`Heading` is a React functional component.

Its purpose is to provide the heading and date-navigation
controls for the Habit Tracker.


------------------------------------------------------------
ACCESSING DateContext
------------------------------------------------------------

`useContext(DateContext)` gives the component access to the
shared date state.

The result is stored in `context`.

This is necessary because the selected date is shared with
other components, such as HabitList.

When the date changes here, other components using the same
Context can respond to that change.


------------------------------------------------------------
CONTEXT SAFETY CHECK
------------------------------------------------------------

`if (!context)` checks whether DateContext is available.

If it is not available, `return null` tells React to render
nothing.

This prevents the component from trying to use date-related
data when the required Context does not exist.


------------------------------------------------------------
GETTING DATE DATA FROM CONTEXT
------------------------------------------------------------

`const { dateData, setDateData } = context`

extracts two values from DateContext.

`dateData`
    Represents the date currently being viewed by the
    application.

`setDateData`
    Is the function used to update that date.

This means Heading can both READ the current date and CHANGE
the current date.


============================================================
                    DAYS ARRAY
============================================================

The `days` array contains the names of the seven days of the
week.

The order is important because JavaScript's `getDay()`
method returns numbers in this exact order:

0 = Sunday
1 = Monday
2 = Tuesday
3 = Wednesday
4 = Thursday
5 = Friday
6 = Saturday

Therefore, the code can use a number returned by `getDay()`
as an index into this array.


============================================================
                   MONTHS ARRAY
============================================================

The `months` array contains abbreviated month names.

The order also matters because JavaScript's `getMonth()`
method uses zero-based numbering:

0 = January
1 = February
2 = March
...
11 = December

Therefore, the number returned by `getMonth()` can be used
directly as an index into this array.


============================================================
                     TODAY STATE
============================================================

`const [today] = useState(new Date())`

creates a piece of state containing the current date.

An important detail is that only the first value from
`useState` is extracted.

Normally, `useState` returns two values:

1. The current state.
2. A function for changing the state.

Here, only the first value is needed.

Therefore, the code intentionally does not create a setter.

The initial value is:

`new Date()`

which represents the current date and time when the
component initializes.

The purpose here is to keep a reference to the current date
for displaying the "Today:" information.


------------------------------------------------------------
WHY USE STATE HERE?
------------------------------------------------------------

The `today` value is not changed by this component.

The component only needs the date that was captured when it
initialized.

This is different from `dateData`, which DOES change when
the user presses Prev, Today, or Next.

So:

`today`
    Represents the actual current date used for the displayed
    "Today:" information.

`dateData`
    Represents the date/week the user is currently viewing.


============================================================
                CURRENT DAY INFORMATION
============================================================

The next four constants extract pieces of information from
the `today` Date object.


------------------------------------------------------------
currDayDate
------------------------------------------------------------

`today.getDate()`

returns the day of the month.

For example:

15

if today is August 15.


------------------------------------------------------------
currDayName
------------------------------------------------------------

`days[today.getDay()]`

first gets the numerical day of the week using `getDay()`.

For example:

0 = Sunday
1 = Monday
2 = Tuesday

That number is then used as an index in the `days` array.

For example:

today.getDay() → 6

days[6] → "Sat"

Therefore, `currDayName` contains the name of the current
weekday.


------------------------------------------------------------
currMonthName
------------------------------------------------------------

`months[today.getMonth()]`

gets the numerical month using `getMonth()` and uses that
number as an index in the `months` array.

For example:

today.getMonth() → 7

months[7] → "Aug"

Therefore, `currMonthName` contains the abbreviated current
month.


------------------------------------------------------------
currYear
------------------------------------------------------------

`today.getFullYear()`

returns the full four-digit year.

For example:

2026

These four values are later combined to display the current
date in a readable format.


============================================================
                PREVIOUS WEEK FUNCTION
============================================================

`goToPreviousWeek` is called when the user clicks the
"Prev" button.

The function creates a new Date object based on `dateData`.

This is important because we do not want to directly modify
the existing Date object stored in the Context.


------------------------------------------------------------
CREATING A NEW DATE
------------------------------------------------------------

`new Date(dateData)`

creates a separate copy of the current date.

The copy is stored in `newDate`.


------------------------------------------------------------
MOVING BACK SEVEN DAYS
------------------------------------------------------------

`newDate.setDate(newDate.getDate() - 7)`

gets the current day of the month and subtracts 7.

Since a week contains seven days, subtracting seven days
moves the selected date exactly one week backward.


------------------------------------------------------------
UPDATING THE CONTEXT
------------------------------------------------------------

`setDateData(newDate)`

updates the shared date in DateContext.

Once the Context changes, components that depend on
`dateData` can re-render using the new date.

This allows the rest of the Habit Tracker to display the
previous week.


============================================================
                    NEXT WEEK FUNCTION
============================================================

`goToNextWeek` works almost exactly like
`goToPreviousWeek`.

The difference is that it adds seven days instead of
subtracting seven.


------------------------------------------------------------
CREATING A COPY
------------------------------------------------------------

`new Date(dateData)`

creates a new Date object based on the currently selected
date.


------------------------------------------------------------
MOVING FORWARD
------------------------------------------------------------

`newDate.setDate(newDate.getDate() + 7)`

adds seven days to the selected date.

This moves the displayed week forward by one week.


------------------------------------------------------------
UPDATING THE CONTEXT
------------------------------------------------------------

`setDateData(newDate)`

stores the new date in the shared Context.

Other components using `dateData` can then update their
display accordingly.


============================================================
                       TODAY FUNCTION
============================================================

`goToToday` is called when the user clicks the "Today"
button.

It directly sets the shared date to:

`new Date()`

This creates a Date object representing the current date.

Therefore, regardless of how far the user has navigated
forward or backward, clicking "Today" returns the application
to the current week/date.


============================================================
                         RETURN
============================================================

The `return` statement contains the JSX that creates the
visible heading area.


------------------------------------------------------------
OUTER CONTAINER
------------------------------------------------------------

The outer `<div>` uses:

`flex`

to create a Flexbox layout.

`justify-between`

places the title on one side and the date/navigation section
on the other.

`items-center`

vertically aligns the two sections.


============================================================
                         TITLE
============================================================

`<Title text="Habit Tracker"/>`

renders the reusable Title component.

The text prop tells the Title component what text to display.

This keeps the actual title styling inside the reusable
Title component instead of repeating it here.


============================================================
                  TODAY INFORMATION
============================================================

The next `<div>` contains two things:

1. The current date text.
2. The navigation buttons.

`flex-col`

arranges these elements vertically.

`justify-center` and `items-center`

center the content.


------------------------------------------------------------
TODAY TEXT
------------------------------------------------------------

The `<p>` element displays:

`Today: {currDayName}, {currDayDate} {currMonthName}
{currYear}`

The values calculated earlier are inserted into the text.

For example, it could display:

`Today: Sat, 15 Aug 2026`

This gives the user a clear indication of the actual current
date.


============================================================
                  NAVIGATION BUTTONS
============================================================

The buttons are placed inside another `<div>`.

The `md:flex` class makes the buttons use a horizontal flex
layout on medium-sized screens and larger.

The three buttons are:

- Prev
- Today
- Next


------------------------------------------------------------
PREV BUTTON
------------------------------------------------------------

The first Button uses:

`onClick={goToPreviousWeek}`

When clicked, it calls `goToPreviousWeek`.

That moves `dateData` seven days backward.

The button uses:

`size="medium"`

so it receives the medium Button styling.


------------------------------------------------------------
TODAY BUTTON
------------------------------------------------------------

The second Button uses:

`onClick={goToToday}`

When clicked, it resets `dateData` to the current date.

This allows the user to quickly return to the current week.


------------------------------------------------------------
NEXT BUTTON
------------------------------------------------------------

The third Button uses:

`onClick={goToNextWeek}`

When clicked, it moves `dateData` seven days forward.


============================================================
                    COMPLETE FLOW
============================================================

The component can be understood as this process:

             DateContext
                  |
                  v
              dateData
                  |
          +-------+-------+
          |       |       |
          v       v       v
        Prev    Today    Next
          |       |       |
          v       v       v
       -7 days  now    +7 days
          |       |       |
          +-------+-------+
                  |
                  v
           setDateData()
                  |
                  v
          Context updates
                  |
                  v
       Other components update


At the same time, the component separately calculates the
actual current date:

              new Date()
                  |
                  v
          +-------+-------+
          |       |       |
          v       v       v
         Day    Month    Year
          |
          v
     Display "Today:"


============================================================
                 IMPORTANT CONCEPTS
============================================================

This component demonstrates several important concepts:

1. useContext
   Used to access and update shared date information.

2. useState
   Used to store the current date value used for the
   "Today:" display.

3. PROPS
   The Title and Button components receive information through
   props.

4. DATE OBJECTS
   JavaScript's Date object is used to work with days, months,
   and years.

5. DATE CALCULATIONS
   Adding or subtracting 7 days allows the user to navigate
   between weeks.

6. ARRAY INDEXING
   `getDay()` and `getMonth()` return numbers that are used
   as indexes into the days and months arrays.

7. EVENT HANDLERS
   The navigation functions are called when the user clicks
   the buttons.

8. REUSABLE COMPONENTS
   Title and Button are separate reusable components rather
   than being implemented directly inside Heading.

9. SHARED STATE
   `dateData` is stored in Context so other components can
   react to the same selected date.

10. IMMUTABILITY / DATE COPIES
    The navigation functions create a new Date object before
    changing it, rather than directly modifying the original
    `dateData` object.


============================================================
                      BIG PICTURE
============================================================

The most important distinction in this component is between
the ACTUAL current date and the DATE BEING VIEWED.

`today`
    Represents the real current date.

`dateData`
    Represents the date/week the user is currently viewing.

For example, if today is August 15 but the user navigates to
the previous week:

today
    → August 15

dateData
    → August 8

The "Today:" text should still show August 15, while the rest
of the application can display the week around August 8.

Clicking "Today" makes `dateData` equal to the current date
again.

Therefore, this component acts as the navigation controller
for the weekly view of the Habit Tracker.

In simple terms:

`dateData` = "Which week am I looking at?"

`today` = "What is the actual date today?"

`Prev` = "Show the previous week."

`Next` = "Show the next week."

`Today` = "Return to the current week."
*/
