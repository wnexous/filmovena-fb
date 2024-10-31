import { Dropdown } from "primereact/dropdown";

import { gql, useQuery } from "@apollo/client";
import { nanoid } from "nanoid";
import { FloatLabel } from "primereact/floatlabel";
import { useEffect, useState } from "react";
import Queries from "@/interfaces/Queries";
import Loading from "./Loading";

interface DropdownTableOptionsI {
    defaultId: string | number
    onInput: (key: string, data: unknown) => void
    table: Queries
    column: string
    idColumnName?: string
    placeholder: string
    inputKey: string
}

export default function DropdownTableOptions({ placeholder, column, onInput, table, defaultId, idColumnName = "Id", inputKey }: DropdownTableOptionsI) {

    const [item, setItem] = useState<object>()

    const GET_DATA = gql`
        query {
            ${table} { ${idColumnName}, ${column} }
        }
    `;

    const { loading, data, error } = useQuery(GET_DATA);

    useEffect(() => {
        if (!!data) {
            const items = data[table] as object[]
            const item = items.find(i => i[idColumnName as keyof object] == defaultId)
            if (item) setItem(item)
        }
    }, [data])

    useEffect(() => {
        if (item) onInput(inputKey, item[idColumnName as keyof object])
    }, [item])

    if (loading || !data) return <Loading />

    if (error) return <></>

    const id = nanoid()
    return <FloatLabel key={id} >
        <label htmlFor={id} className="text-neutral-400">{placeholder}</label>
        <Dropdown
            inputId={id}
            loading={loading}
            value={item}
            onChange={(e) => setItem(e.value)}
            options={data[table]}
            optionLabel={column}
            placeholder={placeholder}
            className="w-full md:w-14rem" />
    </FloatLabel>


};
