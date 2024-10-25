"use client"
import { DialogHandlerT } from "@/interfaces/DialogI";
import CategoriaOscarModel from "@/models/CategoriaOscar.model";
import { gql, useQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import TableButton from "../molecules/TableButton";
import CategoriaOscarDialog from "./CategoriaOscarDialog";

const Model = CategoriaOscarModel
type Model = CategoriaOscarModel
const queryName = "categoriasOscar"

const GET_DATA = gql`
  query {
      ${queryName} {
        Id,
        Descricao,
        Tipo,
      }
  }
`;

export default function CategoriaOscarForm() {

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
      <Column field="Descricao" header="Descricao"  />
      <Column field="Tipo" header="Tipo"  className="whitespace-nowrap" />
    </DataTable>

    <CategoriaOscarDialog type={modalType} data={selected} onClose={() => setSelected(null)} onChange={reloadData} />
  </div>
}