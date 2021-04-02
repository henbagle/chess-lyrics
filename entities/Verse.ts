import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Song } from "./Song";

@Entity({ tableName: 'verses' })
export class Verse{
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Song, {fieldName:"song"})
    song!: Song;

    @Property()
    verse!: string;

    @Property()
    position!: number;
}