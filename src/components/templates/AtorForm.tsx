"use client"
import AtorModel from "@/models/Ator.model";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_DATA = gql`
  query {
      teste
  }
`;

export default function AtorForm() {

    const [form, setForm] = useState<AtorModel>(new AtorModel())
    const { loading } = useQuery(GET_DATA);

    if (loading) return <div>Loading...</div>

    const onInputData = (key: keyof AtorModel, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const InputBox = ({ key, label }: { key: keyof typeof form, label: string }) => {
        return <FloatLabel key={key} className="w-full">
            <InputText className="w-full bg-transparent text-white" id="username" value={`${form[key] || ""}`} onChange={(e) => onInputData(key, e.target.value)} />
            <label htmlFor="username" className="text-neutral-400">{label}</label>
        </FloatLabel>
    }

    return <div className="flex flex-col gap-7 w-full my-4">
        {InputBox({ key: "Id", label: "Insira o ID" })}
        {InputBox({ key: "Nome", label: "Insira o nome" })}
        {InputBox({ key: "Dt_Nasc", label: "Insira a data de nascimento" })}
        {InputBox({ key: "Sexo", label: "Insira o sexo" })}
        {InputBox({ key: "Nacionalidade", label: "Insira a nacionalidade" })}
        {InputBox({ key: "Raca", label: "Insira a raça" })}
        {InputBox({ key: "Qntd_Oscar", label: "Insira a quantidade de oscar" })}
        {InputBox({ key: "Dt_Morte", label: "Insira a data de falecimento" })}
    </div>
}