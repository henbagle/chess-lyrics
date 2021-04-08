export default function Container({children}) {
    return (<div className="md:w-2/3 w-full md:mx-auto mx-4">
        {children}
        </div>)
}