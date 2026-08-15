import type { ReactNode, MouseEventHandler } from "react"

type ButtonVariants = "primary" | "secondary" | "danger"

type ButtonType = {
    children: ReactNode,
    variant?: ButtonVariants,
    size?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({children, variant = "primary", size = "small", onClick}: ButtonType)
{

    let variantSelection = "";
    let sizeSelection = "";

    switch(variant)
    {
    case "primary":
    // Amber background, white color
      variantSelection = "text-amber-50 bg-indigo-600 rounded-md hover:bg-indigo-700";
      break;
    case "secondary":
      // Transparent background, purple border, and purple text that darkens on hover
      variantSelection = "rounded-md bg-transparent border-2 border-purple-600 text-purple-600 hover:border-purple-700 hover:text-purple-700 hover:border-4";
      break;
    case "danger":
      // No background, red text, and underlined text
      variantSelection = "rounded-md bg-transparent border-2 border-red-600 text-red-600 underline hover:text-red-700 hover:border-4";
      break;
    }

    switch(size)
    {
        case "small":
            sizeSelection = "px-6 py-2";
            break;
        case "medium":
            sizeSelection = "px-10 py-4";
            break;
        case "large":
            sizeSelection = "px-14 py-6";
            break;
    }


    return(
        <button onClick={onClick} className={`mx-2 my-2 transition-all ${variantSelection} ${sizeSelection} cursor-pointer`}>
            {children}
        </button>
    )
}

/*
============================================================
                  BUTTON COMPONENT EXPLANATION
============================================================

This component is a reusable button component.

Instead of creating and styling a separate <button> element
every time a button is needed, the application can use this
component and customize it with different props.

For example, the button can have:

- Different variants: primary, secondary, or danger.
- Different sizes: small, medium, or large.
- Different click behavior.
- Different content inside the button.

The main idea is that the component receives instructions
through props and then uses those instructions to determine
how the button should look and behave.


------------------------------------------------------------
IMPORTS
------------------------------------------------------------

`ReactNode` is imported as a TypeScript type.

ReactNode represents content that React can render.

This is used for the `children` prop because a button can
contain different types of React content, such as:

- Text
- Elements
- Icons
- Other React components

`MouseEventHandler` is also imported as a TypeScript type.

It describes the type of function that can be used when a
mouse event occurs.

Here, it is used to correctly type the `onClick` function for
an HTML button element.


------------------------------------------------------------
ButtonVariants TYPE
------------------------------------------------------------

`ButtonVariants` is a TypeScript union type.

It specifies exactly which values are allowed for the
button's `variant` prop.

The allowed values are:

- `"primary"`
- `"secondary"`
- `"danger"`

This gives us type safety.

For example, this is valid:

variant="primary"

But a value such as:

variant="blue"

would produce a TypeScript error because `"blue"` is not one
of the allowed variants.


------------------------------------------------------------
ButtonType
------------------------------------------------------------

`ButtonType` is a TypeScript type that describes all the
props that the Button component can receive.

It contains four properties:

`children`
    The content displayed inside the button.

`variant`
    Determines the visual style of the button.

`size`
    Determines how much padding the button has.

`onClick`
    Determines what happens when the button is clicked.


------------------------------------------------------------
children: ReactNode
------------------------------------------------------------

`children` represents whatever is placed between the
opening and closing Button tags.

For example:

<Button>
    Add
</Button>

In this case, `"Add"` is the `children`.

Another component could use:

<Button>
    Delete
</Button>

The same Button component can therefore display different
content without changing the component itself.


------------------------------------------------------------
variant?: ButtonVariants
------------------------------------------------------------

The `?` means that the `variant` prop is optional.

If the developer does not provide a variant, the component
will use its default value later in the function.

The type `ButtonVariants` restricts the possible values to:

- primary
- secondary
- danger


------------------------------------------------------------
size?: string
------------------------------------------------------------

The `size` prop is also optional.

It determines how much padding the button should have.

In this component, the expected values are:

- small
- medium
- large

Unlike `variant`, however, `size` is typed simply as
`string`.

This means TypeScript will technically allow any string,
even though the switch statement only provides styling for
small, medium, and large.


------------------------------------------------------------
onClick?: MouseEventHandler<HTMLButtonElement>
------------------------------------------------------------

The `onClick` prop is optional.

If it is provided, it should be a function that handles a
mouse click on an HTML button element.

The `?` means the component can be used without providing
an `onClick` function.


------------------------------------------------------------
BUTTON FUNCTION
------------------------------------------------------------

The Button component receives its props through the
destructured function parameters.

Instead of receiving one object and accessing its properties
individually, the component directly extracts:

- `children`
- `variant`
- `size`
- `onClick`

This makes the code shorter and easier to read.


------------------------------------------------------------
DEFAULT VALUES
------------------------------------------------------------

`variant = "primary"` means that if no variant is provided,
the button automatically uses the primary style.

For example:

<Button>
    Add
</Button>

automatically behaves as if:

variant="primary"

was provided.

Similarly:

`size = "small"`

means that if no size is provided, the button automatically
uses the small size.

This gives the component sensible defaults while still
allowing the developer to customize it.


------------------------------------------------------------
variantSelection
------------------------------------------------------------

`variantSelection` starts as an empty string.

It will eventually contain the Tailwind CSS classes that
correspond to the selected button variant.

The component changes this value using the first `switch`
statement.


------------------------------------------------------------
FIRST SWITCH STATEMENT
------------------------------------------------------------

The first `switch` checks the value of `variant`.

A switch statement is useful when there are several possible
values and each value should produce a different result.


------------------------------------------------------------
PRIMARY VARIANT
------------------------------------------------------------

If `variant` is `"primary"`:

`variantSelection` receives the Tailwind classes for the
primary button.

These classes give the button:

- Indigo background.
- Light/white text.
- Rounded corners.
- A darker indigo background when hovered.

The `break` stops the switch from continuing into the other
cases.


------------------------------------------------------------
SECONDARY VARIANT
------------------------------------------------------------

If `variant` is `"secondary"`:

`variantSelection` receives the classes for the secondary
button.

This style provides:

- A transparent background.
- A purple border.
- Purple text.
- A darker purple border and text when hovered.
- A thicker border when hovered.


------------------------------------------------------------
DANGER VARIANT
------------------------------------------------------------

If `variant` is `"danger"`:

`variantSelection` receives the classes for the danger
button.

This style provides:

- A transparent background.
- A red border.
- Red text.
- Underlined text.
- Darker red text when hovered.
- A thicker border when hovered.

This type of button is useful for actions such as deleting
or removing something because the red color communicates
that the action may be destructive.


------------------------------------------------------------
sizeSelection
------------------------------------------------------------

`sizeSelection` also starts as an empty string.

It will contain the Tailwind CSS classes that control the
button's size.

The second `switch` determines which classes should be used.


------------------------------------------------------------
SECOND SWITCH STATEMENT
------------------------------------------------------------

The second `switch` checks the value of `size`.

There are three supported sizes:

- small
- medium
- large


------------------------------------------------------------
SMALL
------------------------------------------------------------

When `size` is `"small"`:

`sizeSelection` becomes:

`px-6 py-2`

This gives the button smaller horizontal and vertical
padding.


------------------------------------------------------------
MEDIUM
------------------------------------------------------------

When `size` is `"medium"`:

`sizeSelection` becomes:

`px-10 py-4`

This gives the button more padding than the small version.


------------------------------------------------------------
LARGE
------------------------------------------------------------

When `size` is `"large"`:

`sizeSelection` becomes:

`px-14 py-6`

This gives the button the largest amount of padding.


------------------------------------------------------------
RETURN
------------------------------------------------------------

The component returns an HTML `<button>` element.

The important part is that the button's styling is built
dynamically using the values stored in:

`variantSelection`

and:

`sizeSelection`


------------------------------------------------------------
onClick={onClick}
------------------------------------------------------------

The `onClick` prop received by the Button component is passed
directly to the actual HTML `<button>` element.

This means the component does not need to know what should
happen when the button is clicked.

The component simply receives the function and passes it to
the button.

For example, another component can provide:

onClick={handleAddHabit}

Then clicking the Button will execute `handleAddHabit`.


------------------------------------------------------------
className
------------------------------------------------------------

The button uses a template literal to combine several
different groups of Tailwind CSS classes.

The classes come from three places:

1. General button styling.
2. `variantSelection`
3. `sizeSelection`

The general classes are:

`mx-2 my-2`
    Adds margin around the button.

`transition-all`
    Makes CSS changes animate smoothly.

`cursor-pointer`
    Changes the mouse cursor to indicate that the button
    can be clicked.

Then:

`${variantSelection}`

adds the classes selected by the variant switch.

And:

`${sizeSelection}`

adds the classes selected by the size switch.

This allows one Button component to dynamically create
different button styles.


------------------------------------------------------------
children IN THE BUTTON
------------------------------------------------------------

`{children}` determines what is displayed inside the button.

For example:

<Button>
    Add
</Button>

will display:

Add

And:

<Button>
    Delete
</Button>

will display:

Delete

The Button component therefore controls the button's styling
and behavior while allowing the parent component to decide
what content appears inside it.


============================================================
                    EXAMPLE OF THE LOGIC
============================================================

Imagine the component receives:

variant = "danger"
size = "large"

The first switch sees `"danger"` and selects the danger
Tailwind classes.

The second switch sees `"large"` and selects the large
padding classes.

The final button combines:

- General button classes
- Danger variant classes
- Large size classes

So the same Button component can create a large danger
button without needing a completely separate component.


============================================================
                 WHY THIS COMPONENT IS USEFUL
============================================================

The biggest advantage of this component is REUSABILITY.

Without this component, the application might have many
different <button> elements with repeated styling.

Instead, the application can use one reusable Button
component and simply change its props.

For example:

- `variant="primary"` for normal actions.
- `variant="secondary"` for alternative actions.
- `variant="danger"` for destructive actions.
- `size="small"` for compact buttons.
- `size="medium"` for normal-sized buttons.
- `size="large"` for prominent buttons.

This follows an important React principle:

Create reusable components and control their behavior through
props.


============================================================
                   IMPORTANT CONCEPTS
============================================================

This component demonstrates several important concepts:

1. TYPESCRIPT TYPES
   `ButtonVariants` and `ButtonType` describe what data the
   component is allowed to receive.

2. UNION TYPES
   `ButtonVariants` restricts the variant to specific values.

3. OPTIONAL PROPS
   The `?` means a prop does not have to be provided.

4. DEFAULT PROPS
   `variant = "primary"` and `size = "small"` provide
   automatic default values.

5. CHILDREN
   `children` allows the component to display flexible
   content inside the button.

6. REUSABLE COMPONENTS
   One Button component can be used throughout the
   application with different configurations.

7. EVENT HANDLERS
   `onClick` allows parent components to decide what happens
   when the button is clicked.

8. CONDITIONAL LOGIC
   The switch statements select different styles based on
   the received props.

9. DYNAMIC CLASS NAMES
   Template literals combine different Tailwind CSS classes
   depending on the selected variant and size.


============================================================
                      BIG PICTURE
============================================================

The component can be understood as a simple process:

       Parent Component
              |
              | sends props
              v
        Button Component
              |
       +------+------+
       |             |
       v             v
    variant         size
       |             |
       v             v
  Select style   Select padding
       |             |
       +------+------+
              |
              v
       Build className
              |
              v
       Render <button>
              |
              v
       Display children


In short, this component separates the button's reusable
design from the specific action the button performs.

The Button component decides HOW the button looks.

The parent component decides WHAT the button says and WHAT
should happen when it is clicked.

This makes the code easier to reuse, maintain, and update.
*/
