import { readFileSync } from "fs";
import path from "path";

const sql = {
    filmeListagem: readFileSync(path.join("src", "sql", "filmeListagem.sql"), "utf-8")
}

export default sql