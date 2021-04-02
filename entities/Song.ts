import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Show } from "./Show";
import { BaseSong } from "./BaseSong"

@Entity()
export class Song {
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Show, {nullable : true})
    show?: Show;

    @Property()
    title!: string;

    @ManyToOne(() => BaseSong, {nullable : true})
    baseSong?: BaseSong;

    @Property()
    trackName?: string;

    @Property()
    showOrder!: number;

    @Property()
    act?: number;
}