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
            title: song.title,
            showOrder: parseInt(song.showOrder),
            showId: parseInt(song.showId),
            trackName: song.trackName ?? null,
        };
        if(song.act) songRequest.act = parseInt(song.act);
        if(song.baseSongId) songRequest.baseSongId = parseInt(song.baseSongId);
        if(song.copySongId) songRequest.copySongId = parseInt(song.copySongId);

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