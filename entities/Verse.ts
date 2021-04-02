import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Song } from "./Song";

@Entity()
export class Verse{
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Song)
    originalShow!: Song;

    @Property()
    verse!: string;

    @Property()
    position!: number;
}