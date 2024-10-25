"use client"
import OscarModel from "@/models/Oscar.model";
import { gql, useQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import OscarDialog from "./OscarDialog";
import { DialogHandlerT } from "@/interfaces/DialogI";
import TableButton from "../molecules/TableButton";

const Model = OscarModel
type Model = OscarModel
const queryName = "oscars"

const GET_DATA = gql`
  query {
      ${queryName} {
        Id,
        fk_CategoriaOscar_Id,
        fk_Ator_Id,
        DataPremiacao,
      }
  }
`;

export default function OscarForm() {

  const { loading, data, error, refetch } = useQuery<{ [queryName]: Model[] }>(GET_DATA);
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
    <DataTable
      footer={<TableButton onClick={() => openModal("create", new Model)}>Criar Novo</TableButton>}
      selectionMode={"single"}
      selection={selected}
      dataKey={"Id"}
      onRowUnselect={closeModal}
      onSelectionChange={e => openModal("edit", e.value as Model)}
      value={data?.[queryName]} paginator rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      tableStyle={{ minWidth: '50rem' }}>
      <Column field="Id" header="Id" />
      <Column field="fk_CategoriaOscar_Id" header="Id Categoria" style={{ width: '16%' }} className="whitespace-nowrap" />
      <Column field="fk_Ator_Id" header="ID Ator" style={{ width: '16%' }} className="whitespace-nowrap" />
      <Column field="DataPremiacao" header="Data Premiacao" />
    </DataTable>

    <OscarDialog type={modalType} data={selected} onClose={() => setSelected(null)} onChange={reloadData} />
  </div>
}