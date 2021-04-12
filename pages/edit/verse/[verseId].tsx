import { verses, songs, shows } from "@prisma/client";
import { useState } from "react";
import Container from "components/container";
import EditorLinks from "components/editor/editorLinks"
import Alert from "components/alert";
import Head from "next/head"
import VerseForm from "components/editor/verseForm";
import DefaultLink from "components/defaultLink";
import {VerseResult} from "lib/results";
import prisma from "db/prisma";
import { ChessButton } from "components/formElements";
import { useRouter } from "next/router"

interface EditProps
{
    verse: verses & {
        song: songs & {
            show: shows;
        };
    },
    songs: {
        id: number
        title: string,
        showId: number
    }[]
}

export default function EditVerse({verse, songs} : EditProps)
{
    const [result, setResult] = useState<VerseResult>();
    const router = useRouter();

    const onSubmit = async (verse:Partial<verses>) => {
        const res: Response = await fetch(`/api/verse/${verse.id}`, {method: 'POST', body: JSON.stringify({verse})})
        const verseRes: VerseResult = await res.json();
        setResult(verseRes)
    }

    return (
    <Container>
            <Head>
                <title>Edit Verse - ChessLyrics</title>
            </Head>

            {result && <Alert isError={!result.success}>
                {result.result}
                {result.action && <span>{" "}<DefaultLink href={`/edit/verse/${result.verse?.id}`}>Edit it.</DefaultLink></span>}
            </Alert>}

            <h1 className="text-4xl font-bold pt-4">
                Edit Verse
            </h1>
            <h2 className="text-xl"><DefaultLink href={`/edit/song/${verse.song.id}`}>{verse.song.title}</DefaultLink> from <DefaultLink href={`/show/${verse.song.show.key}`}>{verse.song.show.shortName}</DefaultLink></h2> 
            <VerseForm onSubmit={onSubmit} initialValues={verse as verses} songs={songs} />
            <ChessButton className="bg-red-300" onClick={async () => {
                const res = await fetch(`/api/verse/${verse.id}`, {method: 'DELETE'});
                if(res.ok) router.push("/edit/verse/new");
            }}>Delete</ChessButton>
            <div>
                <DefaultLink href={`/edit/verse/${verse.id - 1}`}>Previous Verse</DefaultLink>{" - "}
                <DefaultLink href={`/edit/verse/${verse.id + 1}`}>Next Verse</DefaultLink> {" - "}
                <EditorLinks />
            </div>
    </Container>
    )
}

export async function getServerSideProps(context)
{
    const id = parseInt(context.params.verseId);
    if(isNaN(id)) return {notFound: true};

    const verse = await prisma.verses.findUnique({where: {id}, include: {song: {include: {show: true}}}});
    const songs = await prisma.songs.findMany({select: {id: true, title: true, showId: true}});

    if(verse === null) return {notFound: true};
    else return ({props: {verse, songs}});
}