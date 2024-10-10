import AtorModel from "@/models/Ator.model";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import InputBox from "../organisms/InputBox";

type Model = AtorModel
const Model = AtorModel

interface DialogI {
    data: Model | null
    onClose: VoidFunction
}
export default function AtorDialog({ data: initialData, onClose }: DialogI) {


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

    const header = "Editar ator"

    return <Dialog onHide={onClose} visible={state} header={header} footer={footer} className="w-full max-w-96">
        <div className="flex flex-col gap-7 w-full my-6">
            <InputBox value={form["Id"]} inputKey="Id" label="Insira o ID" onInput={onInputData} inputType="text" outputType="int" />
            <InputBox value={form["Nome"]} inputKey="Nome" label="Insira o nome" onInput={onInputData} inputType="text" outputType="string" />
            <InputBox value={form["Dt_Nasc"]} inputKey="Dt_Nasc" label="Insira a data de nascimento" onInput={onInputData} inputType="" outputType="date" />
            <InputBox value={form["Sexo"]} inputKey="Sexo" label="Insira o sexo" onInput={onInputData} inputType="text" outputType="string" />
            <InputBox value={form["Nacionalidade"]} inputKey="Nacionalidade" label="Insira a nacionalidade" onInput={onInputData} inputType="text" outputType="string" />
            <InputBox value={form["Raca"]} inputKey="Raca" label="Insira a raça" onInput={onInputData} inputType="text" outputType="string" />
            <InputBox value={form["Qntd_Oscar"]} inputKey="Qntd_Oscar" label="Insira a quantidade de Oscar" onInput={onInputData} inputType="text" outputType="int" />
            <InputBox value={form["Dt_Morte"]} inputKey="Dt_Morte" label="Insira a data de falecimento" onInput={onInputData} inputType="date" outputType="date" />
        </div>
    </Dialog>
}