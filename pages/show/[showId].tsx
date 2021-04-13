import Container from "components/container";
import Date from "components/date";
import DefaultLink from "components/defaultLink";
import TrackList from "components/showPage/trackList"
import Head from "next/head";
import { shows, songs } from "@prisma/client";
import prisma from "db/prisma";
interface Props {
    show : shows & {songs: songs[]},
}

export default function ShowPage({show} : Props)
{
    return(
        <Container>
            <Head>
                <title>{`${show.shortName}`} - ChessLyrics</title>
            </Head>
            <h1 className="text-4xl font-bold mt-4">
                {show.title}
            </h1>
            {show.subtitle && show.subtitle !== "" && 
            <h2 className="text-2xl">
                {show.subtitle}
            </h2>}

            {show.openedDate !== "" && <p>
                Opened On: <Date dateString={show.openedDate} />
            </p>}

            {show.closedDate !== "" && <p>
                Closed On: <Date dateString={show.closedDate} />
            </p>}

            <div className="my-4">
                <TrackList songs={show.songs} />
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
    const show = await prisma.shows.findFirst({where : {key: params.showId}, include: {songs: { orderBy: {showOrder: 'asc'}}}})

    return {
        props: {show}
    }
}

export const getStaticPaths = async () => {
    const shows = await prisma.shows.findMany({select: {key: true}})
    const paths = shows.map(k => ({params: {showId: k.key}}));
    return {paths, fallback: false};
}