import GeneroModel from "@/models/Genero.model";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

type Model = GeneroModel
const Model = GeneroModel

interface DialogI {
    data: Model | null
    onClose: VoidFunction
}
export default function GeneroDialog({ data: initialData, onClose }: DialogI) {

    const [form, setForm] = useState<Model>(new Model())
    const [state, setState] = useState(false)

    useEffect(() => {

        if (initialData) {
            setForm(initialData)
        }

        setState(!!initialData)
    }, [initialData])

    const onInputData = (key: keyof typeof form, data: unknown) => setForm(d => ({ ...d, [key]: data }))

    const InputBox = ({ key, label }: { key: keyof typeof form, label: string }) => {
        return <FloatLabel key={key} className="w-full">
            <InputText className="w-full bg-transparent text-white" id={key} value={`${form[key] || ""}`} onChange={(e) => onInputData(key, e.target.value)} />
            <label id={key} className="text-neutral-400">{label}</label>
        </FloatLabel>
    }

    return <Dialog onHide={onClose} visible={state} >
        <div className="flex flex-col gap-7 w-full my-4">
            {InputBox({ key: "Id", label: "Insira o ID" })}
            {InputBox({ key: "Nome", label: "Insira o nome" })}
            {InputBox({ key: "Descricao", label: "Insira a descrição" })}
        </div>

        <div className='flex flex-wrap gap-2 w-full whitespace-nowrap text-center'>
            <Button className="basis-[80px] flex-grow justify-center bg-green-600 border-green-600 text-white" >Insert</Button>
            <Button className="basis-[80px] flex-grow justify-center">Select *</Button>
            <Button className="basis-[160px] flex-grow justify-center">Select one record</Button>
            <Button className="basis-[80px] flex-grow justify-center bg-red-600 border-red-600 text-white" >Delete</Button>
            <Button className="basis-[80px] flex-grow justify-center bg-blue-600 border-blue-600 text-white">Update</Button>
        </div>
    </Dialog>
}