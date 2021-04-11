import { songs, Prisma } from "@prisma/client";
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

interface NewSongProps {
    shows: {
        id: number
        shortName: string,
    }[],
    baseSongs: {
        id: number,
        title: string
    }[]
}

export default function NewSong({shows, baseSongs}:NewSongProps)
{
    const [result, setResult] = useState<SongResult>();
    
    const onSubmit = async (song: any) => {
        const res: Response = await fetch("/api/songs/new", {method: 'POST', body: JSON.stringify({song})})
        const songRes: SongResult = await res.json();
        setResult(songRes);
    }

    return (
    <Container>
            <Head>
                <title>New Song - ChessLyrics</title>
            </Head>

            {result && <Alert isError={!result.success}>
                {result.result}
                {result.action=="edit" && <span>{" "}<DefaultLink href={`/edit/verse/${result.song?.id}`}>Edit it.</DefaultLink></span>}
            </Alert>}

            <h1 className="text-4xl font-bold pt-4">
                Create New Song
            </h1>
            <SongForm onSubmit={onSubmit} shows={shows} baseSongs={baseSongs} />
            <EditorLinks />
    </Container>
    )
}

export async function getServerSideProps()
{
    const shows = await prisma.shows.findMany({select: {id: true, shortName: true}});
    const baseSongs = await prisma.baseSong.findMany({select: {id: true, title: true}});
    return ({props: {shows, baseSongs}});
}