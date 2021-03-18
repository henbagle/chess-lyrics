export default function Container({children}) {
    return (<div className="md:container md:mx-auto px-8 pt-4">
        {children}
        </div>)
}