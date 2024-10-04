"use client"
import FormModel from "@/models/Form.model";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";


export default function PageForm() {

    const [data, setData] = useState<FormModel>(new FormModel())
    const onInputData = (key: keyof FormModel, data: unknown) => setData(d => ({ ...d, [key]: data }))

    const InputBox = ({ key, label }: { key: keyof typeof data, label: string }) => {
        return <FloatLabel key={key} className="w-full">
            <InputText className="w-full bg-transparent text-white" id="username" value={data[key] as string} onChange={(e) => onInputData(key, e.target.value)} />
            <label htmlFor="username" className="text-neutral-400">{label}</label>
        </FloatLabel>
    }

    return <div className="flex flex-col gap-7 w-full">
        {InputBox({ key: "id", label: "Insira o ID" })}
        {InputBox({ key: "nome", label: "Insira o nome" })}
        {InputBox({ key: "celular", label: "Insira o celular" })}
        {InputBox({ key: "login", label: "Insira o login" })}
        {InputBox({ key: "senha", label: "Insira a senha" })}
    </div>
}