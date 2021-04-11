import {SongExtended} from "lib/song";
import DefaultLink from "components/defaultLink";

interface TitleProps
{
    song: SongExtended
}

export default function Title({song}: TitleProps)
{
    return  <>
                <h1 className="text-4xl font-bold">{song.title}</h1>
                {song.show && <h2 className="text-xl">
                    From: <DefaultLink href={`/show/${song.show.key}`}>{song.show.shortName}</DefaultLink>
                </h2>}
            </>
}