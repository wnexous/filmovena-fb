import { FloatLabel } from "primereact/floatlabel"
import { InputText } from "primereact/inputtext"
import { HTMLInputTypeAttribute } from "react"

type OutputTypes = "string" | "date" | "int" | "float"

interface InputBoxI {
    inputKey: string,
    label: string,
    value: string | number | undefined,
    onInput: (key: string, data: unknown) => void
    outputType: OutputTypes
    inputType: HTMLInputTypeAttribute
}
const InputBox = ({ inputKey, label, value = "", onInput, inputType = "text", outputType = "string" }: InputBoxI) => {
    const outputHandler = (value: string) => {
        if (outputType == "date") return value
        if (outputType == "float") return parseFloat(value)
        if (outputType == "int") return parseInt(value)
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

    return <FloatLabel key={inputKey} className="w-full">
        <InputText type={inputType} className="w-full bg-transparent text-white" step={1} id={inputKey} value={valueHandler(value)} onChange={(e) => onChange(e.target.value)} />
        <label id={inputKey} className="text-neutral-400">{label}</label>
    </FloatLabel>
}

export default InputBox