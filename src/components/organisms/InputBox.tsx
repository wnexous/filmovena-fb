import { FloatLabel } from "primereact/floatlabel"
import { InputText } from "primereact/inputtext"

const InputBox = ({ key, label, value = "", onInput }: { key: string, label: string, value: string | number | undefined, onInput: (key: string, data: string) => void }) => {
    return <FloatLabel key={key} className="w-full">
        <InputText className="w-full bg-transparent text-white" id={key} value={`${value}`} onChange={(e) => onInput(key, e.target.value)} />
        <label id={key} className="text-neutral-400">{label}</label>
    </FloatLabel>
}

export default InputBox