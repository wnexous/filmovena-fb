import database from "@/libs/database"
import { QueryResult } from "mysql2"
import buildSetQueryByObj from "./buildSetQueryByObj"
import buildFieldsQueryByObj from "./buildFieldsQueryByObj"
import { XOR } from "@/interfaces/Xor"
const query = {
    query(query: string, params: string[] = []): Promise<QueryResult> {
        console.log('query', query)
        return new Promise((res, rej) => database.execute(query, params, (err, data) => {
            if (err) { rej(err) }
            else { res(data) }
        }))
    },
    update<T = object>(table: string, data: Partial<T>, where: XOR<T>) {
        const [sets, setsParams] = buildSetQueryByObj(data as object)
        const [setsWhere, setsWhereParams] = buildSetQueryByObj(where as object)

        return this.query(`UPDATE ${table} SET ${sets} WHERE ${setsWhere};`, [...setsParams, ...setsWhereParams])
    },
    select<T = object>(table: string, data: Partial<Record<keyof T, boolean>>, where: XOR<T>) {
        const fields = buildFieldsQueryByObj(data)
        const [setsWhere, setsWhereParams] = buildSetQueryByObj(where as object)

        return this.query(`Select ${fields} WHERE ${setsWhere};`, [...setsWhereParams])
    }
}
export default query