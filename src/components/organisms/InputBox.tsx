import { FloatLabel } from "primereact/floatlabel"
import { InputText } from "primereact/inputtext"
import { HTMLInputTypeAttribute } from "react"
import { InputTextarea } from 'primereact/inputtextarea';


type OutputTypes = "string" | "date" | "int" | "float"

interface InputBoxI {
    inputKey: string,
    label: string,
    value: string | number | undefined,
    onInput: (key: string, data: unknown) => void
    outputType: OutputTypes
    inputType: HTMLInputTypeAttribute
    fieldType?: "text" | "text-area"
}
const InputBox = ({ inputKey, label, value = "", onInput, inputType = "text", outputType = "string", fieldType = "text" }: InputBoxI) => {
    const outputHandler = (value: string) => {
        if (outputType == "date") return value
        if (outputType == "float") {
            const numb = parseFloat(value)
            return (Number.isNaN(numb) ? "" : numb)
        }
        if (outputType == "int") {
            const numb = parseInt(value)
            return Number.isNaN(numb) ? "" : numb
        }

        return String(value)
    }

    const onChange = (value: string) => {
        onInput(inputKey, outputHandler(value))
    }

    const valueHandler = (value: string | number): string => {
        if (inputType == "date") {
            const date = new Date(value)
            return date.toISOString().split('T')[0];
        }
        return String(value)
    }

    const Input = fieldType == "text" ? InputText : InputTextarea

    return <FloatLabel key={inputKey} className="w-full">
        <Input rows={5} type={inputType} className="w-full bg-transparent text-white" step={2} id={inputKey} value={valueHandler(value)} onChange={(e) => onChange(e.target.value)} />
        <label id={inputKey} className="text-neutral-400">{label}</label>
    </FloatLabel>
}

export default InputBox