

/**
 * Tive que colocar a query chumbada aqui pois nao estava conseguindo ler o diretorio dentro da vercel
 */
const sql = {
    filmeListagem: `SELECT
	f.Id, 
    f.Nome, 
    f.Tempo_duracao, 
    f.Dt_Lanc, 
    f.IMDB, 
    fe.Descricao AS FaixaEtaria_Descricao,
    p.Nome AS Produtora_Nome
FROM Filme AS f
  INNER JOIN FaixaEtaria AS fe ON f.fk_FaixaEtaria_Id = fe.Id
  INNER JOIN Produtora AS p ON p.Id = f.fk_Produtora_Id;`
}

export default sql