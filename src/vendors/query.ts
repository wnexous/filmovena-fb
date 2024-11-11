import { XOR } from "@/interfaces/Xor"
import database from "@/libs/database"
import { QueryResult } from "mysql2"
import buildInsertQueryByObj from "./buildInsertQueryByObj"
import buildSetQueryByObj from "./buildSetQueryByObj"
import getQueryFromArray from "./getQueryFromArray"
const query = {
    query<T = QueryResult>(query: string, params: string[] = []): Promise<T> {
        /**
         * Metodo que resolve a promise quando recebe a callback da execução da query no banco
         */
        return new Promise<T>((res, rej) => database.execute(query, params, (err, data) => {
            if (err) { rej(err) }
            else { res(data as T) }
            this.log(query, params)
        }))
    },
    update<T = object>(table: string, data: Partial<T>, where: XOR<T>) {
        /**
         * Funcao buildSetQueryByObj(object) pega um objeto e retorna uma string
         * ccom seus valores substituidos por "?" e um array de strings ccom os valores
         * 
         * ex:{
         *  "Id": 1,
         * }
         * retornando
         *      setsWhere: "Id=?"
         *      setsWhereParams: [1]
         * nota1: o parametro where aceita um XOR do objeto, ou seja, apenas uma
         * proprieadade com um valor do objeto que estará sendo feita a manipulacao
         * 
         * nota2: como é um update, utilizamos a estrategia para os dados do where e para
         * os valores que serao iterados. Apos isso, seus parameros sao concatenados em um
         * array e mandado tudo junto.
         */
        const [sets, setsParams] = buildSetQueryByObj(data as object)
        const [setsWhere, setsWhereParams] = buildSetQueryByObj(where as object)

        return this.query(`UPDATE ${table} SET ${sets} WHERE ${setsWhere};`, [...setsParams, ...setsWhereParams])
    },
    create<T = object>(table: string, data: Partial<T>) {

        /**
         * funcao buildInsertQueryByObj(object) reccebe um objeto e transorma 
         * em uma string de colunas, uma string de "?" com a quantidade de seus itens
         * e os parametros que serao utilizados para substituir os "?"
         * 
         * ex:
         *  objeto ={
         *      "Nome": "ricardo",
         *      "Idade": 16
         * }
         * 
         * retorna: 
         *      columns: "Nome, Idade"
         *      values: "?, ?"
         *      params: ["ricardo", 16]
         */
        const [columns, values, params] = buildInsertQueryByObj(data as object)

        return this.query(`INSERT INTO ${table} (${columns}) VALUES (${values});`, [...params])
    },
    delete<T = object>(table: string, where: XOR<T>) {
        /**
         * Funcao buildSetQueryByObj(object) pega um objeto e retorna uma string
         * ccom seus valores substituidos por "?" e um array de strings ccom os valores
         * 
         * ex:{
         *  "Id": 1,
         * }
         * retornando
         *      setsWhere: "Id=?"
         *      setsWhereParams: [1]
         * nota: o parametro where aceita um XOR do objeto, ou seja, apenas uma
         * proprieadade com um valor do objeto que estará sendo feita a manipulacao
         */
        const [setsWhere, setsWhereParams] = buildSetQueryByObj(where as object)
        return this.query(`DELETE FROM ${table} WHERE ${setsWhere};`, setsWhereParams)
    },
    selectAll<T = object>(table: string, fields: string[]): Promise<T[]> {
        /**
         * Funcao getQueryFromArray(string[]) pega o array
         * e transforma em string
         * 
         * Ex: ["teste", "aaa", "123"] => "teste, aaa, 123"
         */
        const fieldsAsString = getQueryFromArray(fields)

        return this.query<T[]>(`SELECT ${fieldsAsString} FROM ${table};`)
    },
    async log(query: string, params: string[]) {
        /**
         * Metodo utilizado apenas para demonstrar as queries no console
         */
        try {
            const finalQuery = query.replace(/\?/g, () => String(params.shift()));
            console.log('Original:', query)
            console.log('Query:', finalQuery)
        } catch (error) { console.log('error', error) }
    }
}
export default query