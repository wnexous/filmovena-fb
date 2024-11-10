"use client"
import AtorModel from "@/models/Ator.model";
import { gql, useQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import AtorDialog from "./AtorDialog";
import TableButton from "../molecules/TableButton";
import { DialogHandlerT } from "@/interfaces/DialogI";
import Loading from "../molecules/Loading";

const GET_DATA = gql`
  query {
      atores {
        Id,
        Nome,
        Dt_Nasc,
        Sexo,
        Nacionalidade,
        Raca,
        Dt_Morte,
      }
  }
`;

const Model = AtorModel
type Model = AtorModel
const queryName = "atores"

export default function AtorForm() {

  const { loading, data, error, refetch } = useQuery<{ atores: Model[] }>(GET_DATA);
  const [selected, setSelected] = useState<Model | null>(null)
  const [modalType, setModalType] = useState<DialogHandlerT>()

  const openModal = (type: DialogHandlerT, value: Model) => {
    setModalType(type)
    setSelected(value)
  }
  const closeModal = () => setSelected(null)
  const reloadData = () => refetch()

  useEffect(() => {
    const haveItemOnList = data?.[queryName].some(i => i.Id == selected?.Id)
    setModalType(haveItemOnList ? "edit" : "create")
  }, [data, selected])

  if (loading) return <Loading />
  if (error) return <div>Erro: {error.message}</div>

  return <div>
    <DataTable footer={<TableButton onClick={() => openModal("create", new Model)}>Criar Novo</TableButton>} selectionMode={"single"} selection={selected} dataKey={"Id"} onRowUnselect={closeModal} onSelectionChange={e => openModal("edit", e.value as Model)} value={data?.atores} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
      <Column field="Id" header="Id" />
      <Column field="Nome" header="Nome" style={{ width: '14%' }} />
      <Column field="Dt_Nasc" header="Data de nascimento" style={{ width: '16%' }} className="whitespace-nowrap" />
      <Column field="Sexo" header="Sexo" />
      <Column field="Nacionalidade" header="Nacionalidade" style={{ width: '16%' }} />
      <Column field="Raca" header="Raça" style={{ width: '12%' }} />
      <Column field="Dt_Morte" header="Falecimento" className="whitespace-nowrap" />
    </DataTable>

    <AtorDialog type={modalType} data={selected} onClose={() => setSelected(null)} onChange={reloadData} />
  </div>
}