/**
 * A funcao serve para evitar SqlInjection
 */

export default function buildInsertQueryByObj(obj: object): [string, string, string[]] {
    const columns = Object.keys(obj)
    let columnsStr = ""
    let valuesStr = ""
    const params: string[] = []
    for (let i = 0; i < columns.length; i++) {
        const col = columns[i]
        columnsStr += `${col}`
        valuesStr += "?"
        if ((i + 1) < columns.length) {
            columnsStr+=", "
            valuesStr+=", "
        }
        params.push(obj[col as keyof object])

    }

    return [columnsStr, valuesStr, params]
}