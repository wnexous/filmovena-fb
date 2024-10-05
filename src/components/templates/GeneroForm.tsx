"use client"
import GeneroModel from "@/models/Genero.model";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const GET_DATA = gql`
  query {
      generos {
        Id,
        Nome,
        Descricao
      }
  }
`;

export default function GeneroForm() {

    const [form, setForm] = useState<GeneroModel>(new GeneroModel())
    const { loading, data, error } = useQuery<{ generos: GeneroModel[] }>(GET_DATA);
    const [selected, setSelected] = useState<GeneroModel | null>(null)

    if (loading) return <div>Loading...</div>

    const onInputData = (key: keyof GeneroModel, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const InputBox = ({ key, label }: { key: keyof typeof form, label: string }) => {
        return <FloatLabel key={key} className="w-full">
            <InputText className="w-full bg-transparent text-white" id="username" value={`${form[key] || ""}`} onChange={(e) => onInputData(key, e.target.value)} />
            <label htmlFor="username" className="text-neutral-400">{label}</label>
        </FloatLabel>
    }

    return <div>
        <DataTable selectionMode={"single"} selection={selected} dataKey={"Id"} onRowUnselect={e => setSelected(null)} onSelectionChange={e => setSelected(e.value as GeneroModel)} value={data?.generos} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="Id" header="Id" ></Column>
            <Column field="Nome" header="Nome" ></Column>
            <Column field="Descricao" header="Descrição" className="whitespace-nowrap"></Column>
        </DataTable>
        <div className="flex flex-col gap-7 w-full my-4">
            {InputBox({ key: "Id", label: "Insira o ID" })}
            {InputBox({ key: "Nome", label: "Insira o nome" })}
            {InputBox({ key: "Descricao", label: "Insira a descrição" })}
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