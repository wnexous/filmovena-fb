import { DialogI } from "@/interfaces/DialogI";
import FilmeModel from "@/models/Filme.model";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import DropdownTableOptions from "../molecules/DropdownTableOptions";
import DialogFooter from "../organisms/DialogFooter";
import InputBox from "../organisms/InputBox";

type Model = FilmeModel
const Model = FilmeModel

export default function FilmeDialog({ data: initialData, onClose, onChange, type }: DialogI<Model>) {

    const [form, setForm] = useState<Model>(new Model())

    const state = !!initialData
    const footer = <DialogFooter
        inputModelName="FilmeInput"
        deleteResolverName="excluirFilme"
        createResolverName="criarFilme"
        editResolverName="editarFilme"
        form={form} onSend={onChange}
        oldForm={initialData as Model}
        type={type} />

    useEffect(() => {
        if (initialData) setForm(initialData)
    }, [initialData])

    const onInputData = (key: string, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const header = "Editar filme"

    return <Dialog onHide={onClose} visible={state} header={header} footer={footer} className="w-96">
        <div className="flex flex-col gap-7 w-full my-6">
            <InputBox value={form["Id"]} inputKey="Id" label="Insira o ID" onInput={onInputData} inputType="text" outputType="int" />
            <InputBox value={form["Nome"]} inputKey="Nome" label="Insira o nome" onInput={onInputData} inputType="text" outputType="string" />
            <InputBox value={form["Dt_Lanc"]} inputKey="Dt_Lanc" label="Data de lançamento" onInput={onInputData} inputType="date" outputType="date" />
            <InputBox value={form["IMDB"]} inputKey="IMDB" label="Insira a nota do IMDB" onInput={onInputData} inputType="number" outputType="float" />
            <InputBox value={form["Tempo_duracao"]} inputKey="Tempo_duracao" label="Insira o tempo de duração" onInput={onInputData} inputType="time" outputType="string" />
            <InputBox value={form["Sinopse"]} inputKey="Sinopse" label="Insira a sinópse" onInput={onInputData} inputType="text" outputType="string" fieldType="text-area" />
            <DropdownTableOptions table="produtoras" inputKey="fk_Produtora_Id" column="Nome" defaultId={form["fk_Produtora_Id"]} onInput={onInputData} placeholder="Produtoras" />
            <DropdownTableOptions table="faixaEtarias" inputKey="fk_FaixaEtaria_Id" column="Idade" defaultId={form["fk_FaixaEtaria_Id"]} onInput={onInputData} placeholder="Faixa Etária" />
        </div>
    </Dialog>
}