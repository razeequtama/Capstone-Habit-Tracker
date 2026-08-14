import {createContext, useState, type ReactNode} from "react";


// ============================================================
// 1. DESCRIBE WHAT OUR CONTEXT WILL CONTAIN
// ============================================================
//
// Our context will contain an object that looks like this:
//
// {
//     dateData: Date,
//     setDateData: some function
// }
//
// So we create a TypeScript type to describe that object.
//

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


    // ========================================================
    // 6. PUT BOTH THINGS INTO ONE OBJECT
    // ========================================================
    //
    // We want to send BOTH dateData and setDateData
    // through our Context.
    //
    // So we put them together in an object.
    //
    // "data" will look roughly like:
    //
    // {
    //     dateData: new Date(),
    //     setDateData: [function]
    // }
    //

    const data = {dateData, setDateData};


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