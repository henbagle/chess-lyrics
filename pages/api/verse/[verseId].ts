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
                
            const result: VerseResult = {result: "Success", verse: updatedVerse, success: true};
            res.status(200).json(result);
        }
        catch {
            res.status(503).json({result: "Unable to create verse", success: false});
        }
    }
}
  