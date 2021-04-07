import Container from "../../components/container";
import Date from "../../components/date";
import DefaultLink from "../../components/defaultLink";
import Head from "next/head";
import { shows, songs } from "@prisma/client";
import prisma from "../../db/prisma";
interface Props {
    show : shows & {songs: songs[]},
}

export default function ShowPage({show} : Props)
{
    return(
        <Container>
            <Head>
                <title>{`${show.title}`} - ChessLyrics</title>
            </Head>
            <h1 className="text-4xl font-bold">
                {show.title}
            </h1>
            {show.openedDate === null ? <p>
                Opened On: <Date dateString={show.openedDate} />
            </p>: null}
            {show.closedDate === null ? <p>
                Closed On: <Date dateString={show.closedDate} />
            </p>: null}

            <div className="my-4">
                <ul>
                    {show.songs.map((s) => (
                        <li key={s.id}>
                            {s.title}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-6 underline text-blue-700 hover:text-indigo-700">
                <DefaultLink href="/">
                    ← Back to home
                </DefaultLink>
            </div>
        </Container>

    )
}

export const getStaticProps = async ({params}) => {
    console.log(params);
    const show = await prisma.shows.findFirst({where : {key: params.showId}, include: {songs: true}})

    return {
        props: {show}
    }
}

export const getStaticPaths = async () => {
    const shows = await prisma.shows.findMany({select: {key: true}})
    const paths = shows.map(k => ({params: {showId: k.key}}));
    return {paths, fallback: false};
}