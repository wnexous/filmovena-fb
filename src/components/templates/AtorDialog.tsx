import { DialogI } from "@/interfaces/DialogI";
import AtorModel from "@/models/Ator.model";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import DialogFooter from "../organisms/DialogFooter";
import InputBox from "../organisms/InputBox";

type Model = AtorModel
const Model = AtorModel

export default function AtorDialog({ data: initialData, onClose, onChange, type }: DialogI<Model>) {

    const [form, setForm] = useState<Model>(new Model())
    const state = !!initialData

    useEffect(() => {
        if (initialData) setForm(initialData)
    }, [initialData])

    const onInputData = (key: string, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const footer = <DialogFooter
        inputModelName="AtorInput"
        deleteResolverName="excluirAtor"
        createResolverName="criarAtor"
        editResolverName="editarAtor"
        form={form} onSend={onChange}
        oldForm={initialData as Model}
        type={type} />

    const header = "Editar ator"

    return <Dialog onHide={onClose} visible={state} header={header} footer={footer} className="w-96">
        <div className="flex flex-col gap-7 w-full my-6">
            <InputBox value={form["Id"]} inputKey="Id" label="Insira o ID" onInput={onInputData} inputType="text" outputType="int" />
            <InputBox value={form["Nome"]} inputKey="Nome" label="Insira o nome" onInput={onInputData} inputType="text" outputType="string" />
            <InputBox value={form["Dt_Nasc"]} inputKey="Dt_Nasc" label="Insira a data de nascimento" onInput={onInputData} inputType="date" outputType="date" />
            <InputBox value={form["Sexo"]} inputKey="Sexo" label="Insira o sexo" onInput={onInputData} inputType="text" outputType="string" />
            <InputBox value={form["Nacionalidade"]} inputKey="Nacionalidade" label="Insira a nacionalidade" onInput={onInputData} inputType="text" outputType="string" />
            <InputBox value={form["Raca"]} inputKey="Raca" label="Insira a raça" onInput={onInputData} inputType="text" outputType="string" />
            <InputBox value={form["Dt_Morte"]} inputKey="Dt_Morte" label="Insira a data de falecimento" onInput={onInputData} inputType="date" outputType="date" />
        </div>

    </Dialog>
}