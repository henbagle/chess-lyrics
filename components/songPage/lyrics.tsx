import { verses } from "@prisma/client";
interface LyricProps {
    verses: verses[],
    debug?: boolean
}

interface VerseProps {
    verse: verses,
    debug?: boolean
}

export function Verse({verse, debug}:VerseProps)
{
    if(!verse.verse.includes("@col"))
    {
        return (<p className="whitespace-pre-wrap col-span-2">
                {debug && `${verse.id} - ${verse.position}`}
                {verse.verse.trim()}
                <br/><br/>
            </p>)
    }
    else // Column directive!
    {
        const columns = verse.verse.split("@col").map(c => c.trim());
        return (<>
        {columns.map((verseText, i) => (
        <p className="whitespace-pre-wrap" key={`${verse.id}-${i}}`}>
                {debug && `${verse.id} - ${verse.position}`}
                {verseText}
                <br/><br/>
        </p>))} </>)
    }
}

export default function Lyrics({verses, debug}: LyricProps)
{
    return (<div className="inline-grid grid-cols-2 auto-rows-min align-start gap-x-10">
        {verses.map(el => (<Verse verse={el} key={el.position} debug={debug} />))}
    </div>);
}