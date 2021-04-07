export default function Container({children}) {
    return (<div className="md:w-2/3 w-full mx-auto pt-4">
        {children}
        </div>)
}