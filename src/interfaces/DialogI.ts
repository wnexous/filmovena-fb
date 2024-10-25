export interface DialogI<T> {
    type: DialogHandlerT
    data: T | null
    onClose: VoidFunction
    onChange: (model: T | object) => void
}

export type DialogHandlerT = "edit" | "create" | undefined