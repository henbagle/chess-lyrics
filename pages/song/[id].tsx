import Container from "components/container";
import DefaultLink from "components/defaultLink";
import Head from "next/head";
import { shows, songs, baseSong, verses } from "@prisma/client";
import prisma from "db/prisma";
import Lyrics from "components/lyrics";

interface Props {
    song: songs &
    {
        show: shows,
        baseSong: baseSong & { originalShow: shows },
        verses: verses[]
        copySong?: songs & {verses: verses[]}
    }
}

export default function ShowPage({ song }: Props) {
    return (
        <Container>
            <Head>
                <title>{song.title} - {song.show.shortName} - ChessLyrics</title>
            </Head>
            <h1 className="text-4xl font-bold">
                {song.title}
            </h1>
            {song.show && <h2 className="text-xl">
                From: <DefaultLink href={`/show/${song.show.key}`}>{song.show.shortName}</DefaultLink>
            </h2>}
            {song?.show?.id !== song?.baseSong?.originalShowId ?
                <h3 className="text-md">
                    First instance: {song.baseSong.title} from the {song.baseSong.originalShow.shortName}
                </h3>
                : null}

            <h2 className="text-2xl mt-5 mb-3">
                Lyrics:
            </h2>
            
            <div className="inline-grid grid-cols-2 auto-rows-min align-start gap-x-10">
                {song.copySong !== null ?
                <Lyrics verses={song.copySong.verses} />:
                <Lyrics verses={song.verses} />
                }
            </div>

            <div className="mt-6 underline text-blue-700 hover:text-indigo-700">
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