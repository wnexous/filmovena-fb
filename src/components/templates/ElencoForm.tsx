"use client"
import ElencoModel from "@/models/Elenco.model";
import { gql, useQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import ElencoDialog from "./ElencoDialog";

const GET_DATA = gql`
  query {
    elencos {
        Id,
        fk_Ator_Id,
        fk_Filme_Id
    }
  }
`;

export default function ElencoForm() {

    const { loading, data, error } = useQuery<{ elencos: ElencoModel[] }>(GET_DATA);
    const [selected, setSelected] = useState<ElencoModel | null>(null)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Erro: {error.message}</div>

    return <div>
        <DataTable selectionMode={"single"} selection={selected} dataKey={"Id"} onRowUnselect={() => setSelected(null)} onSelectionChange={e => setSelected(e.value as ElencoModel)} value={data?.elencos} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="Id" header="Id" ></Column>
            <Column field="fk_Ator_Id" header="Id ator" ></Column>
            <Column field="fk_Filme_Id" header="Id filme" className="whitespace-nowrap"></Column>
        </DataTable>
        <ElencoDialog data={selected} onClose={() => setSelected(null)} />

    </div>
}