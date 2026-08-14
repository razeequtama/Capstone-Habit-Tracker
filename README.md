# Habit Tracker 
I'll be applying what I know about React and TypeScript through this simple project.
# Features
## Date Calculations
### Date Handling
This project uses JavaScript's built-in Date object to handle dates and calculate the days displayed for each week.

The main date calculations are handled in HabitList. Instead of manually calculating the day numbers, the application creates a new Date object for the start of the current week:

const startOfWeek = new Date(dateData);

startOfWeek.setDate(
    startOfWeek.getDate() - startOfWeek.getDay()
);

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

const thisDate = new Date(startOfWeek);

thisDate.setDate(
    startOfWeek.getDate() + index
);

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

const context = useContext(DateContext);

The context provides:

dateData
setDateData

dateData represents the currently selected date, while setDateData allows the date to be changed.

The Heading component uses setDateData to move between weeks:

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

Moving the date by -7 or +7 days changes the selected week.

Because Heading and HabitList share the same DateContext, changing the date in Heading automatically causes HabitList to update and display the corresponding week.

### Why Date Objects Are Copied

The application creates new Date objects instead of directly modifying the existing dateData:

const newDate = new Date(dateData);

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