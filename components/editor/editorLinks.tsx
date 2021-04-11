import DefaultLink from "components/defaultLink";
import { useState } from 'react';
import { useRouter } from "next/router"
import {SongResult} from "lib/results";
import {ChessInput, ChessButton} from "components/formElements";

async function copySongId(songIdString)
{
    const songId = parseInt(songIdString);
    if(isNaN(songId)) return;

    // Fetch request
    const res = await fetch("/api/songs/new", {method: 'POST', body: JSON.stringify({clone: true, song: {id: songId}})});

    if(res.ok)
    {
        const song:SongResult = await res.json();
        return song.song?.id;
    }
    else return null;
}

export default function EditorLinks()
{
    const [closed, setClosed] = useState(true);
    const [copySong, setCopySong] = useState("0");
    const router = useRouter();

    return (<>
    <span className="underline text-blue-600 hover:text-blue-800" onClick={() => setClosed(false)}>
        Show Editor Links</span>

    {(!closed && (
    <div className="absolute inset-5 md:w-1/4 h-1/4 p-2 py-1 rounded-md bg-gray-200">
        <div className="flex flex-row justify-between">
            <h3 className="text-lg">Editor: </h3>
            <button className="px-2 bg-gray-400 border-2 border-gray-600" onClick={() => setClosed(true)}>X</button>
        </div>
        <div className="flex flex-row justify-between">
            <div>
                <p className="font-bold">Verses:</p>
                <p><DefaultLink href="/edit/verse/new">New Verse</DefaultLink></p>
                <p><DefaultLink href="/edit/verse/0">Edit Verse</DefaultLink></p>
            </div>
            <div>
                <p className="font-bold">Songs:</p>
                <p><DefaultLink href="/edit/song/new">New Song</DefaultLink></p>
                <p><DefaultLink href="/edit/song/0">Edit Song</DefaultLink></p>
                <div className="mt-2">
                    <p className="font-bold"> Copy Song: </p>
                    <ChessInput className="w-20" value={copySong} onChange={e => setCopySong(e.target.value)}/>
                    <ChessButton className="py-0" onClick={async () => {
                        const result = await copySongId(copySong);
                        if(result != null) router.push(`/edit/song/${result}`);
                    }}>Do It</ChessButton>
                </div>
            </div>
            <div className="mr-3">
                <p className="font-bold">Shows:</p>
            </div>
        </div>
    </div>

    ))}</>)
}