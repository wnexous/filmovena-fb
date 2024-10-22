import EstiloModel from "@/models/Estilo.model";
import getMessageFromError from "@/vendors/getMessageFromError";
import objDiferentiator from "@/vendors/objDiferentiator";
import { gql, useMutation } from "@apollo/client";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import IF from "../atoms/IF";
import InputBox from "../organisms/InputBox";
import DropdownTableOptions from "../molecules/DropdownTableOptions";
import objectIsEmpity from "@/vendors/objectIsEmpity";

type Model = EstiloModel
const Model = EstiloModel

interface DialogI {
    data: Model | null
    onClose: VoidFunction
    onChange: (model: Model) => void
}

const UPDATE = gql`
  mutation ($model: EstiloInput, $whereId: Int) {
    editarEstilo(model: $model, whereId: $whereId)
  }
`;

export default function EstiloDialog({ data: initialData, onClose, onChange }: DialogI) {


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

    const header = "Editar estilo"

    return <Dialog onHide={onClose} visible={state} header={header} footer={footer} className="w-96">
        <div className="flex flex-col gap-7 w-full my-6">
            <InputBox value={form["Id"]} inputKey="Id" label="Insira o ID" onInput={onInputData} inputType="text" outputType="int" />
            <DropdownTableOptions table="filmes" inputKey="fk_Filme_Id" column="Nome" defaultId={form["fk_Filme_Id"]} onInput={onInputData} placeholder="Filme" />
            <DropdownTableOptions table="generos" inputKey="fk_Genero_Id" column="Nome" defaultId={form["fk_Genero_Id"]} onInput={onInputData} placeholder="Gênero" />
        </div>
        <IF conditional={!!error}>
            Deu pau:
            {getMessageFromError(error)}
        </IF>

    </Dialog>
}