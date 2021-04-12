import prisma from "db/prisma";
import {SongResult} from "lib/results";
import {songs, Prisma} from "@prisma/client";

export default async function handler(req, res) {
    if(req.method === 'POST')
    {
        try {
            const {clone, song} = await JSON.parse(req.body);
            const result: SongResult = {result: `Created song`, success: true, action: "edit"};
            if(clone)
            {
                const songIdToClone = parseInt(song.id);
                const verseToClone = await prisma.songs.findUnique({where: {id:songIdToClone}, select: {verses: true}});

                if(!verseToClone?.verses || verseToClone.verses.length == 0) throw "Err";

                const newVerseTemplates = verseToClone.verses.map((v) => ({
                    position: v.position,
                    verse: v.verse
                }));

                const newSong = await prisma.songs.create({data: {
                    title: "Fill me",
                    showId: 0,
                    showOrder: 0,
                    verses: {create: newVerseTemplates}
                }});

                result.song = newSong;
                result.action = "edit";
            }
            else 
            {
                const songRequest: Prisma.songsUncheckedCreateInput = {
                    title: song.title,
                    showOrder: parseInt(song.showOrder),
                    showId: parseInt(song.showId),
                    hasLyrics: song.hasLyrics
                };
                if(song.trackName) songRequest.trackName = song.trackName;
                if(song.act) songRequest.act = parseInt(song.act);
                if(song.baseSongId) songRequest.baseSongId = parseInt(song.baseSongId);
                if(song.copySongId) songRequest.copySongId = parseInt(song.copySongId);
                console.log(songRequest);
                const newSong = await prisma.songs.create({data: songRequest})
                result.song = newSong;
            }

            res.status(200).json(result);
            return;
        }
        catch (err) {
            console.log(err);
            const result: SongResult = {result: "Unable to create song", success: false};
            res.status(503).json(result);
            return;
        }
    }
}
  