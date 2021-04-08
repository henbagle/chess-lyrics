import { verses, Prisma } from "@prisma/client";
import { useState } from "react";
import Container from "components/container";
import EditorLinks from "components/editor/editorLinks"
import Alert from "components/alert";
import DefaultLink from "components/defaultLink";
import Head from "next/head"
import VerseForm from "components/editor/verseForm";
import {VerseResult} from "lib/results";
import prisma from "db/prisma";

interface NewVerseProps {
    songs: {
        id: number
        title: string
    }[]
}

export default function NewVerse({songs}:NewVerseProps)
{
    const [result, setResult] = useState<VerseResult>();
    
    const onSubmit = async (verse: any) => {
        const res: Response = await fetch("/api/verse/new", {method: 'POST', body: JSON.stringify({verse})})
        const verseRes: VerseResult = await res.json();
        setResult(verseRes);
    }

    return (
    <Container>
            <Head>
                <title>New Verse - ChessLyrics</title>
            </Head>

            {result && <Alert isError={!result.success}>
                {result.result}
                {result.action && <span>{" "}<DefaultLink href={`/edit/verse/${result.verse?.id}`}>Edit it.</DefaultLink></span>}
            </Alert>}

            <h1 className="text-4xl font-bold pt-4">
                Create New Verse
            </h1>
            <VerseForm onSubmit={onSubmit} songs={songs} />
            <EditorLinks />
    </Container>
    )
}

export async function getServerSideProps(context)
{
    const songs = await prisma.songs.findMany({select: {id: true, title: true}});
    return ({props: {songs}});
}