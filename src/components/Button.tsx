import type { ReactNode } from "react"

type ButtonVariants = "primary" | "secondary" | "danger"

type ButtonType = {
    children: ReactNode,
    variant?: ButtonVariants,
    size?: string
}

export default function Button({children, variant = "primary", size = "small"}: ButtonType)
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
        <button className={`mx-2 my-2 transition-all ${variantSelection} ${sizeSelection}`}>
            {children}
        </button>
    )
}