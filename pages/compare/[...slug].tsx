import Container from "components/container";
import DefaultLink from "components/defaultLink";
import Head from "next/head";
import { shows, songs, baseSong, verses } from "@prisma/client";
import prisma from "db/prisma";
import {SongExtended} from "lib/song"
import Title from "components/songPage/title";
import {MetadataShort} from "components/songPage/metadata";
import CompareLyrics from "components/songPage/compareLyrics";
import {mergeAndCompareSongs} from "lib/compare";

interface ComparePageProps
{
    a: SongExtended
    b: SongExtended
}

export default function ComparePage({a, b} : ComparePageProps)
{
    return <Container>
        <Head>
            <title>Compare {a.title} with {b.title} - ChessLyrics</title>
        </Head>

        <div className="grid grid-cols-2 gap-x-10 mt-4">
            <div><Title song={a}/></div>

            <div><Title song={b}/></div>

            <div><MetadataShort song={a} /></div>
            
            <div><MetadataShort song={b}/></div>

        </div>

        <CompareLyrics a={a.verses} b={b.verses} />

    </Container>
}

export async function getServerSideProps(context)
{
    const idA = parseInt(context.params.slug[0]);
    const idB = parseInt(context.params.slug[1]);
    if(isNaN(idA) || isNaN(idB)) return {notFound: true};

    const songA = await prisma.songs.findUnique({ 
        where: { id: idA}, 
        include: { 
            verses: { orderBy: { position: 'asc' } }, 
            baseSong: { include: { originalShow: true } }, 
            show: true,
            copySong: { include: {verses: true}} } 
        });

    const songB = await prisma.songs.findUnique({ 
        where: { id: idB}, 
        include: { 
            verses: { orderBy: { position: 'asc' } }, 
            baseSong: { include: { originalShow: true } }, 
            show: true,
            copySong: { include: {verses: true}} } 
        });

    if(songA === null || songB == null) return {notFound: true};
    if(songA.baseSongId !== songB.baseSongId) return {notFound: true};
    if(songA.copySongId) songA.verses = songA.copySong.verses; 
    if(songB.copySongId) songB.verses = songB.copySong.verses;

    [songA.verses, songB.verses] = mergeAndCompareSongs(songA.verses, songB.verses);
    return ({props: {a: songA, b: songB}});
}