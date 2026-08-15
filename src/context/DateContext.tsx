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