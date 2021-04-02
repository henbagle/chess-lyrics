import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Show } from "./Show";
import "reflect-metadata";

@Entity({ tableName: 'baseSong' })
export class BaseSong {
    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @ManyToOne(() => Show, {nullable : true, fieldName:"originalShow"})
    originalShow?: Show;

    @Property({fieldName:"closedDate"})
    maxVerses: number = 1;
}