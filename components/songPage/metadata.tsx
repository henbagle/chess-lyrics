import {SongExtended} from "lib/song";

interface MetadataProps
{
    song: SongExtended
}

export function MetadataShort({song}: MetadataProps)
{
    return  <>
                {song?.show?.id !== song?.baseSong?.originalShowId && song.baseSong ?
                    <h3 className="text-md">
                        First instance: {song.baseSong.title} from the {song.baseSong.originalShow.shortName}
                    </h3> : null}
            </>
}