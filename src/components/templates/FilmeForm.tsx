"use client"
import FilmeModel from "@/models/Filme.model";
import { gql, useQuery } from "@apollo/client";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const GET_DATA = gql`
  query {
      filmes {
        Id,
        Nome,
        Dt_Lanc,
        IMDB,
        Tempo_duracao,
        Faixa_Etaria,
        Sinopse,
        fk_Produtora_Id
      }
  }
`;

export default function FilmeForm() {

    const [form, setForm] = useState<FilmeModel>(new FilmeModel())
    const { loading, data, error } = useQuery<{ filmes: FilmeModel[] }>(GET_DATA);
    const [selected, setSelected] = useState<FilmeModel | null>(null)
    console.log('selected', selected)

    if (loading) return <div>Loading...</div>

    console.log('error', error)
    console.log('data', data)

    const onInputData = (key: keyof FilmeModel, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const InputBox = ({ key, label }: { key: keyof typeof form, label: string }) => {
        return <FloatLabel key={key} className="w-full">
            <InputText className="w-full bg-transparent text-white" id="username" value={`${form[key] || ""}`} onChange={(e) => onInputData(key, e.target.value)} />
            <label htmlFor="username" className="text-neutral-400">{label}</label>
        </FloatLabel>
    }

    return <div>
        <DataTable selectionMode={"single"} selection={selected} dataKey={"Id"} onRowUnselect={e => setSelected(null)} onSelectionChange={e => setSelected(e.value as FilmeModel)} value={data?.filmes} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="Id" header="Id" ></Column>
            <Column field="Nome" header="Nome" style={{ width: '14%' }}></Column>
            <Column field="Dt_Lanc" header="Data de lançamento" style={{ width: '16%' }} className="whitespace-nowrap"></Column>
            <Column field="IMDB" header="IMDB" ></Column>
            <Column field="Tempo_duracao" header="Tempo de duração" style={{ width: '16%' }} ></Column>
            <Column field="Faixa_Etaria" header="Faixa etária" style={{ width: '12%' }}></Column>
            <Column field="Sinopse" header="Sinopse" style={{ width: '25%' }}></Column>
            <Column field="fk_Produtora_Id" header="Id produtora" className="whitespace-nowrap"></Column>
        </DataTable>
        <div className="flex flex-col gap-7 w-full my-4">
            {InputBox({ key: "Id", label: "Insira o ID" })}
            {InputBox({ key: "Nome", label: "Insira o nome" })}
            {InputBox({ key: "Dt_Lanc", label: "Data de lançamento" })}
            {InputBox({ key: "IMDB", label: "Insira a nota do IMDB" })}
            {InputBox({ key: "Tempo_duracao", label: "Insira o tempo de duração" })}
            {InputBox({ key: "Faixa_Etaria", label: "Insira a faixa etária" })}
            {InputBox({ key: "Sinopse", label: "Insira a sinópse" })}
            {InputBox({ key: "fk_Produtora_Id", label: "Insira o id da produtora" })}
        </div>

        <div className='flex flex-wrap gap-2 w-full whitespace-nowrap text-center'>
            <Button className="basis-[80px] flex-grow justify-center bg-green-600 border-green-600 text-white" >Insert</Button>
            <Button className="basis-[80px] flex-grow justify-center">Select *</Button>
            <Button className="basis-[160px] flex-grow justify-center">Select one record</Button>
            <Button className="basis-[80px] flex-grow justify-center bg-red-600 border-red-600 text-white" >Delete</Button>
            <Button className="basis-[80px] flex-grow justify-center bg-blue-600 border-blue-600 text-white">Update</Button>
        </div>
    </div>
}