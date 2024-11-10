"use client"
import FilmeListagemModel from "@/models/FilmeListagem.model";
import { gql, useQuery } from "@apollo/client";
import Loading from "../molecules/Loading";
import FilmeListagemItem from "./FilmeListagemItem";

const GET_DATA = gql`
  query {
      filmeListagem {
        Id,
        Nome,
        Dt_Lanc,
        IMDB,
        Tempo_duracao,
        FaixaEtaria_Descricao,
        Produtora_Nome,
      }
  }
`;

const Model = FilmeListagemModel
type Model = FilmeListagemModel

export default function FilmeListagemTemplate() {
  const { loading, data, error } = useQuery<{ filmeListagem: Model[] }>(GET_DATA);

  if (loading) return <Loading />
  if (error) return <div>Erro: {error.message}</div>

  return <div className="flex gap-4 flex-wrap my-auto py-8">
    {data?.filmeListagem.map((fl, i) => <FilmeListagemItem {...fl} key={i} />)}
  </div>
}