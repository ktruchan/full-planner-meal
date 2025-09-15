import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "fullUser",
    password: "hasloDoProjektuFullstack",
    database: "meal_planner_db",
    synchronize: true, // WAŻNE: Tylko do celów deweloperskich!
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
});
