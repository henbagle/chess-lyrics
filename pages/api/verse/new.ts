import prisma from "db/prisma";
import {VerseResult} from "lib/results";
import {verses, Prisma} from "@prisma/client";

export default async function handler(req, res) {
    if(req.method === 'POST')
    {
        const body = await JSON.parse(req.body);
        const verseRequest: Prisma.versesUncheckedCreateInput = 
            {verse: body.verse.verse, 
            songId: parseInt(body.verse.songId),
            position: parseInt(body.verse.position)};

        try {
            const checkForExistingVerse = await prisma.verses.findFirst({where: {songId: verseRequest.songId, position:verseRequest.position}});
            if(checkForExistingVerse !== null)
            {
                const result: VerseResult = {result: "Already a verse in that position", verse: checkForExistingVerse, action:"link", success: false};
                res.status(400).json(result);
                return;
            }
            const newVerse = await prisma.verses.create({data: verseRequest})
            const result: VerseResult = {result: `Created verse ${newVerse.id} in position ${newVerse.position} on song ${newVerse.songId}`, verse: newVerse, action:"clear", success: true};
            res.status(200).json(result);
            return;
        }
        catch {
            const result: VerseResult = {result: "Unable to create verse", success: false};
            res.status(503).json(result);
            return;
        }
    }
}
  