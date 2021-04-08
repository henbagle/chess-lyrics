import React, {useState, useEffect} from "react";

interface AlertProps
{
    isError?: boolean
    className?: string
    children?: React.ReactNode
}

function errorColors(isError : boolean)
{
    if(isError) return "bg-red-500 border-red-700"
    else return "bg-green-500 border-green-700"
}

export default function Alert({isError, className, children} : AlertProps)
{
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if(children == null) setHidden(true);
        else {
            setHidden(false);
        }
    }, [isError, children])

    return (!hidden &&
     <div className={`w-full rounded-b-lg p-3 border-2 border-t-0 ${errorColors(isError)} ${className}`} onClick={() => setHidden(true)}>
        {children}
    </div>);
}