import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Show } from "./Show";

@Entity()
export class BaseSong {
    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @ManyToOne(() => Show, {nullable : true})
    originalShow?: Show;

    @Property()
    maxVerses: number = 1;
}