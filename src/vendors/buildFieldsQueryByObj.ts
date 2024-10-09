/**
 * A funcao serve para evitar SqlInjection
 * ela retorna dois valores, o sets e o setsParams
 * o sets cria uma string no formato: 
 *      Id = ?, Name = ?, Dado = ?
 * e a setsParams cria um array de strings no formato:
 *      [1, "Joao A.", "outro dado"]
 * afim de evitar a injeção de dados capazes de causar algum erro na sintaxe
 */

export default function buildFieldsQueryByObj(obj: object): string {
    const keys = Object.keys(obj)
    return keys.join(", ")
}