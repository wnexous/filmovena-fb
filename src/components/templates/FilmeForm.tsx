"use client"
import { DialogHandlerT } from "@/interfaces/DialogI";
import FilmeModel from "@/models/Filme.model";
import { gql, useQuery } from "@apollo/client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import TableButton from "../molecules/TableButton";
import FilmeDialog from "./FilmeDialog";
import Loading from "../molecules/Loading";

const GET_DATA = gql`
  query {
      filmes {
        Id,
        Nome,
        Dt_Lanc,
        IMDB,
        Tempo_duracao,
        Sinopse,
        fk_Produtora_Id,
        fk_FaixaEtaria_Id
      }
  }
`;

const Model = FilmeModel
type Model = FilmeModel
const queryName = "filmes"

export default function FilmeForm() {
  const { loading, data, error, refetch } = useQuery<{ filmes: Model[] }>(GET_DATA);
  const [selected, setSelected] = useState<Model | null>(null)
  const [modalType, setModalType] = useState<DialogHandlerT>()

  const openModal = (type: DialogHandlerT, value: Model) => {
    setModalType(type)
    setSelected(value)
  }
  const closeModal = () => setSelected(null)
  const reloadData = () => refetch().finally(() => setModalType("edit"))

  useEffect(() => {
    const haveItemOnList = data?.[queryName].some(i => i.Id == selected?.Id)
    setModalType(haveItemOnList ? "edit" : "create")
  }, [data, selected])

  if (loading) return <Loading />
  if (error) return <div>Erro: {error.message}</div>

  return <div>
    <DataTable footer={<TableButton onClick={() => openModal("create", new Model)}>Criar Novo</TableButton>} selectionMode={"single"} selection={selected} dataKey={"Id"} onRowUnselect={closeModal} onSelectionChange={e => openModal("edit", e.value as FilmeModel)} value={data?.filmes} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
      <Column field="Id" header="Id" ></Column>
      <Column field="Nome" header="Nome" style={{ width: '14%' }}></Column>
      <Column field="Dt_Lanc" header="Data de lançamento" style={{ width: '16%' }} className="whitespace-nowrap"></Column>
      <Column field="IMDB" header="IMDB" ></Column>
      <Column field="Tempo_duracao" header="Tempo de duração" style={{ width: '16%' }} ></Column>
      <Column field="Faixa_Etaria" header="Faixa etária" style={{ width: '12%' }}></Column>
      <Column field="Sinopse" header="Sinopse" style={{ width: '25%' }}></Column>
      <Column field="fk_Produtora_Id" header="Id produtora" className="whitespace-nowrap"></Column>
    </DataTable>

    <FilmeDialog type={modalType} data={selected} onClose={() => setSelected(null)} onChange={reloadData} />

  </div>
}