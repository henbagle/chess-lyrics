import {Entity, PrimaryKey, Property, Enum } from "@mikro-orm/core";

@Entity({ tableName: 'shows' })
export class Show{
    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @Property({nullable: true})
    subtitle?: string;

    @Property()
    key!: string;

    @Property({nullable: true})
    location?: string;

    @Property({nullable: true})
    theatre?: string;

    @Property()
    year!: number;

    @Property()
    format!: string;

    @Property({nullable: true, fieldName:"openedDate", hidden: true})
    openedDate?: Date = new Date();

    @Property({nullable: true, fieldName:"closedDate", hidden: true})
    closedDate?: Date = new Date();

    @Property({nullable: true})
    notes?: string;

    @Property({nullable: true})
    soundtrack?: string;

    @Property({nullable: true})
    video?: string;

    @Property({nullable: true, fieldName:"shortName"})
    shortName?: string;
}