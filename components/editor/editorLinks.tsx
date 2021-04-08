import DefaultLink from "components/defaultLink";
import { useState } from 'react';

export default function EditorLinks()
{
    const [closed, setClosed] = useState(true);

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
            </div>
            <div className="mr-3">
                <p className="font-bold">Shows:</p>
            </div>
        </div>
    </div>

    ))}</>)
}