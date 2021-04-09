import prisma from "db/prisma";
import {SongResult} from "lib/results";
import {Prisma} from "@prisma/client";

export default async function handler(req, res) {
    if(req.method === "POST")
    {
        const {songId} = req.query;
        const {song} = await JSON.parse(req.body);
        delete song.id;
        const songRequest: Prisma.songsUncheckedCreateInput = {
            ...song
        }

        try {
            const idToUpdate = parseInt(songId);
            if(isNaN(idToUpdate)) res.status(400).json({result: "Not a song id.", success: false});

            const updatedSong = await prisma.songs.update({
                where: { id: idToUpdate},
                data: songRequest})
                
            const result: SongResult = {result: `Edited song ${updatedSong.id}.`, song: updatedSong, success: true};
            res.status(200).json(result);
        }
        catch {
            res.status(503).json({result: "Unable to create song", success: false});
        }
    }
}