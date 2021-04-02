import { Show } from "../entities/Show";
import { BaseSong } from "../entities/BaseSong";
import { Song } from "../entities/Song";
import { Verse } from "../entities/Verse";
import { Options, ReflectMetadataProvider } from "@mikro-orm/core";
import "reflect-metadata";

const config: Options = {
    dbName: 'db/chessDb',
    type: 'sqlite',
    entities: [Show, BaseSong, Song, Verse],
    debug: process.env.NODE_ENV === "development",
    metadataProvider: ReflectMetadataProvider
}

export default config;