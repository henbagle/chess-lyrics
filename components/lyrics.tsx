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
    if(!verse.verse.includes("@col"))
    {
        return (<p className="whitespace-pre-wrap col-span-2">
                {verse.verse}
                <br/><br/>
            </p>)
    }
    else // Column directive!
    {
        const columns = verse.verse.split("@col").map(c => c.trim());
        return (<>
        {columns.map((verseText, i) => (
        <p className="whitespace-pre-wrap" key={`${verse.id}-${i}}`}>
                {verseText}
                <br/><br/>
        </p>))} </>)
    }
}

export default function Lyrics({verses, compare}: LyricProps)
{
    return <>{verses.map(el => (<Verse verse={el} key={el.position} />))}</>;
}