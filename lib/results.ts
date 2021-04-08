import {verses, songs, shows, baseSong} from "@prisma/client";

export interface VerseResult
{
    result: string,
    success: boolean,
    verse?: verses,
    action?: "link" | "" | "clear"
}

export interface SongResult
{
    result: string,
    song?: songs
}

export interface ShowResult
{
    result: string,
    show?: shows
}

export interface BaseSongResult
{
    result: string,
    baseSong?: baseSong
}