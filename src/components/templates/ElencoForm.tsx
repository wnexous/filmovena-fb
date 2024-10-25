"use client"
import ElencoModel from "@/models/Elenco.model";
import { gql, useQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import ElencoDialog from "./ElencoDialog";
import { DialogHandlerT } from "@/interfaces/DialogI";
import TableButton from "../molecules/TableButton";

const Model = ElencoModel
type Model = ElencoModel
const queryName = "elencos"

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

  const { loading, data, error, refetch } = useQuery<{ elencos: Model[] }>(GET_DATA);
  const [selected, setSelected] = useState<Model | null>(null)
  const [modalType, setModalType] = useState<DialogHandlerT>()

  const openModal = (type: DialogHandlerT, value: Model) => {
    setModalType(type)
    setSelected(value)
  }
  const closeModal = () => setSelected(null)
  const reloadData = () => refetch().then(() => setModalType("edit"))

  useEffect(() => {
    const haveItemOnList = data?.[queryName].some(i => i.Id == selected?.Id)
    setModalType(haveItemOnList ? "edit" : "create")
  }, [data])
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Erro: {error.message}</div>

  return <div>
    <DataTable footer={<TableButton onClick={() => openModal("create", new Model)}>Criar Novo</TableButton>} selectionMode={"single"} selection={selected} dataKey={"Id"} onRowUnselect={closeModal} onSelectionChange={e => setSelected(e.value as Model)} value={data?.[queryName]} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
      <Column field="Id" header="Id" ></Column>
      <Column field="fk_Ator_Id" header="Id ator" ></Column>
      <Column field="fk_Filme_Id" header="Id filme" className="whitespace-nowrap"></Column>
    </DataTable>
    <ElencoDialog type={modalType} data={selected} onClose={() => setSelected(null)} onChange={reloadData} />

  </div>
}