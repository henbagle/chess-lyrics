import {Entity, PrimaryKey, Property, Enum } from "@mikro-orm/core";

export enum ShowFormat {
    album,
    fullyStaged,
    concert
}

@Entity()
export class Show{
    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @Property()
    subtitle?: string;

    @Property()
    key!: string;

    @Property()
    location?: string;

    @Property()
    theatre?: string;

    @Property()
    year!: number;

    @Enum(() => ShowFormat)
    format!: ShowFormat;

    @Property()
    openedDate?: string;

    @Property()
    closedDate?: string;

    @Property()
    notes?: string;

    @Property()
    soundtrack?: string;

    @Property()
    video?: string;
}
