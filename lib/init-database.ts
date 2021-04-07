import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import config from "../config/mikro-orm";

const startOrm = async () => MikroORM.init(config);

export default startOrm;