import { DialogI } from "@/interfaces/DialogI";
import OscarModel from "@/models/Oscar.model";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import DropdownTableOptions from "../molecules/DropdownTableOptions";
import DialogFooter from "../organisms/DialogFooter";
import InputBox from "../organisms/InputBox";

const Model = OscarModel
type Model = OscarModel
const title = "Oscar"


export default function OscarDialog({ data: initialData, onClose, onChange, type }: DialogI<Model>) {

    const [form, setForm] = useState<Model>(new Model())

    const state = !!initialData
    const footer = <DialogFooter
        inputModelName="OscarInput"
        deleteResolverName="excluirOscar"
        createResolverName="criarOscar"
        editResolverName="editarOscar"
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
            <DropdownTableOptions table="categoriasOscar" inputKey="fk_CategoriaOscar_Id" column="Tipo" defaultId={form["fk_CategoriaOscar_Id"]} onInput={onInputData} placeholder="Categoria Oscar" />
            <DropdownTableOptions table="atores" inputKey="fk_Ator_Id" column="Nome" defaultId={form["fk_Ator_Id"]} onInput={onInputData} placeholder="Ator" />
        </div>
    </Dialog>
}