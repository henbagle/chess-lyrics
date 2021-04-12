import { songs, verses, shows } from "@prisma/client";
import { useState } from "react";
import {FormApi} from "final-form";
import Container from "components/container";
import EditorLinks from "components/editor/editorLinks"
import Alert from "components/alert";
import DefaultLink from "components/defaultLink";
import Head from "next/head"
import SongForm from "components/editor/songForm";
import {SongResult} from "lib/results";
import prisma from "db/prisma";
import { ChessButton } from "components/formElements";
import { useRouter } from "next/router"

interface EditSongProps {
    song: songs & {
        verses: verses[],
        show: shows
    },
    shows: {
        id: number
        shortName: string,
    }[],
    baseSongs: {
        id: number,
        title: string
    }[]
}

export default function EditSong({song, shows, baseSongs}:EditSongProps)
{
    const [result, setResult] = useState<SongResult>();
    const router = useRouter();

    const onSubmit = async (song: any) => {
        const res: Response = await fetch(`/api/songs/${song.id}`, {method: 'POST', body: JSON.stringify({song})})
        const songRes: SongResult = await res.json();
        setResult(songRes);
    }

    return (
    <Container>
            <Head>
                <title>Edit Song - ChessLyrics</title>
            </Head>

            {result && <Alert isError={!result.success}>
                {result.result}
                {result.action=="edit" && <span>{" "}<DefaultLink href={`/edit/verse/${result.song?.id}`}>Edit it.</DefaultLink></span>}
            </Alert>}

            <h1 className="text-4xl font-bold pt-4">
                Edit Song
            </h1>
            <h2 className="text-xl"><DefaultLink href={`/song/${song.id}`}>{song.title}</DefaultLink> from <DefaultLink href={`/show/${song.show.key}`}>{song.show.shortName}</DefaultLink></h2> 
            <SongForm onSubmit={onSubmit} initialValues={song} shows={shows} baseSongs={baseSongs} />

            <div className="my-3">
                <h2 className="text-xl">Verses:</h2> 
                <ul>
                    {song.verses.map(v => (
                        <li key={v.id}>
                            {v.position}. {v.verse.slice(0, 80).replace(/[\r\n]+/gm, " ")}... - <DefaultLink href={`/edit/verse/${v.id}`}>Edit</DefaultLink>
                        </li>
                    ))}
                </ul>
            </div>

            <ChessButton className="bg-red-300" onClick={async () => {
                const res = await fetch(`/api/songs/${song.id}`, {method: 'DELETE'});
                if(res.ok) router.push("/edit/song/new");
            }}>Delete</ChessButton>

            <EditorLinks />
    </Container>
    )
}

export async function getServerSideProps(context)
{
    const id = parseInt(context.params.songId);
    if(isNaN(id)) return {notFound: true};

    const song = await prisma.songs.findUnique({where: {id}, include: {verses: {orderBy: {position: "asc"}}, show: true}});
    const shows = await prisma.shows.findMany({select: {id: true, shortName: true}});
    const baseSongs = await prisma.baseSong.findMany({select: {id: true, title: true}});

    if(song === null) return {notFound: true};
    else return ({props: {song, shows, baseSongs}});
}