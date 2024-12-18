import { DialogI } from "@/interfaces/DialogI";
import EstiloModel from "@/models/Estilo.model";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import DropdownTableOptions from "../molecules/DropdownTableOptions";
import DialogFooter from "../organisms/DialogFooter";
import InputBox from "../organisms/InputBox";

type Model = EstiloModel
const Model = EstiloModel

export default function EstiloDialog({ data: initialData, onClose, onChange, type }: DialogI<Model>) {

    const [form, setForm] = useState<Model>(new Model())

    useEffect(() => {
        if (initialData) setForm(initialData)
    }, [initialData])

    const onInputData = (key: string, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const state = !!initialData
    const footer = <DialogFooter
        inputModelName="EstiloInput"
        deleteResolverName="excluirEstilo"
        createResolverName="criarEstilo"
        editResolverName="editarEstilo"
        form={form} onSend={onChange}
        oldForm={initialData as Model}
        type={type} />

    const header = "Editar estilo"

    return <Dialog onHide={onClose} visible={state} header={header} footer={footer} className="w-96">
        <div className="flex flex-col gap-7 w-full my-6">
            <InputBox value={form["Id"]} inputKey="Id" label="Insira o ID" onInput={onInputData} inputType="text" outputType="int" />
            <DropdownTableOptions table="filmes" inputKey="fk_Filme_Id" column="Nome" defaultId={form["fk_Filme_Id"]} onInput={onInputData} placeholder="Filme" />
            <DropdownTableOptions table="generos" inputKey="fk_Genero_Id" column="Nome" defaultId={form["fk_Genero_Id"]} onInput={onInputData} placeholder="Gênero" />
        </div>
    </Dialog>
}