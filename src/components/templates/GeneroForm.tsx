"use client"
import GeneroModel from "@/models/Genero.model";
import { gql, useQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import GeneroDialog from "./GeneroDialog";

const GET_DATA = gql`
  query {
      generos {
        Id,
        Nome,
        Descricao
      }
  }
`;

export default function GeneroForm() {

    const { loading, data, error } = useQuery<{ generos: GeneroModel[] }>(GET_DATA);
    const [selected, setSelected] = useState<GeneroModel | null>(null)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Erro: {error.message}</div>

    return <div>
        <DataTable selectionMode={"single"} selection={selected} dataKey={"Id"} onRowUnselect={() => setSelected(null)} onSelectionChange={e => setSelected(e.value as GeneroModel)} value={data?.generos} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="Id" header="Id" ></Column>
            <Column field="Nome" header="Nome" ></Column>
            <Column field="Descricao" header="Descrição" className="whitespace-nowrap"></Column>
        </DataTable>

        <GeneroDialog data={selected} onClose={() => setSelected(null)} />

    </div>
}