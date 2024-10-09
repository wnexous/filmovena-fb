"use client"

import { PropsWithChildren } from "react"

interface IFi {
    conditional: boolean | undefined
}

export default function IF({ conditional, children }: PropsWithChildren<IFi>) {


    return conditional ? children : <></>

};
