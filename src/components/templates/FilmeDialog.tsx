import FilmeModel from "@/models/Filme.model";
import getMessageFromError from "@/vendors/getMessageFromError";
import objDiferentiator from "@/vendors/objDiferentiator";
import { gql, useMutation } from "@apollo/client";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import IF from "../atoms/IF";
import InputBox from "../organisms/InputBox";

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
    console.log('form', form)
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

    const onInputData = (key: string, data: unknown) => setForm(d => ({ ...d, [key]: data }))


    const footer = <div className='flex flex-wrap gap-2 w-full whitespace-nowrap text-center'>
        <Button className="basis-[80px] flex-grow justify-center bg-red-600 border-red-600 text-white" >Delete</Button>
        <Button className="basis-[80px] flex-grow justify-center bg-blue-600 border-blue-600 text-white" loading={loading} onClick={updateData}>Update</Button>
    </div>

    const header = "Editar filme"

    return <Dialog onHide={onClose} visible={state} header={header} footer={footer} className="w-full max-w-96">
        <div className="flex flex-col gap-7 w-full my-6">
            <InputBox value={form["Id"]} inputKey="Id" label="Insira o ID" onInput={onInputData} inputType="text" outputType="int" />
            <InputBox value={form["Nome"]} inputKey="Nome" label="Insira o nome" onInput={onInputData} inputType="text" outputType="string" />
            <InputBox value={form["Dt_Lanc"]} inputKey="Dt_Lanc" label="Data de lançamento" onInput={onInputData} inputType="date" outputType="date" />
            <InputBox value={form["IMDB"]} inputKey="IMDB" label="Insira a nota do IMDB" onInput={onInputData} inputType="text" outputType="float" />
            <InputBox value={form["Tempo_duracao"]} inputKey="Tempo_duracao" label="Insira o tempo de duração" onInput={onInputData} inputType="time" outputType="int" />
            <InputBox value={form["Faixa_Etaria"]} inputKey="Faixa_Etaria" label="Insira a faixa etária" onInput={onInputData} inputType="text" outputType="string" />
            <InputBox value={form["Sinopse"]} inputKey="Sinopse" label="Insira a sinópse" onInput={onInputData} inputType="text" outputType="string" />
            <InputBox value={form["fk_Produtora_Id"]} inputKey="fk_Produtora_Id" label="Insira o id da produtora" onInput={onInputData} inputType="text" outputType="int" />
        </div>
        <IF conditional={!!error}>
            Deu pau:
            {getMessageFromError(error)}
        </IF>
    </Dialog>
}