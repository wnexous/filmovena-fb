"use client"
import { DialogHandlerT } from "@/interfaces/DialogI";
import EstiloModel from "@/models/Estilo.model";
import { gql, useQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import TableButton from "../molecules/TableButton";
import EstiloDialog from "./EstiloDialog";
import Loading from "../molecules/Loading";

const GET_DATA = gql`
  query {
    estilos {
        Id,
        fk_Filme_Id,
        fk_Genero_Id
    }
  }
`;


const queryName = "estilos"
const Model = EstiloModel
type Model = EstiloModel

export default function EstiloForm() {

  const { loading, data, error, refetch } = useQuery<{ estilos: Model[] }>(GET_DATA);
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
    console.log('haveItemOnList', haveItemOnList)
    setModalType(haveItemOnList ? "edit" : "create")
  }, [data, selected])

  if (loading) return <Loading />
  if (error) return <div>Erro: {error.message}</div>

  return <div>
    <DataTable footer={<TableButton onClick={() => openModal("create", new Model)}>Criar Novo</TableButton>} selectionMode={"single"} selection={selected} dataKey={"Id"} onRowUnselect={closeModal} onSelectionChange={e => openModal("edit", e.value as Model)} value={data?.estilos} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
      <Column field="Id" header="Id" ></Column>
      <Column field="fk_Filme_Id" header="Id filme"></Column>
      <Column field="fk_Genero_Id" header="Id gênero" className="whitespace-nowrap"></Column>
    </DataTable>

    <EstiloDialog type={modalType} data={selected} onClose={() => setSelected(null)} onChange={reloadData} />
  </div>
}