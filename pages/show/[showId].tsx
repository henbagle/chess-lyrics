import Container from "../../components/container";
import Date from "../../components/date";
import DefaultLink from "../../components/defaultLink";
import Head from "next/head";
import { Show } from "../../entities/Show";
import { Song } from "../../entities/Song";
import startOrm from "../../lib/init-database";
import { QueryOrder } from "@mikro-orm/core";

interface Props {
    show : Show,
    songs: Song[]
}

export default function ShowPage({show, songs} : Props)
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
                Opened On: <Date dateString={show.openedDate.toDateString()} />
            </p>: null}
            {show.closedDate === null ? <p>
                Closed On: <Date dateString={show.closedDate.toDateString()} />
            </p>: null}

            <div className="my-4">
                <ul>
                    {songs.map((s) => (
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
    const orm = await startOrm();
    const show = await orm.em.findOne(Show, {key: params.showId})
    const songRepository = await orm.em.getRepository(Song);
    const songs = await songRepository.find({show: show.id}, {orderBy: { showOrder : QueryOrder.ASC }});

    return {
        props: {show, songs}
    }
}

export const getStaticPaths = async () => {
    const orm = await startOrm();
    const shows = await orm.em.find(Show, {});
    const shortNames = shows.map(s => s.key);
    console.log(shortNames);
    
    return {shortNames, fallback: false};
}