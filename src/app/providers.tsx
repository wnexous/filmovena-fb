"use client"

import React from "react";
import { PropsWithChildren } from "react";
import { PrimeReactProvider } from 'primereact/api';
import { ApolloProvider } from "@apollo/client";
import client from "@/libs/api";


export default function Providers({ children }: PropsWithChildren) {
    return <>
        <ApolloProvider client={client}>
            <PrimeReactProvider>
                {children}
            </PrimeReactProvider>
        </ApolloProvider>
    </>
}