import { DialogI } from "@/interfaces/DialogI";
import FaixaEtariaModel from "@/models/FaixaEtaria.model";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import DialogFooter from "../organisms/DialogFooter";
import InputBox from "../organisms/InputBox";

const Model = FaixaEtariaModel
type Model = FaixaEtariaModel
const title = "Faixa etária"

export default function FaixaEtariaDialog({ data: initialData, onClose, onChange, type }: DialogI<Model>) {

    const [form, setForm] = useState<Model>(new Model())

    const state = !!initialData
    const footer = <DialogFooter
        inputModelName="FaixaEtariaInput"
        deleteResolverName="excluirFaixaEtaria"
        createResolverName="criarFaixaEtaria"
        editResolverName="editarFaixaEtaria"
        form={form} onSend={onChange}
        oldForm={initialData as Model}
        type={type} />

    useEffect(() => {
        if (initialData) setForm(initialData)
    }, [initialData])

    const onInputData = (key: string, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const header = "Editar " + title

    return <Dialog onHide={onClose} visible={state} header={header} footer={footer} className="w-96">
        <div className="flex flex-col gap-7 w-full my-6">
            <InputBox value={form["Id"]} inputKey="Id" label="Insira o ID" onInput={onInputData} inputType="text" outputType="int" />
            <InputBox value={form["Idade"]} inputKey="Idade" label="Insira a Idade" onInput={onInputData} inputType="text" outputType="string" />
            <InputBox value={form["Descricao"]} inputKey="Descricao" label="Insira a Descricao" onInput={onInputData} inputType="text" outputType="string" />
        </div>
    </Dialog>
}