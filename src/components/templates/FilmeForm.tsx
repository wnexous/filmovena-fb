"use client"
import FilmeModel from "@/models/Filme.model";
import { gql, useQuery } from "@apollo/client";
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
    const { loading, data, error } = useQuery<FilmeModel>(GET_DATA);
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

    return <div className="flex flex-col gap-7 w-full my-4">
        {InputBox({ key: "Id", label: "Insira o ID" })}
        {InputBox({ key: "Nome", label: "Insira o nome" })}
        {InputBox({ key: "Dt_Lanc", label: "Data de lançamento" })}
        {InputBox({ key: "IMDB", label: "Insira a nota do IMDB" })}
        {InputBox({ key: "Tempo_duracao", label: "Insira o tempo de duração" })}
        {InputBox({ key: "Faixa_Etaria", label: "Insira a faixa etária" })}
        {InputBox({ key: "Sinopse", label: "Insira a sinópse" })}
        {InputBox({ key: "fk_Produtora_Id", label: "Insira o id da produtora" })}
    </div>
}