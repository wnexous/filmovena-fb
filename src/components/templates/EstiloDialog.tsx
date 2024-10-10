import EstiloModel from "@/models/Estilo.model";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import InputBox from "../organisms/InputBox";

type Model = EstiloModel
const Model = EstiloModel

interface DialogI {
    data: Model | null
    onClose: VoidFunction
}
export default function EstiloDialog({ data: initialData, onClose }: DialogI) {


    const [form, setForm] = useState<Model>(new Model())
    const [state, setState] = useState(false)

    useEffect(() => {

        if (initialData) {
            setForm(initialData)
        }

        setState(!!initialData)
    }, [initialData])

    const onInputData = (key: string, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const footer = <div className='flex flex-wrap gap-2 w-full whitespace-nowrap text-center'>
        <Button className="basis-[80px] flex-grow justify-center bg-red-600 border-red-600 text-white" >Delete</Button>
        <Button className="basis-[80px] flex-grow justify-center bg-blue-600 border-blue-600 text-white">Update</Button>
    </div>

    const header = "Editar estilo"

    return <Dialog onHide={onClose} visible={state} header={header} footer={footer} className="w-full max-w-96">
        <div className="flex flex-col gap-7 w-full my-6">
            <InputBox value={form["Id"]} inputKey="Id" label="Insira o ID" onInput={onInputData} inputType="text" outputType="int" />
            <InputBox value={form["fk_Filme_Id"]} inputKey="fk_Filme_Id" label="Insira o id do filme" onInput={onInputData} inputType="text" outputType="int" />
            <InputBox value={form["fk_Genero_Id"]} inputKey="fk_Genero_Id" label="Insira id do gênero" onInput={onInputData} inputType="text" outputType="int" />

        </div>

    </Dialog>
}