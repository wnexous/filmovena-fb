"use client"
import GeneroModel from "@/models/Genero.model";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_DATA = gql`
  query {
      teste
  }
`;

export default function GeneroForm() {

    const [form, setForm] = useState<GeneroModel>(new GeneroModel())
    const { loading } = useQuery(GET_DATA);

    if (loading) return <div>Loading...</div>

    const onInputData = (key: keyof GeneroModel, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const InputBox = ({ key, label }: { key: keyof typeof form, label: string }) => {
        return <FloatLabel key={key} className="w-full">
            <InputText className="w-full bg-transparent text-white" id="username" value={`${form[key] || ""}`} onChange={(e) => onInputData(key, e.target.value)} />
            <label htmlFor="username" className="text-neutral-400">{label}</label>
        </FloatLabel>
    }

    return <div className="flex flex-col gap-7 w-full my-4">
        {InputBox({ key: "Id", label: "Insira o ID" })}
        {InputBox({ key: "Nome", label: "Insira o nome" })}
        {InputBox({ key: "Descricao", label: "Insira a descrição" })}
    </div>
}