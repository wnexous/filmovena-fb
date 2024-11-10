import AtorModel from "@/models/Ator.model";
import CategoriaOscarModel from "@/models/CategoriaOscar.model";
import ElencoModel from "@/models/Elenco.model";
import EstiloModel from "@/models/Estilo.model";
import FaixaEtariaModel from "@/models/FaixaEtaria.model";
import FilmeModel from "@/models/Filme.model";
import FilmeListagemModel from "@/models/FilmeListagem.model";
import GeneroModel from "@/models/Genero.model";
import OscarModel from "@/models/Oscar.model";
import ProdutoraModel from "@/models/Produtora.model";
import sql from "@/sql";
import getFieldsFromInfo from "@/vendors/getFieldsFromInfo";
import query from "@/vendors/query";

const resolvers = {
    Query: {
        atores: async (paremt: unknown, arg: unknown, context: unknown, info: unknown) => await query.selectAll("Ator", getFieldsFromInfo(info)),
        categoriasOscar: async (paremt: unknown, arg: unknown, context: unknown, info: unknown) => await query.selectAll("CategoriaOscar", getFieldsFromInfo(info)),
        elencos: async (paremt: unknown, arg: unknown, context: unknown, info: unknown) => await query.selectAll("Elenco", getFieldsFromInfo(info)),
        estilos: async (paremt: unknown, arg: unknown, context: unknown, info: unknown) => await query.selectAll("Estilo", getFieldsFromInfo(info)),
        faixaEtarias: async (paremt: unknown, arg: unknown, context: unknown, info: unknown) => await query.selectAll("FaixaEtaria", getFieldsFromInfo(info)),
        filmes: async (paremt: unknown, arg: unknown, context: unknown, info: unknown) => await query.selectAll("Filme", getFieldsFromInfo(info)),
        generos: async (paremt: unknown, arg: unknown, context: unknown, info: unknown) => await query.selectAll("Genero", getFieldsFromInfo(info)),
        oscars: async (paremt: unknown, arg: unknown, context: unknown, info: unknown) => await query.selectAll("Oscar", getFieldsFromInfo(info)),
        produtoras: async (paremt: unknown, arg: unknown, context: unknown, info: unknown) => await query.selectAll("Produtora", getFieldsFromInfo(info)),
        filmeListagem: async () => await query.query(sql.filmeListagem),
    },
    Mutation: {
        async criarAtor(_: unknown, { model }: { model: AtorModel }) {
            await query.create<AtorModel>("Ator", model)
            return true
        },
        async editarAtor(_: unknown, { model, whereId }: { model: AtorModel, whereId: number }) {
            await query.update<AtorModel>("Ator", model, { Id: whereId })
            return true
        },
        async excluirAtor(_: unknown, { whereId }: { whereId: number }) {
            await query.delete<AtorModel>("Ator", { Id: whereId })
            return true
        },

        async criarCategoriaOscar(_: unknown, { model }: { model: CategoriaOscarModel }) {
            await query.create<CategoriaOscarModel>("CategoriaOscar", model)
            return true
        },
        async editarCategoriaOscar(_: unknown, { model, whereId }: { model: CategoriaOscarModel, whereId: number }) {
            await query.update<CategoriaOscarModel>("CategoriaOscar", model, { Id: whereId })
            return true
        },
        async excluirCategoriaOscar(_: unknown, { whereId }: { whereId: number }) {
            await query.delete<CategoriaOscarModel>("CategoriaOscar", { Id: whereId })
            return true
        },

        async criarElenco(_: unknown, { model }: { model: ElencoModel }) {
            await query.create<ElencoModel>("Elenco", model)
            return true
        },
        async editarElenco(_: unknown, { model, whereId }: { model: ElencoModel, whereId: number }) {
            await query.update<ElencoModel>("Elenco", model, { Id: whereId })
            return true
        },
        async excluirElenco(_: unknown, { whereId }: { whereId: number }) {
            await query.delete<ElencoModel>("Elenco", { Id: whereId })
            return true
        },

        async criarEstilo(_: unknown, { model }: { model: EstiloModel }) {
            await query.create<EstiloModel>("Estilo", model)
            return true
        },
        async editarEstilo(_: unknown, { model, whereId }: { model: EstiloModel, whereId: number }) {
            await query.update<EstiloModel>("Estilo", model, { Id: whereId })
            return true
        },
        async excluirEstilo(_: unknown, { whereId }: { whereId: number }) {
            await query.delete<EstiloModel>("Estilo", { Id: whereId })
            return true
        },

        async criarFaixaEtaria(_: unknown, { model }: { model: FaixaEtariaModel }) {
            await query.create<FaixaEtariaModel>("FaixaEtaria", model)
            return true
        },
        async editarFaixaEtaria(_: unknown, { model, whereId }: { model: FaixaEtariaModel, whereId: number }) {
            await query.update<FaixaEtariaModel>("FaixaEtaria", model, { Id: whereId })
            return true
        },
        async excluirFaixaEtaria(_: unknown, { whereId }: { whereId: number }) {
            await query.delete<FaixaEtariaModel>("Estilo", { Id: whereId })
            return true
        },

        async editarFilme(_: unknown, { model, whereId }: { model: FilmeModel, whereId: number }) {
            await query.update<FilmeModel>("Filme", model, { Id: whereId })
            return true
        },
        async criarFilme(_: unknown, { model }: { model: FilmeModel }) {
            await query.create<FilmeModel>("Filme", model)
            return true
        },
        async excluirFilme(_: unknown, { whereId }: { whereId: number }) {
            await query.delete<FilmeModel>("Filme", { Id: whereId })
            return true
        },

        async criarGenero(_: unknown, { model }: { model: GeneroModel }) {
            await query.create<GeneroModel>("Genero", model)
            return true
        },
        async editarGenero(_: unknown, { model, whereId }: { model: GeneroModel, whereId: number }) {
            await query.update<GeneroModel>("Genero", model, { Id: whereId })
            return true
        },
        async excluirGenero(_: unknown, { whereId }: { whereId: number }) {
            await query.delete<GeneroModel>("Genero", { Id: whereId })
            return true
        },

        async criarOscar(_: unknown, { model }: { model: OscarModel }) {
            await query.create<OscarModel>("Genero", model)
            return true
        },
        async editarOscar(_: unknown, { model, whereId }: { model: OscarModel, whereId: number }) {
            await query.update<OscarModel>("Genero", model, { Id: whereId })
            return true
        },
        async excluirOscar(_: unknown, { whereId }: { whereId: number }) {
            await query.delete<OscarModel>("Oscar", { Id: whereId })
            return true
        },

        async criarProdutora(_: unknown, { model }: { model: ProdutoraModel }) {
            await query.create<ProdutoraModel>("Produtora", model)
            return true
        },
        async editarProdutora(_: unknown, { model, whereId }: { model: ProdutoraModel, whereId: number }) {
            await query.update<ProdutoraModel>("Produtora", model, { Id: whereId })
            return true
        },
        async excluirProdutora(_: unknown, { whereId }: { whereId: number }) {
            await query.delete<ProdutoraModel>("Produtora", { Id: whereId })
            return true
        }
    },
    FilmeListagem: {
        Id: (data: FilmeListagemModel) => data.Id,
        Nome: (data: FilmeListagemModel) => data.Nome,
        Dt_Lanc: (data: FilmeListagemModel) => data.Dt_Lanc,
        IMDB: (data: FilmeListagemModel) => data.IMDB.toFixed(2),
        Tempo_duracao: (data: FilmeListagemModel) => data.Tempo_duracao,
        FaixaEtaria_Descricao: (data: FilmeListagemModel) => data.FaixaEtaria_Descricao,
        Produtora_Nome: (data: FilmeListagemModel) => data.Produtora_Nome,
    },
    Ator: {
        Id: (data: AtorModel) => data.Id,
        Nome: (data: AtorModel) => data.Nome,
        Dt_Nasc: (data: AtorModel) => data.Dt_Nasc,
        Sexo: (data: AtorModel) => data.Sexo,
        Nacionalidade: (data: AtorModel) => data.Nacionalidade,
        Raca: (data: AtorModel) => data.Raca,
        Dt_Morte: (data: AtorModel) => data.Dt_Morte,
    },
    CategoriaOscar: {
        Id: (data: CategoriaOscarModel) => data.Id,
        Descricao: (data: CategoriaOscarModel) => data.Descricao,
        Tipo: (data: CategoriaOscarModel) => data.Tipo,
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
    FaixaEtaria: {
        Id: (data: FaixaEtariaModel) => data.Id,
        Idade: (data: FaixaEtariaModel) => data.Idade,
        Descricao: (data: FaixaEtariaModel) => data.Descricao,
    },
    Filme: {
        Id: (data: FilmeModel) => data.Id,
        Nome: (data: FilmeModel) => data.Nome,
        Dt_Lanc: (data: FilmeModel) => data.Dt_Lanc,
        IMDB: (data: FilmeModel) => Math.round(data.IMDB),
        Tempo_duracao: (data: FilmeModel) => data.Tempo_duracao,
        Sinopse: (data: FilmeModel) => data.Sinopse,
        fk_Produtora_Id: (data: FilmeModel) => data.fk_Produtora_Id,
        fk_FaixaEtaria_Id: (data: FilmeModel) => data.fk_FaixaEtaria_Id,
    },
    Genero: {
        Id: (data: GeneroModel) => data.Id,
        Nome: (data: GeneroModel) => data.Nome,
        Descricao: (data: GeneroModel) => data.Descricao,
    },
    Oscar: {
        Id: (data: OscarModel) => data.Id,
        fk_CategoriaOscar_Id: (data: OscarModel) => data.fk_CategoriaOscar_Id,
        fk_Ator_Id: (data: OscarModel) => data.fk_Ator_Id,
        DataPremiacao: (data: OscarModel) => data.DataPremiacao,
    },
    Produtora: {
        Id: (data: ProdutoraModel) => data.Id,
        Nome: (data: ProdutoraModel) => data.Nome,
        Ano_Fund: (data: ProdutoraModel) => data.Ano_Fund,
    },
};


export default resolvers
