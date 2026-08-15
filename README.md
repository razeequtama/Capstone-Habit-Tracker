# Habit Tracker 
I'll be applying what I know about React and TypeScript through this simple project.
# Features
## Date Calculations
### Date Handling
This project uses JavaScript's built-in Date object to handle dates and calculate the days displayed for each week.

The main date calculations are handled in HabitList. Instead of manually calculating the day numbers, the application creates a new Date object for the start of the current week:

```tsx
const startOfWeek = new Date(dateData);

startOfWeek.setDate(
    startOfWeek.getDate() - startOfWeek.getDay()
);
```

getDay() returns a number from 0 to 6, where:

0 = Sunday
1 = Monday
2 = Tuesday
3 = Wednesday
4 = Thursday
5 = Friday
6 = Saturday

The current date's day number is subtracted from the current date to find the Sunday that starts the week.

### Calculating Each Day of the Week

Once the start of the week is found, each day is calculated by creating a copy of the starting date and adding the appropriate number of days:

```tsx
const thisDate = new Date(startOfWeek);

thisDate.setDate(
    startOfWeek.getDate() + index
);
```

The index from the days.map() function represents how many days to move forward from Sunday.

For example:

index 0 → Sunday
index 1 → Monday
index 2 → Tuesday
index 3 → Wednesday
index 4 → Thursday
index 5 → Friday
index 6 → Saturday

Using Date.setDate() allows JavaScript to automatically handle dates that cross into another month or year. This prevents problems where manually subtracting numbers could result in invalid dates or negative day numbers.

For example, a week can correctly be calculated as:

July 26
July 27
July 28
July 29
July 30
July 31
August 1

without manually handling the change from July to August.

### Date Context

The currently selected date is stored in a React Context called DateContext.

Both Heading and HabitList access this context using useContext():

```tsx
const context = useContext(DateContext);
```

The context provides:

dateData
setDateData

dateData represents the currently selected date, while setDateData allows the date to be changed.

The Heading component uses setDateData to move between weeks:

```tsx
const goToPreviousWeek = () => {
    const newDate = new Date(dateData);
    newDate.setDate(newDate.getDate() - 7);
    setDateData(newDate);
};

const goToNextWeek = () => {
    const newDate = new Date(dateData);
    newDate.setDate(newDate.getDate() + 7);
    setDateData(newDate);
};
```

Moving the date by -7 or +7 days changes the selected week.

Because Heading and HabitList share the same DateContext, changing the date in Heading automatically causes HabitList to update and display the corresponding week.

### Why Date Objects Are Copied

The application creates new Date objects instead of directly modifying the existing dateData:

```tsx
const newDate = new Date(dateData);
```

This is important because JavaScript Date objects are mutable. Creating a copy prevents the existing context state from being modified directly and works better with React's state management.

Overall Date Flow

The date handling can be summarized as:

DateContext
    ↓
dateData
    ↓
Heading
    ↓
Prev / Next buttons
    ↓
setDateData()
    ↓
New selected date
    ↓
HabitList
    ↓
Calculate start of week
    ↓
Calculate Sunday → Saturday
    ↓
Display weekly dates

This approach keeps the selected date in one shared location while allowing multiple components to respond to changes in the currently selected week.

## Habit Management

### Storing Habits by Date

The key insight in this application is that habit completion is stored using the actual calendar date, not the day of the week.

Each habit stores completion state in an object called `completedDates`:

```tsx
type Habit = {
  id: string;
  name: string;
  completedDates: Record<string, boolean>;
};
```

The `completedDates` object uses a YYYY-MM-DD string as the key. For example:

```tsx
{
  id: "habit-1692000000000",
  name: "Exercise",
  completedDates: {
    "2026-08-12": true,
    "2026-08-14": true,
    "2026-08-15": false
  }
}
```

This approach has an important advantage: if you mark August 15 as completed, navigate to a different week, and then navigate back to August 15, the completed state will still be there. The data isn't lost because it's keyed by the actual date, not by the day-of-week position.

### Converting Dates to Strings

To create the YYYY-MM-DD string key, the application uses a helper function in DateContext:

```tsx
const dateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
```

This function uses local time (not UTC), which prevents timezone-related date shifting.

For example:
- `new Date(2026, 7, 15)` → `"2026-08-15"`
- `new Date(2026, 7, 9)` → `"2026-08-09"`

### Multiple Habits

The application stores multiple habits in an array. Each habit is independent and tracks its own completion dates:

```tsx
const [habits, setHabits] = useState<Habit[]>([]);
```

When you add a habit, a new Habit object is created with a unique ID and added to the array:

```tsx
const addHabit = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
        return; // Don't add empty habits
    }
    const newHabit: Habit = {
        id: `habit-${Date.now()}`, // Unique ID using timestamp
        name: trimmedName,
        completedDates: {},
    };
    setHabits([...habits, newHabit]);
};
```

When you delete a habit, it's removed from the array without affecting other habits:

```tsx
const deleteHabit = (habitId: string) => {
    setHabits(habits.filter((habit) => habit.id !== habitId));
};
```

### Toggling Completion

To mark a day as complete or incomplete, the application toggles the value in `completedDates`:

```tsx
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
```

This function:
1. Maps through all habits
2. Finds the habit by its ID
3. Toggles the boolean value for that date
4. Returns the updated habits array

For example, if you click August 15 for the Exercise habit:
- First click: `completedDates["2026-08-15"]` changes from undefined → true (marked complete)
- Second click: `completedDates["2026-08-15"]` changes from true → false (marked incomplete)

### Visual States

Each day button can display four different states based on whether it's completed and whether it's today:

```tsx
if (isCompleted && isToday) {
    // Completed AND today: green with ring
    buttonClasses += " bg-green-600 text-white border-green-600 ring-2 ring-green-400";
} else if (isCompleted) {
    // Completed but not today: green
    buttonClasses += " bg-green-600 text-white border-green-600";
} else if (isToday) {
    // Today but not completed: gray with ring
    buttonClasses += " bg-gray-600 text-white border-gray-600 ring-2 ring-blue-400";
} else {
    // Not completed, not today: default gray
    buttonClasses += " bg-gray-600 text-white border-gray-600";
}
```

The four states are:

1. **Gray** - Not completed, not today
2. **Green** - Completed (regardless of date)
3. **Gray with blue ring** - Today but not completed
4. **Green with blue ring** - Today AND completed

This allows you to quickly see which days you've completed, which day is today, and which days are both.

### Persistent Storage with localStorage

The habits array is automatically saved to localStorage whenever it changes:

```tsx
useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
}, [habits]);
```

When the application starts, it loads the saved habits from localStorage:

```tsx
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
```

This is called "lazy initialization" of state. Instead of starting with an empty array and then loading from localStorage in a separate useEffect, the initial state is computed by reading localStorage immediately.

If the data in localStorage is corrupted or can't be parsed, the application safely falls back to an empty array rather than crashing.

## Habit Flow Summary

The habit tracking process works like this:

DateContext
    ↓
habits array
    ↓
HabitList
    ↓
Map through habits
    ↓
For each habit, map through 7 days
    ↓
Create HabitDay component
    ↓
HabitDay checks completedDates["YYYY-MM-DD"]
    ↓
Display visual state (gray, green, with ring, etc.)
    ↓
User clicks day
    ↓
toggleHabitDay(habitId, dateString)
    ↓
completedDates is updated
    ↓
localStorage saved automatically
    ↓
Component re-renders with new state

# Button Types
![alt text](<docs/Button Variants.png>)
- Primary: Gentle amber color, white text, good for main actions.
- Secondary: Only amber outline, amber color, good for small actions.
- Danger: Only red color and red underline, good for deletion or danger-indicated actions
## How to Change Button Types
Set the "variant" attribute into "primary" | "secondary" | "danger" to a button component.
![alt text](<docs/Button Variants Change.png>)
# Button Sizes
![alt text](<docs/Button Sizes.png>)
- Small: 24px for X-Axis padding, 8px for Y-Axis padding, (px-6 py-2) 
- Medium: 40px for X-Axis padding, 16px for Y-Axis padding, (px-10 py-4) 
- Large: 56px for X-Axis padding, 24px for Y-Axis padding, (px-14 py-6) 
## How to Change Button Sizes
Set the "size" attribute into "small" | "medium" | "large" to a button component.
![alt text](<docs/Button Sizes Change.png>)