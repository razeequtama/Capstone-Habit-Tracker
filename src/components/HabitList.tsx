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

/*
============================================================
                  HABITLIST COMPONENT EXPLANATION
============================================================

This component is responsible for displaying all of the
user's habits.

For each habit, it displays:

- The habit's name.
- The month and year currently being viewed.
- A Delete button.
- Seven HabitDay components representing Sunday through
  Saturday.
- The completion status of the habit for each day.
- A visual indication of which day is today.

It also includes the `AddHabit` component at the top so the
user can create new habits.

The HabitList component therefore acts as the main place where
the user's habits and their weekly progress are displayed.


------------------------------------------------------------
IMPORTS
------------------------------------------------------------

`Button` is the reusable button component used for the
Delete button.

`useContext` is a React Hook used to access shared data and
functions from a React Context.

`DateContext` provides access to the application's shared
date and habit-related data.

`AddHabit` is the component responsible for allowing the user
to create a new habit.

`HabitDay` represents one individual day for a habit.

These components work together:

HabitList
    |
    +-- AddHabit
    |
    +-- HabitDay
    |
    +-- Button


------------------------------------------------------------
COMPONENT
------------------------------------------------------------

`HabitList` is a React functional component.

Its main responsibility is to take the habit and date data
from the Context and turn that data into the user interface
shown on the screen.


------------------------------------------------------------
ACCESSING THE CONTEXT
------------------------------------------------------------

`useContext(DateContext)` gives HabitList access to the shared
application data.

The result is stored in `context`.

The component needs this Context because it needs several
important pieces of information:

- `dateData`
- `habits`
- `deleteHabit`
- `dateToString`


------------------------------------------------------------
CONTEXT SAFETY CHECK
------------------------------------------------------------

`if (!context)` checks whether the DateContext exists.

If it does not exist, `return null` tells React not to render
the component.

This prevents the component from trying to access data from
an unavailable Context.


------------------------------------------------------------
DESTRUCTURING THE CONTEXT
------------------------------------------------------------

The Context contains several values, so they are extracted
using destructuring.

`dateData`
    Represents the date currently being displayed or viewed.

`habits`
    Contains the collection of habits in the application.

`deleteHabit`
    A function used to remove a habit.

`dateToString`
    A function used to convert Date objects into the string
    format used by the application's habit data.

After destructuring, these values can be used directly.


============================================================
                     TODAY'S DATE
============================================================

`const today = new Date()`

creates a new JavaScript Date object representing the
current date and time.

This is used to determine which day in the displayed week is
today.


------------------------------------------------------------
TODAY AS A STRING
------------------------------------------------------------

`const todayString = dateToString(today)`

converts today's Date object into the same string format used
by the application's habit completion data.

This is important because later the component compares
different dates using strings.

For example, conceptually:

todayString = "2026-08-15"

A particular day's date can then be compared with that value
to determine whether that day is today.


============================================================
                  START OF THE WEEK
============================================================

`const startOfWeek = new Date(dateData)`

creates a new Date object based on `dateData`.

Creating a new Date here is important because it creates a
separate Date object rather than directly modifying the
original `dateData` object.

The next line:

`startOfWeek.setDate(...)`

changes the date so that it represents the beginning of the
current week.


------------------------------------------------------------
getDay()
------------------------------------------------------------

`startOfWeek.getDay()` returns the day of the week as a
number:

Sunday = 0
Monday = 1
Tuesday = 2
Wednesday = 3
Thursday = 4
Friday = 5
Saturday = 6

The code subtracts this number from the current date.

This moves the date backward until it reaches Sunday.

For example, if `dateData` represents Wednesday:

Wednesday = 3

The code subtracts 3 days and arrives at Sunday.

Therefore, `startOfWeek` represents the Sunday at the
beginning of the current week.


============================================================
                  DAYS OF THE WEEK
============================================================

The `days` array contains the names of all seven days:

Sunday
Monday
Tuesday
Wednesday
Thursday
Friday
Saturday

The order is important because it matches the numbering
returned by JavaScript's `getDay()` method.

The array is later used with `.map()` to create one
`HabitDay` component for each day.


============================================================
                     MONTH NAMES
============================================================

The `months` array contains abbreviated month names.

The order matches JavaScript's month numbering.

JavaScript uses:

January = 0
February = 1
March = 2
...
December = 11

This is why the code can use:

`months[dateData.getMonth()]`

to retrieve the correct month name.

For example, if:

`dateData.getMonth()` returns `7`

the array returns:

`"Aug"`

because August is index 7 in JavaScript's Date system.


============================================================
                 DELETE HABIT FUNCTION
============================================================

`handleDeleteHabit` is a helper function responsible for
deleting a habit.

It receives a `habitId`, which identifies the habit that
should be deleted.


------------------------------------------------------------
window.confirm()
------------------------------------------------------------

Before deleting the habit, the code uses:

`window.confirm(...)`

This displays a confirmation dialog in the browser.

The user is asked whether they are sure they want to delete
the habit.

The result is either:

`true`
    The user confirmed the deletion.

`false`
    The user cancelled the deletion.


------------------------------------------------------------
DELETE THE HABIT
------------------------------------------------------------

If the user confirms:

`deleteHabit(habitId)`

is called.

The `deleteHabit` function came from the DateContext.

This means HabitList does not need to know exactly how the
habit is removed from the application's state.

It simply tells the Context:

"Delete the habit with this ID."


============================================================
                         RETURN
============================================================

The `return` statement contains the JSX that creates the
habit list interface.


------------------------------------------------------------
OUTER CONTAINER
------------------------------------------------------------

The outer `<div>` uses `mx-5` to add horizontal margin around
the entire habit list.

Inside it are two main things:

1. The `AddHabit` component.
2. Either an empty-state message or the list of habits.


============================================================
                      AddHabit
============================================================

`<AddHabit />`

renders the component responsible for adding a new habit.

This means the user does not have to navigate somewhere else
to create a habit.

The habit creation interface is displayed directly above the
habit list.


============================================================
                  CONDITIONAL RENDERING
============================================================

The code uses a ternary operator:

`habits.length === 0 ? (...) : (...)`

This is a compact way of creating an if/else condition inside
JSX.

It asks:

"Does the habits array contain zero habits?"


------------------------------------------------------------
NO HABITS
------------------------------------------------------------

If:

`habits.length === 0`

is true, the component displays a message telling the user:

"No habits yet. Add your first habit above!"

This is called an empty state.

An empty state gives the user useful feedback instead of
showing a completely blank area.


------------------------------------------------------------
HABITS EXIST
------------------------------------------------------------

If `habits.length` is greater than zero, the component uses
`habits.map(...)` to display every habit.

This is an important React pattern.

`.map()` takes each item in an array and creates something
from it.

In this case:

Each habit
    ↓
becomes
    ↓
a group of JSX elements representing that habit.


============================================================
                    habits.map()
============================================================

`habits.map((habit) => { ... })`

loops through every habit in the `habits` array.

For each habit, the callback receives the current habit as
the `habit` variable.

The code then returns a container displaying that habit.


------------------------------------------------------------
KEY={habit.id}
------------------------------------------------------------

The outer `<div>` for each habit has:

`key={habit.id}`

React requires keys when rendering lists.

The key gives React a stable way to identify each item in the
list.

Using the habit's unique ID is appropriate because each habit
should have its own unique identifier.


============================================================
                  HABIT CONTAINER
============================================================

The outer `<div>` for each habit contains two main sections:

1. Habit information and the Delete button.
2. The seven HabitDay buttons.


------------------------------------------------------------
TAILWIND CLASSES
------------------------------------------------------------

The `className` controls the appearance and layout of the
habit container.

Important classes include:

`bg-gray-800`
    Dark background.

`px-3 py-3`
    Padding inside the container.

`rounded-md`
    Rounded corners.

`mb-4`
    Space below each habit.

`flex-col`
    Arranges content vertically.

`gap-2`
    Adds space between flex items.

Other responsive classes such as:

`md:flex-wrap`
`md:justify-center`
`sm:flex-wrap`
`sm:justify-center`

adjust the layout at different screen sizes.

This helps make the habit list responsive on different
devices.


============================================================
              HABIT INFORMATION SECTION
============================================================

The first inner `<div>` contains:

- The habit name.
- The current month and year.
- The Delete button.


------------------------------------------------------------
HABIT NAME
------------------------------------------------------------

`habit.name` displays the name of the current habit.

For example:

"Exercise"

or:

"Read a book"

The name comes directly from the current habit object in the
`habits` array.


------------------------------------------------------------
CURRENT MONTH AND YEAR
------------------------------------------------------------

The month is generated using:

`months[dateData.getMonth()]`

`getMonth()` returns the current month as a number from 0 to
11.

The number is used as an index into the `months` array.

The year comes from:

`dateData.getFullYear()`

Together, these might display:

`Aug 2026`

This tells the user which month and year the habit data is
currently showing.


============================================================
                    DELETE BUTTON
============================================================

The reusable `Button` component is used for deletion.

`variant="danger"`

tells the Button component to use its danger styling.

This makes sense because deleting something is a potentially
destructive action.

The button's displayed text is:

`Delete`


------------------------------------------------------------
DELETE onClick
------------------------------------------------------------

The button uses:

`onClick={() => handleDeleteHabit(habit.id)}`

This creates a function that will run when the button is
clicked.

It passes the current habit's ID to `handleDeleteHabit`.

The arrow function is important because we do not want
`handleDeleteHabit` to run immediately while rendering.

We want it to run only after the user clicks the button.


============================================================
                    HABIT DAY SECTION
============================================================

The second main `<div>` contains the seven days of the week.

It uses:

`days.map(...)`

to create one `HabitDay` component for each day.

Since the `days` array contains seven items, the map creates
seven HabitDay components.


============================================================
                  days.map()
============================================================

The callback receives:

`dayName`
    The name of the current day.

`index`
    The position of that day in the array.

For example:

index 0 = Sunday
index 1 = Monday
index 2 = Tuesday
...
index 6 = Saturday

The index is important because it is used to calculate the
actual date for each day.


------------------------------------------------------------
thisDate
------------------------------------------------------------

`const thisDate = new Date(startOfWeek)`

creates a new Date object starting from the beginning of the
week.

Again, a new Date object is created so that the original
`startOfWeek` is not accidentally modified.


------------------------------------------------------------
CALCULATING THE DAY
------------------------------------------------------------

The code then uses:

`thisDate.setDate(startOfWeek.getDate() + index)`

to calculate the actual date represented by this day.

If `startOfWeek` is Sunday:

index 0
    → Sunday

index 1
    → Monday

index 2
    → Tuesday

and so on.

This is how the component generates all seven dates for the
current week.


============================================================
                    DATE STRING
============================================================

`dateToString(thisDate)`

converts the current Date object into the string format used
by the application.

The result is stored in:

`dateString`

This string is used to look up whether the habit has been
completed on this particular date.


============================================================
                  CHECKING COMPLETION
============================================================

The code accesses:

`habit.completedDates[dateString]`

The `completedDates` object stores information about which
dates the habit has been completed.

The date string acts as the key.

Conceptually, the data might look something like:

completedDates:
    {
        "2026-08-13": true,
        "2026-08-15": true
    }

If the current `dateString` exists and has a true value, then
the habit is considered completed on that date.


------------------------------------------------------------
THE || false PART
------------------------------------------------------------

The code uses:

`habit.completedDates[dateString] || false`

If the stored value is missing or otherwise falsy, the result
becomes `false`.

This guarantees that `isCompleted` will have a usable
true/false value.

So:

stored value = true
    → isCompleted = true

stored value = undefined
    → isCompleted = false


============================================================
                    CHECKING TODAY
============================================================

`const isToday = dateString === todayString`

compares the date currently being displayed with today's date.

If they are exactly the same string:

`isToday = true`

Otherwise:

`isToday = false`

This value is passed to HabitDay so that HabitDay can give
today a special visual style.


============================================================
                  HabitDay COMPONENT
============================================================

For every day, the component renders:

`<HabitDay />`

Several props are passed to it.


------------------------------------------------------------
habitId
------------------------------------------------------------

`habitId={habit.id}`

tells HabitDay which habit this particular day belongs to.


------------------------------------------------------------
date
------------------------------------------------------------

`date={thisDate}`

passes the actual JavaScript Date object for that day.


------------------------------------------------------------
dayName
------------------------------------------------------------

`dayName={dayName}`

passes the name of the day, such as:

Sun
Mon
Tue


------------------------------------------------------------
isCompleted
------------------------------------------------------------

`isCompleted={isCompleted}`

tells HabitDay whether the habit has been completed on this
date.

HabitDay uses this to decide whether the button should appear
green.


------------------------------------------------------------
isToday
------------------------------------------------------------

`isToday={isToday}`

tells HabitDay whether this date is today.

HabitDay uses this to add special styling to today's button.


------------------------------------------------------------
KEY={index}
------------------------------------------------------------

`key={index}` gives React a key for each HabitDay in the list.

The index works here because these seven items represent
fixed positions in the week.

The parent habit itself already has a unique `habit.id` key.


============================================================
                     COMPLETE FLOW
============================================================

The entire component can be understood as a series of steps:

1. Get shared data from DateContext.

2. Determine today's date.

3. Determine the beginning of the current week.

4. Prepare the names of the seven days.

5. Prepare the names of the twelve months.

6. Display the AddHabit component.

7. Check whether there are any habits.

8. If there are no habits, display an empty-state message.

9. If habits exist, loop through them with `.map()`.

10. For each habit, display its name and month/year.

11. Display a Delete button for the habit.

12. Loop through the seven days of the week.

13. Calculate the actual date for each day.

14. Check whether the habit was completed on that date.

15. Check whether that date is today.

16. Pass all of this information to HabitDay.

17. HabitDay displays the correct button style.

18. When a day is clicked, HabitDay asks the Context to
    toggle the habit's completion status.


============================================================
                    COMPONENT RELATIONSHIP
============================================================

HabitList acts as the coordinator between several components.

                  HabitList
                     |
          +----------+----------+
          |                     |
          v                     v
       AddHabit              habits.map()
                                  |
                                  v
                              HabitDay
                                  |
                                  v
                              Button


`HabitList` decides WHAT habits and dates should be displayed.

`AddHabit` handles creating a new habit.

`HabitDay` handles displaying and toggling an individual
habit/day combination.

`Button` handles reusable button styling.

`DateContext` handles shared habit and date-related logic.


============================================================
                  IMPORTANT CONCEPTS
============================================================

This component demonstrates several important concepts:

1. CONTEXT
   `useContext` gives the component access to shared
   application data and functions.

2. ARRAY METHODS
   `.map()` is used to turn arrays of habits and days into
   React elements.

3. CONDITIONAL RENDERING
   The ternary operator displays either the empty state or the
   actual habit list.

4. PROPS
   Data is passed from HabitList into HabitDay.

5. DATE OBJECTS
   JavaScript's Date object is used to calculate today's date,
   the beginning of the week, and each individual day.

6. DATE FORMATTING
   `dateToString` creates a consistent date representation.

7. DYNAMIC DATA LOOKUP
   `completedDates[dateString]` uses the date as a key to
   find whether the habit was completed.

8. EVENT HANDLING
   Clicking Delete calls the delete logic for that specific
   habit.

9. REUSABLE COMPONENTS
   AddHabit, HabitDay, and Button are all separate reusable
   components.

10. RESPONSIVE DESIGN
    Tailwind's responsive classes adjust the layout for
    different screen sizes.

11. TYPESCRIPT
    `habitId: string` explicitly tells TypeScript what type of
    value the delete function expects.


============================================================
                      BIG PICTURE
============================================================

The most important thing to understand about HabitList is
that it connects the application's data to the visual
components.

The Context provides the DATA.

HabitList organizes the DATA.

HabitList calculates which dates belong to the current week.

HabitList checks the completion status for each date.

HabitList passes that information to HabitDay.

HabitDay displays each individual day and handles clicks.

So the overall architecture is:

             DateContext
                  |
                  v
             HabitList
                  |
        +---------+---------+
        |                   |
        v                   v
     AddHabit          HabitDay × 7
                            |
                            v
                         Button


In simple terms:

`DateContext` = "Here is the application's data and logic."

`HabitList` = "Let's organize that data into a weekly habit
list."

`HabitDay` = "Let's display one specific day."

`Button` = "Let's provide reusable button styling."

This separation of responsibilities makes the application
easier to understand, maintain, and expand.
*/
