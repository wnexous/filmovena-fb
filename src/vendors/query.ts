import database from "@/libs/database"

export default function query(query: string) {
    return new Promise((res, rej) => database.execute(query, (err, data) => {
        if (err) { rej(err) }
        else { res(data) }
    }))
}