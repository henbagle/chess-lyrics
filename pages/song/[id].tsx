import Container from "components/container";
import DefaultLink from "components/defaultLink";
import Head from "next/head";
import {useRouter} from "next/router";
import { shows, songs, baseSong, verses } from "@prisma/client";
import prisma from "db/prisma";
import {SongExtended} from "lib/song"
import Title from "components/songPage/title";
import {MetadataShort} from "components/songPage/metadata";
import Lyrics from "components/songPage/lyrics";

interface Props {
    song: SongExtended
}

export default function LyricsPage({ song }: Props) {
    const {query: {debug}} = useRouter();
    if(song.copySong !== null) song.verses = song.copySong.verses;

    return (
        <Container>
            <Head>
                <title>{song.title} - {song.show.shortName} - ChessLyrics</title>
            </Head>
            <div className="mt-4" />
            
            <Title song={song} />
            <MetadataShort song={song} />

            <DefaultLink href={`/edit/song/${song.id}`}>Edit</DefaultLink>

            <h2 className="text-2xl mt-5 mb-3">
                Lyrics:
            </h2>
            
            <Lyrics verses={song.verses} debug={(debug == "true")}/>

            <div>    
                <DefaultLink href={`/show/${song.show.key}`}>
                    ← Back to show page
                </DefaultLink>
            </div>
        </Container>
    )
}


export const getStaticProps = async ({ params }) => {
    const song = await prisma.songs.findUnique({ 
        where: { id: parseInt(params.id) }, 
        include: { 
            verses: { orderBy: { position: 'asc' } }, 
            baseSong: { include: { originalShow: true } }, 
            show: true,
            copySong: { include: {verses: true}} } 
        })
    return {
        props: { song }
    }
}

export const getStaticPaths = async () => {
    const songs = await prisma.songs.findMany({ select: { id: true } })
    const paths = songs.map(k => ({ params: { id: k.id.toString() } }));
    return { paths, fallback: false };
}