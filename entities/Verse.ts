import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Song } from "./Song";
import "reflect-metadata";

@Entity({ tableName: 'verses' })
export class Verse{
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Song)
    song!: Song;

    @Property()
    verse!: string;

    @Property()
    position!: number;
}