import {createContext, useState, type ReactNode, useEffect} from "react";


// ============================================================
// 1. DESCRIBE WHAT OUR CONTEXT WILL CONTAIN
// ============================================================
//
// Our context will contain an object that looks like this:
//
// {
//     dateData: Date,
//     setDateData: some function,
//     habits: Habit[],
//     addHabit: function,
//     deleteHabit: function,
//     toggleHabitDay: function,
//     goToToday: function
// }
//
// So we create a TypeScript type to describe that object.
//

// Habit type: each habit has an id, name, and completion dates
export type Habit = {
  id: string;
  name: string;
  completedDates: Record<string, boolean>;
};

export type DateContextType = {

    // dateData will contain a JavaScript Date object.
    //
    // Example:
    // new Date()
    //
    dateData: Date;


    // setDateData is the function that React gives us
    // from useState().
    //
    // You DON'T need to memorize this:
    //
    // React.Dispatch<React.SetStateAction<Date>>
    //
    // For now, just read it as:
    //
    // "setDateData is a React state setter that changes
    //  our Date state."
    //
    // In other words, it's the TypeScript description
    // of the function we're going to get from useState().
    //
    setDateData: React.Dispatch<React.SetStateAction<Date>>;

    // habits is an array of all habits
    habits: Habit[];

    // addHabit adds a new habit with the given name
    addHabit: (name: string) => void;

    // deleteHabit removes a habit by its id
    deleteHabit: (habitId: string) => void;

    // toggleHabitDay toggles the completion state for a habit on a specific date
    // The date should be in YYYY-MM-DD format
    toggleHabitDay: (habitId: string, dateString: string) => void;

    // goToToday sets dateData to today's date
    goToToday: () => void;

    // dateToString converts a Date to YYYY-MM-DD format using local time
    dateToString: (date: Date) => string;
};



// ============================================================
// 2. CREATE THE CONTEXT
// ============================================================
//
// In JavaScript you could simply write:
//
// createContext(null)
//
// But TypeScript needs to know what kind of data this
// Context is going to contain.
//
// So we tell it:
//
// createContext<DateContextType | null>(null)
//
// This means:
//
// "This Context can contain either:
//
//     DateContextType
//
// OR:
//
//     null
//
// For now, its initial value is null."
//

export const DateContext = createContext<DateContextType | null>(null);



// ============================================================
// 3. DESCRIBE THE PROVIDER'S PROPS
// ============================================================
//
// Our Provider receives:
//
// <DateContextProvider>
//     <Something />
// </DateContextProvider>
//
// That <Something /> is called "children".
//
// ReactNode is TypeScript's way of saying:
//
// "children can be basically anything React can render."
//

type DataContextProviderType = {
    children?: ReactNode;
};



// ============================================================
// 4. CREATE OUR PROVIDER
// ============================================================

export function DateContextProvider({children}: DataContextProviderType) {


    // ========================================================
    // 5. CREATE OUR STATE
    // ========================================================
    //
    // useState() gives us TWO things:
    //
    //     dateData
    //     setDateData
    //
    // dateData:
    //     The CURRENT date.
    //
    // setDateData:
    //     A FUNCTION that allows us to CHANGE dateData.
    //
    // Because we're starting with new Date(),
    // TypeScript automatically understands that dateData
    // is a Date.
    //

    const [dateData, setDateData] = useState(new Date());
    
    // Initialize habits from localStorage (runs once during mount)
    const [habits, setHabits] = useState<Habit[]>(() => {
        const storedHabits = localStorage.getItem("habits");
        if (storedHabits) {
            try {
                return JSON.parse(storedHabits);
            } catch (error) {
                console.error("Failed to parse stored habits:", error);
                return [];
            }
        }
        return [];
    });

    // Save habits to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("habits", JSON.stringify(habits));
    }, [habits]);


    // At this point we basically have:
    //
    // dateData
    //     ↓
    //     Date object
    //
    // setDateData
    //     ↓
    //     function that changes dateData
    //
    // habits
    //     ↓
    //     array of Habit objects
    //


    // ========================================================
    // HELPER FUNCTION: Convert Date to YYYY-MM-DD format
    // ========================================================
    //
    // This function takes a JavaScript Date object
    // and converts it to a string in YYYY-MM-DD format
    // using local time (not UTC).
    //
    // We avoid toISOString() because it uses UTC time
    // and can shift dates based on timezone.
    //
    // Example: new Date(2026, 7, 15) → "2026-08-15"
    //
    const dateToString = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };


    // ========================================================
    // HABIT MANAGEMENT FUNCTIONS
    // ========================================================

    // Add a new habit with a unique ID
    const addHabit = (name: string) => {
        const trimmedName = name.trim();
        if (!trimmedName) {
            return; // Don't add empty habits
        }
        const newHabit: Habit = {
            id: `habit-${Date.now()}`, // Simple unique ID using timestamp
            name: trimmedName,
            completedDates: {},
        };
        setHabits([...habits, newHabit]);
    };

    // Delete a habit by its ID
    const deleteHabit = (habitId: string) => {
        setHabits(habits.filter((habit) => habit.id !== habitId));
    };

    // Toggle the completion state for a specific habit on a specific date
    const toggleHabitDay = (habitId: string, dateString: string) => {
        setHabits(
            habits.map((habit) => {
                if (habit.id === habitId) {
                    return {
                        ...habit,
                        completedDates: {
                            ...habit.completedDates,
                            [dateString]: !habit.completedDates[dateString],
                        },
                    };
                }
                return habit;
            })
        );
    };

    // Set dateData to today's date
    const goToToday = () => {
        setDateData(new Date());
    };


    // ========================================================
    // 6. PUT ALL THINGS INTO ONE OBJECT
    // ========================================================
    //
    // We want to send dateData, setDateData, habits, and
    // all the habit management functions through our Context.
    //
    // So we put them together in an object.
    //
    // "data" will look roughly like:
    //
    // {
    //     dateData: new Date(),
    //     setDateData: [function],
    //     habits: [Habit[], ...],
    //     addHabit: [function],
    //     deleteHabit: [function],
    //     toggleHabitDay: [function],
    //     goToToday: [function]
    // }
    //

    const data = {
        dateData,
        setDateData,
        habits,
        addHabit,
        deleteHabit,
        toggleHabitDay,
        goToToday,
        dateToString,
    };


    // ========================================================
    // 7. GIVE THE DATA TO THE CONTEXT
    // ========================================================
    //
    // This is the Provider.
    //
    // Any component inside this Provider can use:
    //
    //     useContext(DateContext)
    //
    // to get access to "data".
    //
    // The "value" prop is the important part:
    //
    //     value={data}
    //
    // We're saying:
    //
    // "This is the data I want to make available
    //  through this Context."
    //

    return (
        <DateContext.Provider value={data}>

            {/*
                "children" represents whatever components
                we put inside DateContextProvider.

                For example:

                <DateContextProvider>
                    <MyComponent />
                </DateContextProvider>

                Here, children = <MyComponent />
            */}

            {children}

        </DateContext.Provider>
    );
}

/*
============================================================
             DATE CONTEXT / PROVIDER EXPLANATION
============================================================

This is the central state-management file for the Habit
Tracker application.

It is more complex than the other components because it is
responsible for managing information that many different
components need to access.

Instead of keeping habit data separately inside AddHabit,
HabitList, HabitDay, and Heading, we store the shared data
here and make it available through React Context.

The main responsibilities of this file are:

1. Define the structure of a habit.
2. Define what the Context contains.
3. Create the Context.
4. Create the Context Provider.
5. Store the current date.
6. Store all habits.
7. Save and load habits from localStorage.
8. Add habits.
9. Delete habits.
10. Toggle habit completion for specific dates.
11. Navigate back to today.
12. Convert Date objects into date strings.
13. Make all of this data available to other components.


============================================================
                 WHY DO WE NEED CONTEXT?
============================================================

Normally, if several components need the same piece of data,
we could pass that data through props.

For example:

App
 |
 v
HabitList
 |
 v
HabitDay

But imagine that many components need access to the same
habits, dates, and functions.

Passing all of this information through props could become
complicated very quickly.

React Context solves this problem.

The Context allows us to create a shared source of data that
components can access without manually passing the data
through every component.

In this application:

DateContext
     |
     +---- Heading
     |
     +---- HabitList
     |
     +---- AddHabit
     |
     +---- HabitDay

All of these components can access the shared data.


============================================================
                 1. HABIT TYPE
============================================================

`Habit` is a TypeScript type describing what a habit object
should look like.

Every Habit must contain three properties:

`id: string`

A unique identifier for the habit.

This allows the application to distinguish one habit from
another.

`name: string`

The name of the habit.

For example:

"Exercise"

"Read a book"

"Drink water"


`completedDates: Record<string, boolean>`

This stores which dates the habit was completed.

`Record<string, boolean>` means:

- The keys are strings.
- The values are booleans.

The strings represent dates, while true/false represents
whether the habit was completed.

Conceptually, it could look like:

{
    "2026-08-13": true,
    "2026-08-14": false,
    "2026-08-15": true
}

This structure is useful because we can quickly look up a
specific date.

For example:

completedDates["2026-08-15"]

would return:

true

if the habit was completed on that date.


============================================================
             2. DateContextType
============================================================

`DateContextType` describes everything that the
DateContext will make available to other components.

Think of this type as the CONTRACT for the Context.

It tells TypeScript:

"This Context will provide these pieces of data and these
functions."


------------------------------------------------------------
dateData
------------------------------------------------------------

`dateData: Date`

stores the date currently being viewed by the application.

It is a JavaScript Date object.

Other components can use this to determine which week/month
they should display.


------------------------------------------------------------
setDateData
------------------------------------------------------------

`setDateData` is the React state setter for `dateData`.

The complicated TypeScript type:

`React.Dispatch<React.SetStateAction<Date>>`

basically means:

"This is the React function that can update our Date state."

You do not need to memorize the full TypeScript syntax.

The important idea is:

dateData
    = current date

setDateData(...)
    = change current date


------------------------------------------------------------
habits
------------------------------------------------------------

`habits: Habit[]`

means that `habits` is an array containing Habit objects.

For example:

[
    habit1,
    habit2,
    habit3
]

Every item in that array must follow the `Habit` type defined
earlier.


------------------------------------------------------------
addHabit
------------------------------------------------------------

`addHabit: (name: string) => void`

describes a function.

It says:

"This function receives a string containing a habit name and
does not return a value."

For example:

addHabit("Exercise")


------------------------------------------------------------
deleteHabit
------------------------------------------------------------

`deleteHabit: (habitId: string) => void`

describes a function that receives the ID of a habit and
deletes that habit.

For example:

deleteHabit("habit-123")


------------------------------------------------------------
toggleHabitDay
------------------------------------------------------------

`toggleHabitDay: (habitId: string, dateString: string) => void`

describes a function that receives two strings:

1. The habit ID.
2. The date.

Its job is to change the completion status for that habit on
that specific date.


------------------------------------------------------------
goToToday
------------------------------------------------------------

`goToToday: () => void`

describes a function that takes no arguments and returns
nothing.

Its purpose is to change the current date back to today.


------------------------------------------------------------
dateToString
------------------------------------------------------------

`dateToString: (date: Date) => string`

describes a function that:

- Receives a JavaScript Date.
- Returns a string.

The string will use the format:

YYYY-MM-DD

For example:

2026-08-15


============================================================
                3. CREATE THE CONTEXT
============================================================

`createContext<DateContextType | null>(null)`

creates the actual React Context.

The important part is:

`DateContextType | null`

The `|` means "OR" in a TypeScript type.

Therefore, the Context can contain either:

- A `DateContextType` object.
- `null`.

The initial value is:

`null`

This is because the actual data will be provided later by
the Context Provider.


============================================================
             4. PROVIDER PROPS TYPE
============================================================

`DataContextProviderType` describes the props that the
Provider component can receive.

It contains:

`children?: ReactNode`

`children` represents whatever React elements are placed
inside the Provider.

For example:

<DateContextProvider>
    <App />
</DateContextProvider>

In this example:

`children` = `<App />`

`ReactNode` is a broad React type that represents things
React can render.


============================================================
                  5. THE PROVIDER
============================================================

`DateContextProvider` is the component responsible for
actually providing the Context data.

The Provider is what connects the Context to the rest of the
application.

A simplified way to think about it is:

DateContext
     ^
     |
DateContextProvider
     |
     +---- children/components


============================================================
                  DATE STATE
============================================================

`useState(new Date())`

creates the state for the date currently being viewed.

It gives us:

`dateData`
    The current date value.

`setDateData`
    The function used to change it.

The initial value is:

`new Date()`

which represents the current date and time.


============================================================
                  HABITS STATE
============================================================

`useState<Habit[]>(...)`

creates the application's main habit state.

The `<Habit[]>` tells TypeScript:

"This state will contain an array of Habit objects."

Therefore, `habits` will look conceptually like:

[
    {
        id: "...",
        name: "...",
        completedDates: {...}
    },
    {
        id: "...",
        name: "...",
        completedDates: {...}
    }
]


============================================================
                   localStorage
============================================================

The habit state is initialized using a function.

This function checks whether previously saved habits exist
in the browser's `localStorage`.

localStorage is browser storage that allows small amounts of
data to remain saved even after the page is refreshed.

This is important because without localStorage, the habits
stored only in React state would disappear when the page is
refreshed.


------------------------------------------------------------
GETTING STORED HABITS
------------------------------------------------------------

`localStorage.getItem("habits")`

asks the browser:

"Do you have something stored under the key 'habits'?"

If something exists, it returns it as a string.

If nothing exists, it returns `null`.


------------------------------------------------------------
IF STORED HABITS EXIST
------------------------------------------------------------

The `if (storedHabits)` condition checks whether something
was found.

If it exists, the code attempts to convert the stored string
back into JavaScript data.


------------------------------------------------------------
JSON.parse()
------------------------------------------------------------

`JSON.parse(storedHabits)`

converts the JSON string from localStorage back into a
JavaScript value.

This is necessary because localStorage stores data as text.

For example:

JavaScript object
        |
        v
JSON.stringify()
        |
        v
String stored in localStorage


When retrieving it:

String from localStorage
        |
        v
JSON.parse()
        |
        v
JavaScript object/array


------------------------------------------------------------
TRY / CATCH
------------------------------------------------------------

The JSON parsing happens inside a `try` block.

This is defensive programming.

If the stored data is corrupted or is not valid JSON,
`JSON.parse()` could throw an error.

The `catch` block handles that error instead of allowing the
application to crash.

The error is printed using:

`console.error(...)`

Then an empty array is returned.

This means:

"If the saved habit data is invalid, start with no habits
instead of crashing."


------------------------------------------------------------
NO STORED HABITS
------------------------------------------------------------

If there is nothing in localStorage, the function returns:

`[]`

This means the application starts with an empty habit list.


============================================================
                SAVING HABITS AUTOMATICALLY
============================================================

The `useEffect` below is responsible for saving the habits
whenever they change.

`useEffect(...)` allows React to perform a side effect after
rendering.

Saving data to localStorage is a side effect because it
interacts with something outside React's state system.


------------------------------------------------------------
JSON.stringify()
------------------------------------------------------------

Before storing the habits, they are converted into JSON:

`JSON.stringify(habits)`

This converts the JavaScript array into a string that can be
stored in localStorage.


------------------------------------------------------------
localStorage.setItem()
------------------------------------------------------------

`localStorage.setItem("habits", ...)`

stores the JSON string under the key:

`"habits"`

The next time the application starts, the initialization code
can retrieve this data.


------------------------------------------------------------
DEPENDENCY ARRAY
------------------------------------------------------------

The dependency array is:

`[habits]`

This tells React:

"Run this effect whenever `habits` changes."

So whenever a habit is:

- Added.
- Deleted.
- Marked as completed.
- Marked as incomplete.

the effect runs and saves the newest habit data.


============================================================
              DATE TO STRING HELPER
============================================================

`dateToString` converts a JavaScript Date into the format:

YYYY-MM-DD

This is an important helper because the application uses
date strings as keys inside `completedDates`.


------------------------------------------------------------
GETTING THE YEAR
------------------------------------------------------------

`date.getFullYear()`

gets the full year.

Example:

2026


------------------------------------------------------------
GETTING THE MONTH
------------------------------------------------------------

`date.getMonth()`

returns the month as a number from 0 to 11.

January = 0
February = 1
...
December = 11

Therefore, the code adds 1:

`date.getMonth() + 1`

so that January becomes 1 and December becomes 12.


------------------------------------------------------------
padStart()
------------------------------------------------------------

The month is converted into a string and:

`.padStart(2, "0")`

ensures that the month always contains two digits.

For example:

1 → "01"

8 → "08"

12 → "12"

The same thing is done for the day.

This ensures dates consistently look like:

2026-01-05

instead of:

2026-1-5


------------------------------------------------------------
WHY NOT toISOString()?
------------------------------------------------------------

The code intentionally uses local Date methods instead of
`toISOString()`.

`toISOString()` converts the date to UTC.

Depending on the user's timezone, this can sometimes cause a
date to shift to the previous or next day.

For a habit tracker, that would be a serious problem.

For example, if the user thinks it is August 15 locally but
the UTC conversion moves the date into August 14, the habit
could accidentally be stored under the wrong date.

Using:

`getFullYear()`
`getMonth()`
`getDate()`

keeps the date based on the user's local time.


============================================================
                  ADDING A HABIT
============================================================

`addHabit` is responsible for creating a new habit.


------------------------------------------------------------
TRIMMING THE NAME
------------------------------------------------------------

`name.trim()`

removes unnecessary spaces from the beginning and end of the
habit name.

For example:

"   Exercise   "

becomes:

"Exercise"


------------------------------------------------------------
EMPTY HABIT CHECK
------------------------------------------------------------

`if (!trimmedName)`

checks whether the resulting name is empty.

If it is empty, the function returns immediately.

This prevents habits such as:

""

or:

"     "

from being created.


------------------------------------------------------------
CREATING THE NEW HABIT
------------------------------------------------------------

The `newHabit` object follows the `Habit` type.

It contains:

`id`
    A unique identifier.

`name`
    The cleaned-up habit name.

`completedDates`
    An empty object because a newly created habit has not yet
    been completed on any dates.


------------------------------------------------------------
CREATING THE ID
------------------------------------------------------------

`Date.now()`

returns the current timestamp in milliseconds.

The code adds `"habit-"` to it.

This produces an ID similar to:

habit-1755200000000

The timestamp provides a simple way to create an identifier
that is very unlikely to be duplicated during normal use.


------------------------------------------------------------
ADDING TO THE ARRAY
------------------------------------------------------------

`setHabits([...habits, newHabit])`

creates a new array containing:

1. All existing habits.
2. The new habit.

The `...habits` syntax is the spread operator.

It essentially means:

"Take everything currently inside habits and put it here."

So:

[habit1, habit2]

plus:

habit3

becomes:

[habit1, habit2, habit3]

A new array is created rather than modifying the existing
array directly.

This is important in React because state should be updated
without directly mutating the existing state.


============================================================
                  DELETING A HABIT
============================================================

`deleteHabit` removes a habit based on its ID.


------------------------------------------------------------
FILTER
------------------------------------------------------------

`habits.filter(...)`

creates a new array containing only the habits that pass the
condition.

The condition is:

`habit.id !== habitId`

This means:

"Keep the habit if its ID is NOT the ID we want to delete."


For example:

habits:

habit-1
habit-2
habit-3

If we delete:

habit-2

the resulting array becomes:

habit-1
habit-3


------------------------------------------------------------
UPDATING STATE
------------------------------------------------------------

`setHabits(...)`

replaces the old habit array with the filtered array.

React then re-renders components that depend on the habit
state.


============================================================
              TOGGLING A HABIT DAY
============================================================

This is probably the most important function in the file.

`toggleHabitDay` changes whether a habit is completed on a
specific date.

It receives:

`habitId`
    Which habit to change.

`dateString`
    Which date to change.


------------------------------------------------------------
MAP THROUGH THE HABITS
------------------------------------------------------------

The function uses:

`habits.map(...)`

to create a new array of habits.

For every habit, it checks:

`if (habit.id === habitId)`

This asks:

"Is this the habit the user clicked?"


------------------------------------------------------------
THE TARGET HABIT
------------------------------------------------------------

If the ID matches, a new habit object is returned.

The spread operator:

`...habit`

copies all of the existing habit's properties.

This means we do not have to manually copy:

- id
- name
- completedDates

Instead, we copy everything and then replace the property
that needs to change.


------------------------------------------------------------
UPDATING completedDates
------------------------------------------------------------

The `completedDates` object is also copied using:

`...habit.completedDates`

This preserves all of the existing completion information.

Then the specific date is updated:

`[dateString]: !habit.completedDates[dateString]`


------------------------------------------------------------
THE SQUARE BRACKETS
------------------------------------------------------------

The square brackets around `dateString` are important.

They create a computed property name.

Instead of literally creating a property called:

`dateString`

the code uses the VALUE inside `dateString`.

For example, if:

dateString = "2026-08-15"

then:

`[dateString]`

becomes:

`"2026-08-15"`

So the resulting object might contain:

{
    "2026-08-15": true
}


------------------------------------------------------------
THE ! OPERATOR
------------------------------------------------------------

The `!` means "NOT".

It reverses a boolean value.

Therefore:

true → false

false → true

If the date is currently completed:

true

clicking it changes it to:

false

If it is currently incomplete:

false

clicking it changes it to:

true

This is why the function is called `toggleHabitDay`.

It switches the value between completed and incomplete.


------------------------------------------------------------
OTHER HABITS
------------------------------------------------------------

If:

`habit.id === habitId`

is false, the function simply returns the original habit.

This means clicking one habit does not accidentally change
the others.

Only the habit whose ID matches is modified.


============================================================
              WHY SPREAD OPERATORS ARE USED
============================================================

This function uses the spread operator at two levels.

First:

`...habit`

copies the existing habit.

Second:

`...habit.completedDates`

copies the existing completion-date object.

This is important because React state should be treated as
immutable.

Instead of changing an existing object directly, we create
new objects containing the updated information.

Conceptually:

OLD HABIT
    |
    +---- copy everything
    |
    +---- replace completedDates
             |
             +---- copy old dates
             |
             +---- change one date
                    |
                    v
                NEW HABIT


============================================================
                    GOING TO TODAY
============================================================

`goToToday` simply calls:

`setDateData(new Date())`

This changes the shared `dateData` to the current date.

Any component using `dateData` can then update accordingly.

For example, Heading can use this to return the user to the
current week.


============================================================
                  THE DATA OBJECT
============================================================

The `data` object collects everything that should be
available through the Context.

It contains:

`dateData`
    The currently selected date.

`setDateData`
    Function for changing the selected date.

`habits`
    All of the application's habits.

`addHabit`
    Function for creating a habit.

`deleteHabit`
    Function for deleting a habit.

`toggleHabitDay`
    Function for changing a habit's completion status.

`goToToday`
    Function for returning to today's date.

`dateToString`
    Function for converting Date objects to YYYY-MM-DD.


============================================================
                THE PROVIDER VALUE
============================================================

`<DateContext.Provider value={data}>`

is the part that actually makes the data available to other
components.

The `value` prop contains the `data` object.

This means:

"Any component rendered inside this Provider can access this
data through DateContext."


============================================================
                     CHILDREN
============================================================

`{children}` renders whatever was placed inside the
DateContextProvider.

For example:

<DateContextProvider>
    <App />
</DateContextProvider>

The Provider wraps `<App />`.

Therefore, App and the components inside App can access the
DateContext.

Conceptually:

DateContextProvider
        |
        +-- DateContext
        |
        +-- App
             |
             +-- Heading
             |
             +-- HabitList
                  |
                  +-- AddHabit
                  |
                  +-- HabitDay


============================================================
                  COMPLETE DATA FLOW
============================================================

The overall architecture works like this:

                    DateContextProvider
                           |
                           v
                    Shared application
                          state
                           |
             +-------------+-------------+
             |                           |
             v                           v
        dateData                       habits
             |                           |
             |                  +--------+--------+
             |                  |        |        |
             v                  v        v        v
          Heading           AddHabit HabitList HabitDay
             |                  |        |        |
             |                  |        |        |
             +------------------+--------+--------+
                              |
                              v
                       Context functions
                              |
             +----------------+----------------+
             |                |                |
             v                v                v
         addHabit        deleteHabit    toggleHabitDay


The components do not need to know exactly how the data is
stored.

They simply call the functions provided by the Context.


============================================================
                  localStorage DATA FLOW
============================================================

There is also a second important flow for persistence:

                  React `habits` state
                         |
                         v
                     useEffect
                         |
                         v
                  JSON.stringify()
                         |
                         v
                    localStorage


When the application starts:

                    localStorage
                         |
                         v
                  getItem("habits")
                         |
                         v
                     JSON.parse()
                         |
                         v
                  React `habits` state


This is what allows habits to survive a page refresh.


============================================================
                  EXAMPLE: ADDING A HABIT
============================================================

Suppose the user types:

"Exercise"

The AddHabit component calls:

addHabit("Exercise")

The Context then:

1. Trims the name.
2. Checks that it is not empty.
3. Creates a new Habit object.
4. Gives it a unique ID.
5. Gives it an empty completedDates object.
6. Adds it to the habits array.
7. React updates the habits state.
8. useEffect notices that habits changed.
9. The updated habits are saved to localStorage.
10. Components using habits re-render.


============================================================
              EXAMPLE: COMPLETING A DAY
============================================================

Suppose the user clicks the HabitDay for:

Habit:
"Exercise"

Date:
"2026-08-15"

HabitDay calls:

toggleHabitDay("habit-123", "2026-08-15")

The Context:

1. Finds the habit with ID "habit-123".
2. Copies that habit.
3. Copies its completedDates object.
4. Looks at "2026-08-15".
5. Reverses its current true/false value.
6. Creates a new habits array.
7. Updates React state.
8. useEffect saves the new state to localStorage.
9. HabitList/HabitDay re-render.
10. The button changes appearance.


============================================================
                  EXAMPLE: DELETING
============================================================

Suppose the user clicks Delete on:

"Exercise"

HabitList calls:

deleteHabit(habitId)

The Context:

1. Receives the habit ID.
2. Uses filter() to remove that habit.
3. Creates a new habits array.
4. Updates React state.
5. useEffect saves the new array to localStorage.
6. The UI re-renders without the deleted habit.


============================================================
                 IMPORTANT CONCEPTS
============================================================

This file combines many important React and TypeScript
concepts:

1. REACT CONTEXT
   Allows multiple components to share state and functions.

2. CONTEXT PROVIDER
   Makes the shared data available to child components.

3. useState
   Stores the application's changing state.

4. useEffect
   Performs a side effect whenever habits change.

5. TYPESCRIPT TYPES
   Defines exactly what habits and Context data should look
   like.

6. UNION TYPES
   `DateContextType | null` means the Context can contain
   either the expected data or null.

7. ReactNode
   Allows the Provider to accept React-renderable children.

8. ARRAY METHODS
   `map()` is used to update a specific habit.
   `filter()` is used to remove a habit.

9. SPREAD OPERATOR
   Used to create new objects and arrays without directly
   modifying the existing state.

10. RECORD
    `Record<string, boolean>` creates an object whose keys
    are strings and whose values are booleans.

11. JSON
    `JSON.stringify()` converts JavaScript data into a string.
    `JSON.parse()` converts it back.

12. localStorage
    Provides persistent browser storage for the habits.

13. DATE HANDLING
    JavaScript Date objects are converted into consistent
    local date strings.

14. EVENT / STATE FLOW
    Components call Context functions, those functions update
    state, and React re-renders the affected components.


============================================================
                      BIG PICTURE
============================================================

This file is essentially the CENTRAL BRAIN of the Habit
Tracker.

The visual components display information, but this Provider
owns the shared state and the operations that change it.

You can think of it like this:

                     DateContextProvider
                            |
          +-----------------+-----------------+
          |                 |                 |
          v                 v                 v
       dateData           habits          functions
          |                 |                 |
          |                 |       +---------+---------+
          |                 |       |         |         |
          |                 |       v         v         v
          |                 |    addHabit  delete    toggle
          |                 |                         |
          +-----------------+-------------------------+
                            |
                            v
                    React components


The components ASK the Context for information or tell it to
perform an action.

For example:

AddHabit:
    "Please add this habit."

HabitList:
    "Give me the habits."

HabitDay:
    "Toggle this habit on this date."

Heading:
    "Change the currently selected date."

The Context handles those requests and updates the shared
state.

Then React automatically re-renders the components that
depend on that state.


============================================================
                     FINAL SUMMARY
============================================================

If you understand this file, the rest of the application
becomes much easier to understand.

The core idea is:

STATE
    ↓
`dateData` and `habits`

FUNCTIONS
    ↓
`addHabit`
`deleteHabit`
`toggleHabitDay`
`goToToday`
`dateToString`

CONTEXT
    ↓
Packages the state and functions together.

PROVIDER
    ↓
Makes that package available to child components.

COMPONENTS
    ↓
Use the Context to read data and perform actions.

localStorage
    ↓
Keeps the habit data saved even after a page refresh.

So, rather than every component managing its own copy of the
habit data, there is one shared source of truth:

                    DateContextProvider

That is the main architectural purpose of this file.
*/
