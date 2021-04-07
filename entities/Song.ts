import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Show } from "./Show";
import { BaseSong } from "./BaseSong"

@Entity({ tableName:  'songs' })
export class Song {
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Show, {nullable : true, fieldName:"show"})
    show?: Show;

    @Property()
    title!: string;

    @ManyToOne(() => BaseSong, {nullable : true, fieldName:"baseSong"})
    baseSong?: BaseSong;

    @Property({nullable: true, fieldName:"trackName"})
    trackName?: string;

    @Property({nullable: true, fieldName:"showOrder"})
    showOrder!: number;

    @Property({nullable: true})
    act?: number;
}