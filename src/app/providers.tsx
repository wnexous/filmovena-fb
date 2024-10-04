import React from "react";
import { PropsWithChildren } from "react";
import { PrimeReactProvider } from 'primereact/api';
export default function Providers({ children }: PropsWithChildren) {
    return <>
        <PrimeReactProvider>
            {children}
        </PrimeReactProvider>
    </>
}