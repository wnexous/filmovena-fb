"use client"
import AtorModel from "@/models/Ator.model";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const GET_DATA = gql`
  query {
      atores {
        Id,
        Nome,
        Dt_Nasc,
        Sexo,
        Nacionalidade,
        Raca,
        Qntd_Oscar,
        Dt_Morte
      }
  }
`;

export default function AtorForm() {

    const [form, setForm] = useState<AtorModel>(new AtorModel())
    const { loading, data, error } = useQuery<{ atores: AtorModel[] }>(GET_DATA);
    const [selected, setSelected] = useState<AtorModel | null>(null)
    if (loading) return <div>Loading...</div>

    const onInputData = (key: keyof AtorModel, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const InputBox = ({ key, label }: { key: keyof typeof form, label: string }) => {
        return <FloatLabel key={key} className="w-full">
            <InputText className="w-full bg-transparent text-white" id="username" value={`${form[key] || ""}`} onChange={(e) => onInputData(key, e.target.value)} />
            <label htmlFor="username" className="text-neutral-400">{label}</label>
        </FloatLabel>
    }
    return <div>
        <DataTable selectionMode={"single"} selection={selected} dataKey={"Id"} onRowUnselect={e => setSelected(null)} onSelectionChange={e => setSelected(e.value as AtorModel)} value={data?.atores} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="Id" header="Id" ></Column>
            <Column field="Nome" header="Nome" style={{ width: '14%' }}></Column>
            <Column field="Dt_Nasc" header="Data de nascimento" style={{ width: '16%' }} className="whitespace-nowrap"></Column>
            <Column field="Sexo" header="Sexo" ></Column>
            <Column field="Nacionalidade" header="Nacionalidade" style={{ width: '16%' }} ></Column>
            <Column field="Raca" header="Raça" style={{ width: '12%' }}></Column>
            <Column field="Qntd_Oscar" header="Qntd Oscar" style={{ width: '25%' }}></Column>
            <Column field="Dt_Morte" header="Falecimento" className="whitespace-nowrap"></Column>
        </DataTable>
        <div className="flex flex-col gap-7 w-full my-4">
            {InputBox({ key: "Id", label: "Insira o ID" })}
            {InputBox({ key: "Nome", label: "Insira o nome" })}
            {InputBox({ key: "Dt_Nasc", label: "Insira a data de nascimento" })}
            {InputBox({ key: "Sexo", label: "Insira o sexo" })}
            {InputBox({ key: "Nacionalidade", label: "Insira a nacionalidade" })}
            {InputBox({ key: "Raca", label: "Insira a raça" })}
            {InputBox({ key: "Qntd_Oscar", label: "Insira a quantidade de oscar" })}
            {InputBox({ key: "Dt_Morte", label: "Insira a data de falecimento" })}
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