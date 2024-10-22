/**
 * A funcao serve para evitar SqlInjection
 */

export default function buildInsertQueryByObj(obj: object): [string, string, string[]] {
    const columns = Object.keys(obj)
    let columnsStr = ""
    let valuesStr = ""
    const params: string[] = []
    for (const c of columns) {
        columnsStr += `${c}, `
        valuesStr += "?, "
        params.push(obj[c as keyof object])

    }

    return [columnsStr, valuesStr, params]
}