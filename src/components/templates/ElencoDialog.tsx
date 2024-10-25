import { DialogI } from "@/interfaces/DialogI";
import ElencoModel from "@/models/Elenco.model";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import DropdownTableOptions from "../molecules/DropdownTableOptions";
import DialogFooter from "../organisms/DialogFooter";
import InputBox from "../organisms/InputBox";

type Model = ElencoModel
const Model = ElencoModel


export default function ElencoDialog({ data: initialData, onClose, onChange, type }: DialogI<Model>) {

    const [form, setForm] = useState<Model>(new Model())

    useEffect(() => {
        if (initialData) setForm(initialData)
    }, [initialData])

    const onInputData = (key: string, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const state = !!initialData
    const footer = <DialogFooter
        inputModelName="ElencoInput"
        deleteResolverName="excluirElenco"
        createResolverName="criarElenco"
        editResolverName="editarElenco"
        form={form} onSend={onChange}
        oldForm={initialData as Model}
        type={type} />

    const header = "Editar elenco"

    return <Dialog onHide={onClose} visible={state} header={header} footer={footer} className="w-96">
        <div className="flex flex-col gap-7 w-full my-6">
            <InputBox value={form["Id"]} inputKey="Id" label="Insira o ID" onInput={onInputData} inputType="text" outputType="int" />
            <DropdownTableOptions table="atores" inputKey="fk_Ator_Id" column="Nome" defaultId={form["fk_Ator_Id"]} onInput={onInputData} placeholder="Ator" />
            <DropdownTableOptions table="filmes" inputKey="fk_Filme_Id" column="Nome" defaultId={form["fk_Filme_Id"]} onInput={onInputData} placeholder="Filme" />
            {/* <InputBox value={form["fk_Ator_Id"]} inputKey="fk_Ator_Id" label="Id do ator" onInput={onInputData} inputType="text" outputType="int" /> */}
            {/* <InputBox value={form["fk_Filme_Id"]} inputKey="fk_Filme_Id" label="Id do filme" onInput={onInputData} inputType="text" outputType="int" /> */}
        </div>
    </Dialog>
}