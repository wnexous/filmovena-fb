/**
 * A funcao serve para evitar SqlInjection
 * ela retorna dois valores, o sets e o setsParams
 * o sets cria uma string no formato: 
 *      Id = ?, Name = ?, Dado = ?
 * e a setsParams cria um array de strings no formato:
 *      [1, "Joao A.", "outro dado"]
 * afim de evitar a injeção de dados capazes de causar algum erro na sintaxe
 */

export default function buildSetQueryByObj(obj: object): [string, string[]] {
    const keys = Object.keys(obj)

    let sets = ``
    const setsParams = [] as string[]

    keys.forEach(((key, index) => {
        sets += `${key}=?`
        if ((index + 1) < keys.length) sets += ","
        setsParams.push(obj[key as keyof object])
    }))


    return [sets, setsParams]
}