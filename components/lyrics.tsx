import { verses } from "@prisma/client";
interface LyricProps {
    verses: verses[],
    compare?: boolean
}

interface VerseProps {
    verse: verses,
    compare?: boolean
}

function Verse({verse}:VerseProps)
{
    return (<p className="whitespace-pre-wrap">
            {verse.verse}
            <br/>
            <br/>
        </p>)
}

export default function Lyrics({verses, compare}: LyricProps)
{
    return <>{verses.map(el => (<Verse verse={el} key={el.position} />))}</>;
}