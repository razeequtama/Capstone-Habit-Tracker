import { useState, useContext } from "react";
import { DateContext } from "../context/DateContext";
import Button from "./Button";

export default function AddHabit() {
  const context = useContext(DateContext);
  const [inputValue, setInputValue] = useState("");

  if (!context) {
    return null;
  }

  const { addHabit } = context;

  const handleAddHabit = () => {
    if (inputValue.trim()) {
      addHabit(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddHabit();
    }
  };

  return (
    <div className="bg-gray-800 mx-5 px-3 py-3 rounded-md mb-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add new habit..."
          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button onClick={handleAddHabit} size="small">
          Add
        </Button>
      </div>
    </div>
  );
}

/*
============================================================
                 ADDHABIT COMPONENT EXPLANATION
============================================================

This component is responsible for letting the user add a new
habit.

The user can add a habit by either clicking the "Add" button
or pressing the Enter key while typing in the input.

------------------------------------------------------------
IMPORTS
------------------------------------------------------------

- `useState` is a React Hook used to store and update the
  value typed into the input field.

- `useContext` is a React Hook used to access shared data or
  functions from a React Context.

- `DateContext` is the Context used by this application.
  This component uses it to access the `addHabit` function.

- `Button` is a reusable button component from the project.
  Using a custom component helps keep buttons consistent
  throughout the application.


------------------------------------------------------------
COMPONENT
------------------------------------------------------------

`AddHabit` is a React functional component.

Everything inside this function is related to displaying the
habit input and handling the user's interactions with it.


------------------------------------------------------------
CONTEXT
------------------------------------------------------------

`useContext(DateContext)` gives this component access to the
value provided by `DateContext`.

The result is stored in `context`.

The context is important because it contains the `addHabit`
function that this component needs to actually add a new
habit.

Instead of storing and managing the habit directly inside
this component, the component delegates that responsibility
to the Context.


------------------------------------------------------------
STATE
------------------------------------------------------------

`useState("")` creates a piece of React state called
`inputValue`.

- `inputValue` contains the current text in the input.
- `setInputValue` is the function used to change that text.
- `""` is the initial value, so the input starts empty.

This is an example of a controlled input because React state
is responsible for keeping track of what is currently typed.


------------------------------------------------------------
CONTEXT SAFETY CHECK
------------------------------------------------------------

`if (!context)` checks whether the Context value exists.

If the context does not exist, `return null` tells React not
to render anything.

This prevents the component from trying to use `addHabit`
when the required context is unavailable.


------------------------------------------------------------
GETTING addHabit
------------------------------------------------------------

`const { addHabit } = context` uses destructuring to take the
`addHabit` function out of the context object.

After this line, we can simply use `addHabit()` instead of
writing `context.addHabit()`.


------------------------------------------------------------
handleAddHabit
------------------------------------------------------------

`handleAddHabit` is the main function responsible for adding
the habit.

First, `inputValue.trim()` removes whitespace from the
beginning and end of the input and checks whether anything
meaningful was entered.

This prevents an empty habit, or a habit containing only
spaces, from being added.

If the input is valid:

1. `addHabit(inputValue)` sends the entered habit to the
   Context so it can be added to the application's data.

2. `setInputValue("")` clears the input field after the habit
   has been added.

This means the user can immediately type another habit.


------------------------------------------------------------
handleKeyPress
------------------------------------------------------------

`handleKeyPress` handles keyboard input from the text field.

The `e` parameter represents the keyboard event.

The TypeScript type:

`React.KeyboardEvent<HTMLInputElement>`

tells TypeScript that this event comes from a keyboard
interaction with an HTML input element.

`e.key === "Enter"` checks whether the user pressed the Enter
key.

If they did, `handleAddHabit()` is called.

This gives the user two ways to add a habit:

- Click the Add button.
- Press Enter.


------------------------------------------------------------
RETURN / JSX
------------------------------------------------------------

The `return` statement describes what React should display
on the screen.

The component renders:

- An outer container.
- A text input.
- An Add button.


------------------------------------------------------------
OUTER DIV
------------------------------------------------------------

The first `<div>` is the main container around the input and
button.

Its `className` contains Tailwind CSS utility classes.

For example:

- `bg-gray-800` gives the container a dark background.
- `mx-5` adds horizontal margin.
- `px-3` and `py-3` add padding.
- `rounded-md` gives the container rounded corners.
- `mb-4` adds space below the container.


------------------------------------------------------------
INNER DIV
------------------------------------------------------------

The second `<div>` uses Flexbox.

`flex` places the input and button in a flexible row.

`justify-between` creates space between the elements.

`items-center` vertically aligns the input and button.


------------------------------------------------------------
INPUT
------------------------------------------------------------

The `<input>` is where the user types the name of the habit.

`type="text"` specifies that the input accepts text.

`value={inputValue}` connects the input to the React state.

This means whatever is stored in `inputValue` is displayed
inside the input.

`onChange` runs whenever the user changes the text.

`e.target.value` contains the new text, and
`setInputValue(...)` updates the React state with that text.

For example, if the user types:

"Exercise"

then `inputValue` becomes:

"Exercise"


------------------------------------------------------------
onKeyPress
------------------------------------------------------------

`onKeyPress={handleKeyPress}` tells the input to use the
`handleKeyPress` function whenever the user presses a key.

This is what allows the Enter key to add the habit.


------------------------------------------------------------
PLACEHOLDER
------------------------------------------------------------

`placeholder="Add new habit..."` displays helpful text inside
the empty input.

The placeholder disappears when the user starts typing.


------------------------------------------------------------
INPUT STYLING
------------------------------------------------------------

The input's `className` contains Tailwind CSS classes that
control its appearance.

`flex-1` makes the input take up the available space.

`bg-gray-700` gives it a dark gray background.

`text-white` makes the typed text white.

`px-4` and `py-2` add internal spacing.

`rounded-md` gives the input rounded corners.

`placeholder-gray-400` changes the placeholder color.

`focus:outline-none` removes the browser's default focus
outline.

`focus:ring-2` and `focus:ring-indigo-500` create an indigo
focus ring when the input is selected.


------------------------------------------------------------
BUTTON
------------------------------------------------------------

The component uses the custom `Button` component instead of
a regular HTML `<button>`.

`onClick={handleAddHabit}` means that clicking the button
calls `handleAddHabit`.

`size="small"` passes a prop to the Button component telling
it to use its small button styling.

The text `Add` is displayed inside the button.


============================================================
                     COMPLETE FLOW
============================================================

The overall flow of the component is:

User types a habit
        ↓
`onChange` detects the change
        ↓
`setInputValue` updates the state
        ↓
`inputValue` stores the current text
        ↓
User clicks "Add" OR presses Enter
        ↓
`handleAddHabit()` runs
        ↓
`trim()` checks that the input is not empty
        ↓
`addHabit(inputValue)` adds the habit
        ↓
`setInputValue("")` clears the input


============================================================
                  MAIN REACT CONCEPTS
============================================================

This component demonstrates several important React
concepts:

1. `useState`
   Used to store changing information inside the component.

2. `useContext`
   Used to access shared data and functions from a Context.

3. Controlled inputs
   The input's value is controlled by React state.

4. Event handlers
   `onChange`, `onClick`, and `onKeyPress` respond to user
   interactions.

5. Destructuring
   `const { addHabit } = context` extracts a property from
   the context object.

6. Conditional rendering
   `return null` prevents the component from rendering when
   the required context is unavailable.

7. JSX
   The returned JSX describes the user interface.

8. Props
   `onClick` and `size` are passed to the reusable Button
   component.

9. Tailwind CSS
   The `className` values use Tailwind utility classes to
   style the interface.


============================================================
                       BIG PICTURE
============================================================

The most important idea is that this component has two
different responsibilities:

1. It manages what the user types.
   This is handled by `useState` and `inputValue`.

2. It asks the rest of the application to add the habit.
   This is handled by the `addHabit` function from
   `DateContext`.

So, this component does not need to know exactly how habits
are stored.

It only needs to collect the user's input and call
`addHabit()` with that input.

That separation makes the component easier to understand,
reuse, and maintain.
*/