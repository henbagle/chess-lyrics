import NextLink, {LinkProps} from "next/link";

export default function DefaultLink(props: React.PropsWithChildren<LinkProps>) {
    return <NextLink {...props} >
        <div className={`underline text-blue-600 hover:text-blue-800 visited:text-purple-600`}>
            {props.children}
        </div>
    </NextLink>
}