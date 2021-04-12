import {verses} from "@prisma/client"

interface CompareLyricsProps
{
    a: verses[],
    b: verses[]
}

interface VerseProps {
    verse: verses,
    debug?: boolean
}

export function CompareVerse({verse}:VerseProps)
{
    if(!verse.verse.includes("@col"))
    {
        return (<p className="whitespace-pre-wrap">
                {verse.verse.trim()}
                <br/><br/>
            </p>)
    }
    else // Column directive!
    {
        const columns = verse.verse.split("@col").map(c => c.trim());
        return (
            <div className="flex flex-row">

                {columns.map((verseText, i) => (
                <p className="whitespace-pre-wrap mr-20" key={`${i}}`}>
                        {verseText}
                        <br/><br/>
                </p>))}
            </div>);
    }
}

export default function CompareLyrics({a, b}:CompareLyricsProps)
{
    const combinedLyrics = combineLyrics(a, b);
    return (
    <div className="grid grid-cols-2 gap-x-10">
            <h2 className="text-2xl mt-5 mb-3">
                    Lyrics:
            </h2>
            <h2 className="text-2xl mt-5 mb-3">
                    Lyrics:
            </h2>
            {combinedLyrics.map(el => (<CompareVerse verse={el} key={el.position}/>))}
    </div>);
}

function combineLyrics(a: verses[], b: verses[]): verses[]
{
    const output = [];
    for(let i = 0; i<a.length; i++){
        output.push(a[i]);
        output.push(b[i]);
    }
    return output;
}