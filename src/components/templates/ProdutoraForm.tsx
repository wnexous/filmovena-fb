"use client"
import ProdutoraModel from "@/models/Produtora.model";
import { gql, useQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import ProdutoraDialog from "./ProdutoraDialog";

const GET_DATA = gql`
  query {
      produtoras {
        Id,
        Nome,
        Ano_Fund
      }
  }
`;

export default function ProdutoraForm() {

    const { loading, data, error } = useQuery<{ produtoras: ProdutoraModel[] }>(GET_DATA);
    const [selected, setSelected] = useState<ProdutoraModel | null>(null)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Erro: {error.message}</div>

    return <div>
        <DataTable selectionMode={"single"} selection={selected} dataKey={"Id"} onRowUnselect={() => setSelected(null)} onSelectionChange={e => setSelected(e.value as ProdutoraModel)} value={data?.produtoras} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="Id" header="Id" ></Column>
            <Column field="Nome" header="Nome"></Column>
            <Column field="Ano_Fund" header="Ano de fundação" className="whitespace-nowrap"></Column>
        </DataTable>

        <ProdutoraDialog data={selected} onClose={() => setSelected(null)} />

    </div>
}