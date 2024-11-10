import { XOR } from "@/interfaces/Xor"
import database from "@/libs/database"
import { QueryResult } from "mysql2"
import buildFieldsQueryByObj from "./buildFieldsQueryByObj"
import buildInsertQueryByObj from "./buildInsertQueryByObj"
import buildSetQueryByObj from "./buildSetQueryByObj"
import getQueryFromArray from "./getQueryFromArray"
const query = {
    query<T = QueryResult>(query: string, params: string[] = []): Promise<T> {
        return new Promise<T>((res, rej) => database.execute(query, params, (err, data) => {
            if (err) { rej(err) }
            else { res(data as T) }
            this.log(query, params)
        }))
    },
    update<T = object>(table: string, data: Partial<T>, where: XOR<T>) {
        const [sets, setsParams] = buildSetQueryByObj(data as object)
        const [setsWhere, setsWhereParams] = buildSetQueryByObj(where as object)

        return this.query(`UPDATE ${table} SET ${sets} WHERE ${setsWhere};`, [...setsParams, ...setsWhereParams])
    },
    create<T = object>(table: string, data: Partial<T>) {
        const [columns, values, params] = buildInsertQueryByObj(data as object)

        return this.query(`INSERT INTO ${table} (${columns}) VALUES (${values});`, [...params])
    },
    delete<T = object>(table: string, where: XOR<T>) {
        const [setsWhere, setsWhereParams] = buildSetQueryByObj(where as object)
        return this.query(`DELETE FROM ${table} WHERE ${setsWhere};`, setsWhereParams)
    },
    selectWhere<T = object>(table: string, data: Partial<Record<keyof T, boolean>>, where: XOR<T>) {
        const fields = buildFieldsQueryByObj(data)
        const [setsWhere, setsWhereParams] = buildSetQueryByObj(where as object)

        return this.query(`SELECT ${fields} FROM ${table} WHERE ${setsWhere};`, [...setsWhereParams])
    },
    selectAll<T = object>(table: string, fields: string[]): Promise<T[]> {
        const fieldsAsString = getQueryFromArray(fields)

        return this.query<T[]>(`SELECT ${fieldsAsString} FROM ${table};`)
    },
    async log(query: string, params: string[]) {
        try {
            const finalQuery = query.replace(/\?/g, () => String(params.shift()));
            console.log('query:', finalQuery)
        } catch (error) { console.log('error', error) }
    }
}
export default query