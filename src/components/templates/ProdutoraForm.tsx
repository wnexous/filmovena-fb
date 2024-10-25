"use client"
import ProdutoraModel from "@/models/Produtora.model";
import { gql, useQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import ProdutoraDialog from "./ProdutoraDialog";
import { DialogHandlerT } from "@/interfaces/DialogI";
import TableButton from "../molecules/TableButton";

const GET_DATA = gql`
  query {
      produtoras {
        Id,
        Nome,
        Ano_Fund
      }
  }
`;

const Model = ProdutoraModel
type Model = ProdutoraModel
const queryName = "produtoras"

export default function ProdutoraForm() {

  const { loading, data, error, refetch } = useQuery<{ produtoras: Model[] }>(GET_DATA);
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
    <DataTable footer={<TableButton onClick={() => openModal("create", new Model)}>Criar Novo</TableButton>} selectionMode={"single"} selection={selected} dataKey={"Id"} onRowUnselect={closeModal} onSelectionChange={e => openModal("edit", e.value as Model)} value={data?.produtoras} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
      <Column field="Id" header="Id" ></Column>
      <Column field="Nome" header="Nome"></Column>
      <Column field="Ano_Fund" header="Ano de fundação" className="whitespace-nowrap"></Column>
    </DataTable>

    <ProdutoraDialog type={modalType} data={selected} onClose={() => setSelected(null)} onChange={reloadData} />
  </div>
}