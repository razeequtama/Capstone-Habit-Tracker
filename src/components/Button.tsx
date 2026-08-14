import type { ReactNode } from "react"

type ButtonVariants = "primary" | "secondary" | "danger"

type ButtonType = {
    children: ReactNode,
    variant?: ButtonVariants,
    sizing?: string
}

export default function Button({children, variant = "primary", sizing = "mx-3 my-2 px-7 py-2"}: ButtonType)
{

    let variantSelection = "";

    switch(variant)
    {
    case "primary":
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

    return(
        <button className={`transition-all ${variantSelection} ${sizing}`}>
            {children}
        </button>
    )
}