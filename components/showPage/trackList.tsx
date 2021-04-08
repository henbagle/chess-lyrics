import DefaultLink from "../../components/defaultLink";
import { songs } from "@prisma/client";
interface TrackListProps {
    songs: songs[],
}

interface SongLiProps
{
    song: songs
}

function SongLi({song}:SongLiProps)
{
    return <li>
            <span>
                {song.showOrder}.{" "}
            </span>

            <span className="font-bold">
                <DefaultLink href={`/song/${song.id}`}>
                {song.title}
                </DefaultLink>{" "}
            </span>
            
            {song.trackName && song.trackName != "" && song.trackName != song.title &&
            <span>
                ({song.trackName})
            </span>}
        </li>
}

export default function TrackList({songs} : TrackListProps) {
    const acts = songs.map(el => el.act).filter((el, i, arr) => (arr.indexOf(el) === i && el !== null));

    if(acts.length == 0)
    {
        return <ul>
            {songs.map((el) => <SongLi song={el} key={el.id}/>)}
        </ul>
    }
    else
    {
        const songsToActs = acts.map((el) => songs.filter(sng => sng.act == el));
        return <div>
            {songsToActs.map(actSongs =>
            <div key={"act"+actSongs[0].act}>
                <h4 className="text-lg">Act {actSongs[0].act}:</h4>
                <ul>
                {actSongs.map((el) => <SongLi song={el} key={el.id}/>)}
                </ul>
            </div>)}
        </div>
    }
}