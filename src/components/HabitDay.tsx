import { useContext } from "react";
import { DateContext } from "../context/DateContext";

type HabitDayProps = {
  habitId: string;
  date: Date;
  dayName: string;
  isCompleted: boolean;
  isToday: boolean;
};

export default function HabitDay({
  habitId,
  date,
  dayName,
  isCompleted,
  isToday,
}: HabitDayProps) {
  const context = useContext(DateContext);

  if (!context) {
    return null;
  }

  const { toggleHabitDay, dateToString } = context;

  const handleClick = () => {
    const dateString = dateToString(date);
    toggleHabitDay(habitId, dateString);
  };

  // Determine button styling based on completed and today states
  let buttonClasses =
    "px-4 py-3 mx-0.5 my-1 rounded-md transition-all cursor-pointer border-2 font-semibold text-sm";

  if (isCompleted && isToday) {
    // Completed AND today: green with ring
    buttonClasses +=
      " bg-green-600 text-white border-green-600 ring-2 ring-green-400 hover:bg-green-700";
  } else if (isCompleted) {
    // Completed but not today: green
    buttonClasses +=
      " bg-green-600 text-white border-green-600 hover:bg-green-700";
  } else if (isToday) {
    // Today but not completed: gray with ring
    buttonClasses +=
      " bg-gray-600 text-white border-gray-600 ring-2 ring-blue-400 hover:bg-gray-700";
  } else {
    // Not completed, not today: default gray
    buttonClasses +=
      " bg-gray-600 text-white border-gray-600 hover:bg-gray-700";
  }

  return (
    <button onClick={handleClick} className={buttonClasses}>
      {dayName} {date.getDate()}
    </button>
  );
}

/*
============================================================
                  HABITDAY COMPONENT EXPLANATION
============================================================

This component represents ONE DAY for a specific habit.

Its job is to display a button showing:

- The name of the day.
- The day of the month.
- Whether the habit is completed on that day.
- Whether that day is today.

The button's appearance changes depending on whether the
habit is completed and whether the date is today.

When the user clicks the button, the component tells the
DateContext to toggle the habit's completion status for that
specific date.


------------------------------------------------------------
IMPORTS
------------------------------------------------------------

`useContext` is a React Hook used to access shared data and
functions from a React Context.

`DateContext` is the application's shared context.

This component uses it to access:

- `toggleHabitDay`
- `dateToString`

These functions allow the component to interact with the
application's habit and date data.


------------------------------------------------------------
HabitDayProps
------------------------------------------------------------

`HabitDayProps` is a TypeScript type describing the props that
the HabitDay component expects to receive.

The component requires five pieces of information:

`habitId: string`
    Identifies which habit this day belongs to.

`date: Date`
    Represents the specific date being displayed.

`dayName: string`
    Contains the name of the day, such as "Mon", "Tue", etc.

`isCompleted: boolean`
    Indicates whether the habit has been completed on this
    particular date.

`isToday: boolean`
    Indicates whether the date being displayed is today.

The `boolean` values can only be either `true` or `false`.


------------------------------------------------------------
COMPONENT PARAMETERS
------------------------------------------------------------

The `HabitDay` function receives the props defined by
`HabitDayProps`.

The props are destructured directly inside the function
parameters.

This allows the component to use:

- `habitId`
- `date`
- `dayName`
- `isCompleted`
- `isToday`

directly instead of repeatedly accessing them through a
props object.


------------------------------------------------------------
ACCESSING THE CONTEXT
------------------------------------------------------------

`useContext(DateContext)` gives this component access to the
shared DateContext.

The result is stored in `context`.

The component needs the context because it needs to interact
with the application's habit data.


------------------------------------------------------------
CONTEXT SAFETY CHECK
------------------------------------------------------------

`if (!context)` checks whether the context exists.

If the component is rendered somewhere where the
DateContext is not available, `context` will not contain the
expected value.

`return null` tells React to render nothing in that situation.

This prevents the component from trying to access functions
from a context that does not exist.


------------------------------------------------------------
GETTING FUNCTIONS FROM CONTEXT
------------------------------------------------------------

`const { toggleHabitDay, dateToString } = context`

uses destructuring to extract two functions from the context.

`toggleHabitDay`
    Changes the completion status of a habit for a specific
    date.

`dateToString`
    Converts a JavaScript `Date` object into the string format
    expected by the application's habit data.

For example, the component might have a JavaScript Date
object, but the application's data may store dates as
strings.


------------------------------------------------------------
handleClick
------------------------------------------------------------

`handleClick` is the function that runs when the user clicks
the day button.

There are two important steps inside this function.


------------------------------------------------------------
STEP 1: CONVERT THE DATE
------------------------------------------------------------

`dateToString(date)` converts the JavaScript `Date` object
into a string.

The result is stored in `dateString`.

This is useful because the application's habit data needs a
consistent representation of the date.

Instead of passing the Date object directly, the component
passes the formatted date string to the context.


------------------------------------------------------------
STEP 2: TOGGLE THE HABIT DAY
------------------------------------------------------------

`toggleHabitDay(habitId, dateString)` tells the context to
change the completion status of the specified habit on the
specified date.

It receives two important pieces of information:

`habitId`
    Which habit should be changed.

`dateString`
    Which date of that habit should be changed.

For example, conceptually:

Habit:
    "Exercise"

Date:
    "2026-08-15"

The function tells the application:

"Toggle the completion status of the Exercise habit for
August 15, 2026."


------------------------------------------------------------
BUTTON STYLING
------------------------------------------------------------

`buttonClasses` starts with a string containing the common
Tailwind CSS classes that every version of the button should
have.

These common classes control things such as:

`px-4 py-3`
    Horizontal and vertical padding.

`mx-0.5 my-1`
    Margin around the button.

`rounded-md`
    Rounded corners.

`transition-all`
    Smoothly animates visual changes.

`cursor-pointer`
    Shows that the button can be clicked.

`border-2`
    Gives the button a 2-pixel border.

`font-semibold`
    Makes the text semi-bold.

`text-sm`
    Uses a small font size.

These styles are shared by every possible state of the
button.


============================================================
                 BUTTON STATE LOGIC
============================================================

The component then decides what additional styling should be
added based on two boolean values:

`isCompleted`

and:

`isToday`

Because each value can be either true or false, there are
four possible combinations:

1. Completed AND today
2. Completed but not today
3. Today but not completed
4. Not completed AND not today


------------------------------------------------------------
CASE 1: COMPLETED AND TODAY
------------------------------------------------------------

`if (isCompleted && isToday)`

The `&&` means "AND".

Therefore, this condition is true only when BOTH values are
true.

In this situation:

- The habit is completed.
- The date is today.

The button gets a green background and a green focus-style
ring.

The green color communicates that the habit has been
completed.

The ring helps make today visually stand out.


------------------------------------------------------------
CASE 2: COMPLETED BUT NOT TODAY
------------------------------------------------------------

`else if (isCompleted)`

This runs when the previous condition was false but
`isCompleted` is true.

Therefore:

- The habit is completed.
- The date is not today.

The button is green, but it does not receive the special
"today" ring.

This allows completed days to be visually recognized without
making them look like today's date.


------------------------------------------------------------
CASE 3: TODAY BUT NOT COMPLETED
------------------------------------------------------------

`else if (isToday)`

This runs when:

- The date is today.
- The habit has not been completed.

The button remains gray because the habit is not completed.

However, it receives a colored ring so that today can still
be identified easily.

This means the user can visually distinguish today even
before completing the habit.


------------------------------------------------------------
CASE 4: NOT COMPLETED AND NOT TODAY
------------------------------------------------------------

`else`

If none of the previous conditions are true, then:

- The habit is not completed.
- The date is not today.

The button receives the default gray styling.

This is the normal/default state.


============================================================
                 WHY THE ORDER MATTERS
============================================================

The conditions are checked from top to bottom.

The first condition checks:

`isCompleted && isToday`

This is the most specific situation because it requires two
conditions to be true.

Then the component checks only:

`isCompleted`

Then only:

`isToday`

Finally, the `else` handles everything that remains.

This order prevents the more specific state from being
overridden by a more general condition.

For example, if today is completed, both `isCompleted` and
`isToday` are true.

The first condition catches that situation before the code
gets to the `isCompleted` condition.


============================================================
                  RETURNED BUTTON
============================================================

The component returns a `<button>` element.

`onClick={handleClick}` connects the button to the
`handleClick` function.

Therefore, clicking the button triggers the process of:

1. Converting the date to a string.
2. Calling `toggleHabitDay`.
3. Changing the habit's completion status for that date.


------------------------------------------------------------
BUTTON CLASSNAME
------------------------------------------------------------

`className={buttonClasses}` applies the dynamically generated
CSS classes to the button.

The final value of `buttonClasses` depends on the current
state of:

- `isCompleted`
- `isToday`

This is why the button can automatically look different
depending on the state of the habit.


------------------------------------------------------------
BUTTON CONTENT
------------------------------------------------------------

`{dayName} {date.getDate()}` determines what text appears
inside the button.

`dayName` provides the name of the day.

For example:

`Mon`

`date.getDate()` gets the day of the month from the Date
object.

For example:

`15`

Together, the button might display:

`Mon 15`

This allows the user to identify both the weekday and the
specific date.


============================================================
                     COMPLETE FLOW
============================================================

The component can be understood as this process:

       HabitDay receives props
                |
                v
       Access DateContext
                |
                v
       Get toggleHabitDay
       and dateToString
                |
                v
       Determine button state
                |
       +--------+--------+
       |        |        |
       v        v        v
   Completed  Today   Neither
       |        |        |
       +--------+--------+
                |
                v
       Select Tailwind classes
                |
                v
          Render button
                |
                v
         User clicks it
                |
                v
         handleClick()
                |
                v
       Convert Date to string
                |
                v
       toggleHabitDay()
                |
                v
   Habit completion is toggled


============================================================
                  IMPORTANT CONCEPTS
============================================================

This component demonstrates several important concepts:

1. PROPS
   The parent component provides information such as the
   habit ID, date, and completion status.

2. TYPESCRIPT
   `HabitDayProps` ensures the component receives the correct
   types of data.

3. useContext
   Allows the component to access shared application logic.

4. EVENT HANDLERS
   `handleClick` responds to the user's click.

5. CONDITIONAL LOGIC
   The `if`, `else if`, and `else` statements determine the
   button's appearance.

6. BOOLEAN VALUES
   `isCompleted` and `isToday` represent two true/false
   states.

7. DYNAMIC STYLING
   `buttonClasses` changes depending on the current state.

8. DATE HANDLING
   The component receives a JavaScript Date and converts it
   into the string format required by the application.

9. REUSABLE COMPONENTS
   The same HabitDay component can represent every day in a
   habit tracker.

10. CONTEXT-BASED STATE MANAGEMENT
    The component does not directly manage the habit's stored
    completion data. Instead, it asks the Context to toggle
    the appropriate habit day.


============================================================
                      BIG PICTURE
============================================================

The most important idea is that HabitDay is mainly a
presentation and interaction component.

It receives information about a particular habit and date.

It then uses that information to decide:

"How should this day look?"

And when the user clicks it, it asks the Context:

"Toggle this habit for this date."

The component therefore connects the visual representation of
a habit day with the application's underlying habit data.

In simple terms:

Props tell HabitDay WHAT the current state is.

Conditional logic determines HOW the button looks.

The click handler determines WHAT happens when the user
interacts with it.

DateContext handles the actual habit state change.
*/
