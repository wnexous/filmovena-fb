import { Button, ButtonProps } from "primereact/button";
import { PropsWithChildren } from "react";

export default function TableButton({ ...buttonProps }: PropsWithChildren<ButtonProps>) {

    return <div className="w-full flex justify-end">
        <Button {...buttonProps} />
    </div>
}