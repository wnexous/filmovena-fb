"use client"
import AtorModel from "@/models/Ator.model";
import { gql, useQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import AtorDialog from "./AtorDialog";

const GET_DATA = gql`
  query {
      atores {
        Id,
        Nome,
        Dt_Nasc,
        Sexo,
        Nacionalidade,
        Raca,
        Qntd_Oscar,
        Dt_Morte
      }
  }
`;

export default function AtorForm() {

  const { loading, data, error, refetch } = useQuery<{ atores: AtorModel[] }>(GET_DATA);
  const [selected, setSelected] = useState<AtorModel | null>(null)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Erro: {error.message}</div>

  return <div>
    <DataTable selectionMode={"single"} selection={selected} dataKey={"Id"} onRowUnselect={() => setSelected(null)} onSelectionChange={e => setSelected(e.value as AtorModel)} value={data?.atores} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
      <Column field="Id" header="Id" ></Column>
      <Column field="Nome" header="Nome" style={{ width: '14%' }}></Column>
      <Column field="Dt_Nasc" header="Data de nascimento" style={{ width: '16%' }} className="whitespace-nowrap"></Column>
      <Column field="Sexo" header="Sexo" ></Column>
      <Column field="Nacionalidade" header="Nacionalidade" style={{ width: '16%' }} ></Column>
      <Column field="Raca" header="Raça" style={{ width: '12%' }}></Column>
      <Column field="Qntd_Oscar" header="Qntd Oscar" style={{ width: '25%' }}></Column>
      <Column field="Dt_Morte" header="Falecimento" className="whitespace-nowrap"></Column>
    </DataTable>

    <AtorDialog data={selected} onClose={() => setSelected(null)} onChange={refetch} />
  </div>
}