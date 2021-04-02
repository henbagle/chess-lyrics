import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Show } from "./Show";
import { BaseSong } from "./BaseSong"
import "reflect-metadata";

@Entity({ tableName:  'songs' })
export class Song {
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Show, {nullable : true})
    show?: Show;

    @Property()
    title!: string;

    @ManyToOne(() => BaseSong, {nullable : true, fieldName:"baseSong"})
    baseSong?: BaseSong;

    @Property({fieldName:"trackName"})
    trackName?: string;

    @Property({fieldName:"showOrder"})
    showOrder!: number;

    @Property()
    act?: number;
}