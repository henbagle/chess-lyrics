import prisma from "db/prisma";
import {VerseResult} from "lib/results";
import {Prisma} from "@prisma/client";

export default async function handler(req, res) {
    if(req.method === 'POST')
    {
        const {verseId} = req.query;
        const body = await JSON.parse(req.body);
        const verseRequest: Prisma.versesUncheckedCreateInput = 
            {verse: body.verse.verse, 
            songId: parseInt(body.verse.songId),
            position: parseInt(body.verse.position)};

        try {
            const idToUpdate = parseInt(verseId);
            if(isNaN(idToUpdate)) res.status(400).json({result: "Not a verse Id.", success: false});

            const updatedVerse = await prisma.verses.update({
                where: { id: idToUpdate},
                data: verseRequest})
                
            const result: VerseResult = {result: `Edited verse ${updatedVerse.id} in position ${updatedVerse.position} on song ${updatedVerse.songId}`, verse: updatedVerse, success: true};
            res.status(200).json(result);
        }
        catch {
            res.status(503).json({result: "Unable to create verse", success: false});
        }
    }
    if(req.method === "DELETE")
    {
        try {
            const {verseId} = req.query;
            const id = parseInt(verseId);
            if(isNaN(id)) throw "not id";
            const verse = await prisma.verses.delete({where: {id: id}});
            res.status(200).json({result:`Deleted verse ${id}`, verse, success: true});
        }
        catch (err)
        {
            res.status(503).json();
        }
    }
}
  