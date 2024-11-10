"use client"
import FaixaEtariaModel from "@/models/FaixaEtaria.model";
import { gql, useQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import FaixaEtariaDialog from "./FaixaEtariaDialog";
import { DialogHandlerT } from "@/interfaces/DialogI";
import TableButton from "../molecules/TableButton";
import Loading from "../molecules/Loading";

const Model = FaixaEtariaModel
type Model = FaixaEtariaModel
const queryName = "faixaEtarias"

const GET_DATA = gql`
  query {
      ${queryName} {
        Id,
        Idade,
        Descricao,
      }
  }
`;

export default function FaixaEtariaForm() {

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
  }, [data, selected])

  if (loading) return <Loading />
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
      <Column field="Idade" header="Idade" style={{ width: '16%' }} className="whitespace-nowrap" />
      <Column field="Descricao" header="Descricao" />
    </DataTable>

    <FaixaEtariaDialog type={modalType} data={selected} onClose={() => setSelected(null)} onChange={reloadData} />
  </div>
}