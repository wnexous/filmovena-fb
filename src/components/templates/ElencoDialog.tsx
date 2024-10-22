import ElencoModel from "@/models/Elenco.model";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import InputBox from "../organisms/InputBox";
import getMessageFromError from "@/vendors/getMessageFromError";
import objDiferentiator from "@/vendors/objDiferentiator";
import { gql, useMutation } from "@apollo/client";
import IF from "../atoms/IF";
import DropdownTableOptions from "../molecules/DropdownTableOptions";
import objectIsEmpity from "@/vendors/objectIsEmpity";

type Model = ElencoModel
const Model = ElencoModel

interface DialogI {
    data: Model | null
    onClose: VoidFunction
    onChange: (model: Model) => void
}

const UPDATE = gql`
  mutation ($model: ElencoInput, $whereId: Int) {
    editarElenco(model: $model, whereId: $whereId)
  }
`;

export default function ElencoDialog({ data: initialData, onClose, onChange }: DialogI) {

    const [form, setForm] = useState<Model>(new Model())
    const [state, setState] = useState(false)
    const [updateMutation, { loading, error }] = useMutation<Model>(UPDATE)
    const [enableUpdate, setEnableUpdate] = useState(false)

    useEffect(() => {
        if (!initialData) return;
        const objects = objDiferentiator(initialData, form)
        setEnableUpdate(objectIsEmpity(objects))
    }, [form])

    const updateData = async () => {
        if (!initialData) return;
        const objects = objDiferentiator(initialData, form)

        updateMutation({
            variables: {
                whereId: parseInt(`${initialData.Id}`),
                model: objects
            }
        }).then(() => {
            onChange(form)
        })
    }
    useEffect(() => {
        if (initialData) setForm(initialData)
        setState(!!initialData)
    }, [initialData])

    const onInputData = (key: string, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const footer = <div className='flex flex-wrap gap-2 w-full whitespace-nowrap text-center'>
        <Button className="basis-[80px] flex-grow justify-center bg-red-600 border-red-600 text-white" >Delete</Button>
        <Button className="basis-[80px] flex-grow justify-center bg-blue-600 border-blue-600 text-white" disabled={!enableUpdate} loading={loading} onClick={updateData}>Update</Button>
    </div>

    const header = "Editar elenco"

    return <Dialog onHide={onClose} visible={state} header={header} footer={footer} className="w-96">
        <div className="flex flex-col gap-7 w-full my-6">
            <InputBox value={form["Id"]} inputKey="Id" label="Insira o ID" onInput={onInputData} inputType="text" outputType="int" />
            <DropdownTableOptions table="atores" inputKey="fk_Ator_Id" column="Nome" defaultId={form["fk_Ator_Id"]} onInput={onInputData} placeholder="Ator" />
            <DropdownTableOptions table="filmes" inputKey="fk_Filme_Id" column="Nome" defaultId={form["fk_Filme_Id"]} onInput={onInputData} placeholder="Filme" />
            {/* <InputBox value={form["fk_Ator_Id"]} inputKey="fk_Ator_Id" label="Id do ator" onInput={onInputData} inputType="text" outputType="int" /> */}
            {/* <InputBox value={form["fk_Filme_Id"]} inputKey="fk_Filme_Id" label="Id do filme" onInput={onInputData} inputType="text" outputType="int" /> */}
        </div>
        <IF conditional={!!error}>
            Deu pau:
            {getMessageFromError(error)}
        </IF>

    </Dialog>
}