import Link from "next/link";
import { faChessRook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header(){
    return <header className="h-20 px-8 bg-yellow-100">
                <div className="md:w-2/3 w-full mx-auto pt-5 flex flex-row justify-between">
                    <div>
                        <Link href="/">
                            <h1 className="text-2xl font-bold cursor-pointer">ChessLyrics</h1>
                        </Link>
                    </div>
                    <div className="pt-1 text-lg flex flex-row">
                        <div className="mx-2">
                            <Link href="/lyrics">
                                Lyrics
                            </Link>
                        </div>
                        <div className="mx-2">
                            <Link href="/lyrics">
                                Blog
                            </Link>
                        </div>
                        <div className="ml-2">
                            <Link href="/about">
                                About
                            </Link>
                        </div>
                    </div>
                </div>
    </header>
}

// <FontAwesomeIcon className="mr-1" icon={faChessRook} />