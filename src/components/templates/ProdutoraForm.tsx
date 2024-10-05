"use client"
import ProdutoraModel from "@/models/Produtora.model";
import { gql, useQuery } from "@apollo/client";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const GET_DATA = gql`
  query {
      teste
  }
`;

export default function ProdutoraForm() {

    const [form, setForm] = useState<ProdutoraModel>(new ProdutoraModel())
    const { loading } = useQuery(GET_DATA);

    if (loading) return <div>Loading...</div>

    const onInputData = (key: keyof ProdutoraModel, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const InputBox = ({ key, label }: { key: keyof typeof form, label: string }) => {
        return <FloatLabel key={key} className="w-full">
            <InputText className="w-full bg-transparent text-white" id="username" value={`${form[key] || ""}`} onChange={(e) => onInputData(key, e.target.value)} />
            <label htmlFor="username" className="text-neutral-400">{label}</label>
        </FloatLabel>
    }

    return <div className="flex flex-col gap-7 w-full my-4">
        {InputBox({ key: "Id", label: "Insira o ID" })}
        {InputBox({ key: "Nome", label: "Insira o nome" })}
        {InputBox({ key: "Ano_Fund", label: "Insira o ano de fundação" })}
    </div>
}