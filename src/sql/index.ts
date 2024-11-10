import { readFileSync } from "fs";

const sql = {
    filmeListagem: readFileSync("src/sql/filmeListagem.sql", "utf-8")
}

export default sql