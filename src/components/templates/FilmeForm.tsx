"use client"
import FilmeModel from "@/models/Filme.model";
import { gql, useQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import FilmeDialog from "./FilmeDialog";

const GET_DATA = gql`
  query {
      filmes {
        Id,
        Nome,
        Dt_Lanc,
        IMDB,
        Tempo_duracao,
        Faixa_Etaria,
        Sinopse,
        fk_Produtora_Id
      }
  }
`;

export default function FilmeForm() {

  const { loading, data, error, refetch } = useQuery<{ filmes: FilmeModel[] }>(GET_DATA);
  const [selected, setSelected] = useState<FilmeModel | null>(null)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Erro: {error.message}</div>

  return <div>
    <DataTable selectionMode={"single"} selection={selected} dataKey={"Id"} onRowUnselect={() => setSelected(null)} onSelectionChange={e => setSelected(e.value as FilmeModel)} value={data?.filmes} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
      <Column field="Id" header="Id" ></Column>
      <Column field="Nome" header="Nome" style={{ width: '14%' }}></Column>
      <Column field="Dt_Lanc" header="Data de lançamento" style={{ width: '16%' }} className="whitespace-nowrap"></Column>
      <Column field="IMDB" header="IMDB" ></Column>
      <Column field="Tempo_duracao" header="Tempo de duração" style={{ width: '16%' }} ></Column>
      <Column field="Faixa_Etaria" header="Faixa etária" style={{ width: '12%' }}></Column>
      <Column field="Sinopse" header="Sinopse" style={{ width: '25%' }}></Column>
      <Column field="fk_Produtora_Id" header="Id produtora" className="whitespace-nowrap"></Column>
    </DataTable>

    <FilmeDialog data={selected} onClose={() => setSelected(null)} onChange={data => {
      setSelected(data)
      refetch()
    }} />

  </div>
}