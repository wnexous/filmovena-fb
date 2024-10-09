import FilmeModel from "@/models/Filme.model";
import { gql, useMutation } from "@apollo/client";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import IF from "../atoms/IF";
import getMessageFromError from "@/vendors/getMessageFromError";
import objDiferentiator from "@/vendors/objDiferentiator";

type Model = FilmeModel
const Model = FilmeModel

interface DialogI {
    data: Model | null
    onClose: VoidFunction
}

const UPDATE = gql`
  mutation ($filme: FilmeInput, $whereId: Int) {
    editarFilme(filme: $filme, whereId: $whereId) {
      Nome
    }
  }
`;


export default function FilmeDialog({ data: initialData, onClose }: DialogI) {

    const [form, setForm] = useState<Model>(new Model())
    const [state, setState] = useState(false)
    const [updateFilme, { loading, error }] = useMutation<FilmeModel>(UPDATE)

    const updateData = async () => {
        if (!initialData) return;
        const objects = objDiferentiator(initialData, form)

        updateFilme({
            variables: {
                whereId: parseInt(`${initialData.Id}`),
                filme: objects
            }
        })
    }

    useEffect(() => {
        if (initialData) setForm(initialData)
        setState(!!initialData)
    }, [initialData])

    const onInputData = (key: keyof typeof form, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const InputBox = ({ key, label }: { key: keyof typeof form, label: string }) => {
        return <FloatLabel key={key} className="w-full">
            <InputText className="w-full bg-transparent text-white" id={key} value={`${form[key] || ""}`} onChange={(e) => onInputData(key, e.target.value)} />
            <label id={key} className="text-neutral-400">{label}</label>
        </FloatLabel>
    }

    const footer = <div className='flex flex-wrap gap-2 w-full whitespace-nowrap text-center'>
        <Button className="basis-[80px] flex-grow justify-center bg-red-600 border-red-600 text-white" >Delete</Button>
        <Button className="basis-[80px] flex-grow justify-center bg-blue-600 border-blue-600 text-white" loading={loading} onClick={updateData}>Update</Button>
    </div>

    const header = "Editar filme"

    return <Dialog onHide={onClose} visible={state} header={header} footer={footer} className="w-full max-w-96">
        <div className="flex flex-col gap-7 w-full my-6">
            {InputBox({ key: "Id", label: "Insira o ID" })}
            {InputBox({ key: "Nome", label: "Insira o nome" })}
            {InputBox({ key: "Dt_Lanc", label: "Data de lançamento" })}
            {InputBox({ key: "IMDB", label: "Insira a nota do IMDB" })}
            {InputBox({ key: "Tempo_duracao", label: "Insira o tempo de duração" })}
            {InputBox({ key: "Faixa_Etaria", label: "Insira a faixa etária" })}
            {InputBox({ key: "Sinopse", label: "Insira a sinópse" })}
            {InputBox({ key: "fk_Produtora_Id", label: "Insira o id da produtora" })}
        </div>
        <IF conditional={!!error}>
            Deu pau:
            {getMessageFromError(error)}
        </IF>
    </Dialog>
}