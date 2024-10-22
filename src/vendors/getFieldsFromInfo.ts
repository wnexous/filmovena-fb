// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function getFieldsFromInfo(info: any) {
    const keys: string[] = []

    info.fieldNodes[0].selectionSet.selections.forEach((key: { name: { value: string } }) => {
        const field = key.name.value
        if (field != "__typename") keys.push(field)
    })

    return keys
};
