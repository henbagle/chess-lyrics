import { DetailedHTMLProps, InputHTMLAttributes, ButtonHTMLAttributes, SelectHTMLAttributes } from "react"

export function ChessButton({className, children, ...restProps}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>)
{
    return <button className={`font-bold border-2 p-2 bg-gray-300 ${className ?? ""}`} {...restProps}>
        {children}
    </button>
}

export function ChessInput({className, ...restProps}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>)
{
    return <input className={`border-2 rounded-md px-2 text-md text-grey-darkest focus:ring ${className ?? ""}`} {...restProps}/>
}

export function ChessSelect({className, children, ...restProps}:DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>)
{
    return <select className={`border-2 rounded-md px-1 py-0.5 text-md text-grey-darkest focus:ring ${className ?? ""}`} {...restProps}>
        {children}
    </select>
}