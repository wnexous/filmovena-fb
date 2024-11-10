import { DialogI } from "@/interfaces/DialogI";
import ProdutoraModel from "@/models/Produtora.model";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import DialogFooter from "../organisms/DialogFooter";
import InputBox from "../organisms/InputBox";

type Model = ProdutoraModel
const Model = ProdutoraModel

export default function ProdutoraDialog({ data: initialData, onClose, onChange, type }: DialogI<Model>) {

    const [form, setForm] = useState<Model>(new Model())

    const state = !!initialData
    const footer = <DialogFooter
        inputModelName="ProdutoraInput"
        deleteResolverName="excluirProdutora"
        createResolverName="criarProdutora"
        editResolverName="editarProdutora"
        form={form} onSend={onChange}
        oldForm={initialData as Model}
        type={type} />

    useEffect(() => {
        if (initialData) setForm(initialData)
    }, [initialData])

    const onInputData = (key: string, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const header = "Editar produtora"

    return <Dialog onHide={onClose} visible={state} header={header} footer={footer} className="w-96">
        <div className="flex flex-col gap-7 w-full my-6">
            <InputBox value={form["Id"]} inputKey="Id" label="Insira o ID" onInput={onInputData} inputType="number" outputType="int" />
            <InputBox value={form["Nome"]} inputKey="Nome" label="Insira o nome" onInput={onInputData} inputType="text" outputType="string" />
            <InputBox value={form["Ano_Fund"]} inputKey="Ano_Fund" label="Insira o ano de fundação" onInput={onInputData} inputType="number" outputType="int" />
        </div>
    </Dialog>
}