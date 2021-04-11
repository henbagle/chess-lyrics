import {songs, shows, baseSong, verses} from "@prisma/client";

export type SongExtended = songs &
{
    show: shows,
    baseSong: baseSong & { originalShow: shows },
    verses: verses[]
    copySong?: songs & {verses: verses[]}
}