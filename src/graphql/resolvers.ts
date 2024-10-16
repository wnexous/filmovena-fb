import AtorModel from "@/models/Ator.model";
import ElencoModel from "@/models/Elenco.model";
import EstiloModel from "@/models/Estilo.model";
import FilmeModel from "@/models/Filme.model";
import GeneroModel from "@/models/Genero.model";
import ProdutoraModel from "@/models/Produtora.model";
import query from "@/vendors/query";

import { IResolvers, } from '@graphql-tools/utils';

const resolvers: IResolvers<unknown, unknown> = {
    Query: {
        filmes: async () => await query.query("select * from Filme"),
        atores: async () => await query.query("select * from Ator"),
        elencos: async () => await query.query("select * from Elenco"),
        estilos: async () => await query.query("select * from Estilo"),
        generos: async () => await query.query("select * from Genero"),
        produtoras: async () => await query.query("select * from Produtora"),
    },
    Mutation: {
        async editarAtor(_, { model, whereId }: { model: FilmeModel, whereId: number }) {
            await query.update<FilmeModel>("Ator", model, { Id: whereId })
            return true
        },
        async deletarAtor(_, { modelId }: { modelId: number }) {
            await query.delete<FilmeModel>("Ator", { Id: modelId })
            return true
        },
        async editarElenco(_, { model, whereId }: { model: FilmeModel, whereId: number }) {
            await query.update<FilmeModel>("ELenco", model, { Id: whereId })
            return true
        },
        async deletarElenco(_, { modelId }: { modelId: number }) {
            await query.delete<FilmeModel>("Elenco", { Id: modelId })
            return true
        },
        async editarFilme(_, { model, whereId }: { model: FilmeModel, whereId: number }) {
            await query.update<FilmeModel>("Filme", model, { Id: whereId })
            return true
        },
        async deletarFilme(_, { modelId }: { modelId: number }) {
            await query.delete<FilmeModel>("Filme", { Id: modelId })
            return true
        },
        async editarGenero(_, { model, whereId }: { model: FilmeModel, whereId: number }) {
            await query.update<FilmeModel>("Genero", model, { Id: whereId })
            return true
        },
        async deletarGenero(_, { modelId }: { modelId: number }) {
            await query.delete<FilmeModel>("Genero", { Id: modelId })
            return true
        },
        async editarProdutora(_, { model, whereId }: { model: FilmeModel, whereId: number }) {
            await query.update<FilmeModel>("Produtora", model, { Id: whereId })
            return true
        },
        async deletarProdutora(_, { modelId }: { modelId: number }) {
            await query.delete<FilmeModel>("Produtora", { Id: modelId })
            return true
        }
        
    },
    Filme: {
        Id: (data: FilmeModel) => data.Id,
        Nome: (data: FilmeModel) => data.Nome,
        Dt_Lanc: (data: FilmeModel) => data.Dt_Lanc,
        IMDB: (data: FilmeModel) => Math.round(data.IMDB),
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
    Estilo: {
        Id: (data: EstiloModel) => data.Id,
        fk_Filme_Id: (data: EstiloModel) => data.fk_Filme_Id,
        fk_Genero_Id: (data: EstiloModel) => data.fk_Genero_Id,
    },
};


export default resolvers
