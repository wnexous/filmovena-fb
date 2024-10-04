
import envs from "@/config/envs";
import mysql from "mysql"

const mysqlClientSingleton = () => {
    return mysql.createConnection(envs.sql);
};

declare const globalThis: {
    mysqlGlobal: ReturnType<typeof mysqlClientSingleton>;
} & typeof global;

const database = globalThis.mysqlGlobal ?? mysqlClientSingleton();

export default database;

if (process.env.NODE_ENV !== 'production') globalThis.mysqlGlobal = database;