import {Entity, PrimaryKey, Property, Enum } from "@mikro-orm/core";

export enum ShowFormat {
    album,
    fullyStaged,
    concert
}

@Entity({ tableName: 'shows' })
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

    @Property({fieldName:"openedDate"})
    openedDate?: Date;

    @Property({fieldName:"closedDate"})
    closedDate?: Date;

    @Property()
    notes?: string;

    @Property()
    soundtrack?: string;

    @Property()
    video?: string;

    @Property({fieldName:"shortName"})
    shortName?: string;
}
