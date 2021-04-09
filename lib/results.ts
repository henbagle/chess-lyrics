import {verses, songs, shows, baseSong} from "@prisma/client";

export interface Result
{
    success: boolean,
    result: string
}

export interface VerseResult extends Result
{
    verse?: verses,
    action?: "link" | "" | "clear"
}

export interface SongResult extends Result
{
    song?: songs
    action?: "edit" | ""
}

export interface ShowResult extends Result
{
    show?: shows
}

export interface BaseSongResult extends Result
{
    baseSong?: baseSong
}