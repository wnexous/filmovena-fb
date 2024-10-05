import AtorModel from "@/models/Ator.model";
import ElencoModel from "@/models/Elenco.model";
import FilmeModel from "@/models/Filme.model";
import GeneroModel from "@/models/Genero.model";
import ProdutoraModel from "@/models/Produtora.model";
import query from "@/vendors/query";

const resolvers = {
    Query: {
        filmes: async () => await query("select * from Filme"),
        atores: async () => await query("select * from Ator"),
        elencos: async () => await query("select * from Elenco"),
        estilos: async () => await query("select * from Estilo"),
        generos: async () => await query("select * from Genero"),
        produtoras: async () => await query("select * from Produtora"),
    },
    Filme: {
        Id: (data: FilmeModel) => data.Id,
        Nome: (data: FilmeModel) => data.Nome,
        Dt_Lanc: (data: FilmeModel) => data.Dt_Lanc,
        IMDB: (data: FilmeModel) => data.IMDB,
        Tempo_duracao: (data: FilmeModel) => data.Tempo_duracao,
        Faixa_Etaria: (data: FilmeModel) => data.Faixa_Etaria,
        Sinopse: (data: FilmeModel) => data.Sinopse,
        fk_Produtora_Id: (data: FilmeModel) => data.fk_Produtora_Id,
    },
    Ator: {
        Id: (data: AtorModel) => data.Id,
        Nome: (data: AtorModel) => data.Nome,
        Dt_Nasc: (data: AtorModel) => data.Dt_Nasc,
        Sexo: (data: AtorModel) => data.Sexo,
        Nacionalidade: (data: AtorModel) => data.Nacionalidade,
        Raca: (data: AtorModel) => data.Raca,
        Qntd_Oscar: (data: AtorModel) => data.Qntd_Oscar,
        Dt_Morte: (data: AtorModel) => data.Dt_Morte,
    },
    Genero: {
        Id: (data: GeneroModel) => data.Id,
        Nome: (data: GeneroModel) => data.Nome,
        Descricao: (data: GeneroModel) => data.Descricao,
    },
    Produtora: {
        Id: (data: ProdutoraModel) => data.Id,
        Nome: (data: ProdutoraModel) => data.Nome,
        Ano_Fund: (data: ProdutoraModel) => data.Ano_Fund,
    },
    Elenco: {
        Id: (data: ElencoModel) => data.Id,
        fk_Ator_Id: (data: ElencoModel) => data.fk_Ator_Id,
        fk_Filme_Id: (data: ElencoModel) => data.fk_Filme_Id,
    },
};


export default resolvers
