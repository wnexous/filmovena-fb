"use client"
import EstiloModel from "@/models/Estilo.model";
import { gql, useQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import EstiloDialog from "./EstiloDialog";

const GET_DATA = gql`
  query {
    estilos {
        Id,
        fk_Filme_Id,
        fk_Genero_Id
    }
  }
`;

export default function EstiloForm() {

  const { loading, data, error, refetch } = useQuery<{ estilos: EstiloModel[] }>(GET_DATA);
  const [selected, setSelected] = useState<EstiloModel | null>(null)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Erro: {error.message}</div>

  return <div>
    <DataTable selectionMode={"single"} selection={selected} dataKey={"Id"} onRowUnselect={() => setSelected(null)} onSelectionChange={e => setSelected(e.value as EstiloModel)} value={data?.estilos} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
      <Column field="Id" header="Id" ></Column>
      <Column field="fk_Filme_Id" header="Id filme"></Column>
      <Column field="fk_Genero_Id" header="Id gênero" className="whitespace-nowrap"></Column>
    </DataTable>

    <EstiloDialog data={selected} onClose={() => setSelected(null)} onChange={refetch} />
  </div>
}