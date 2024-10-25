import { DialogHandlerT } from "@/interfaces/DialogI";
import objDiferentiator from "@/vendors/objDiferentiator";
import { gql, useMutation } from "@apollo/client";
import { Button } from "primereact/button";
import IF from "../atoms/IF";
import getMessageFromError from "@/vendors/getMessageFromError";

interface DialogFooterI {
    type: DialogHandlerT,
    inputModelName: string
    editResolverName: string
    createResolverName: string
    deleteResolverName: string
    form: object
    oldForm: { Id: number }
    onSend: (data: object) => void
}

export default function DialogFooter({ createResolverName, deleteResolverName, editResolverName, inputModelName, form, type, oldForm, onSend }: DialogFooterI) {

    const UPDATE = gql`
        mutation ($model: ${inputModelName}, $whereId: Int) {
            ${editResolverName}(model: $model, whereId: $whereId)
        }
    `;
    const CREATE = gql`
        mutation ($model: ${inputModelName}) {
            ${createResolverName}(model: $model)
        }
    `;
    const DELETE = gql`
        mutation ($whereId: Int) {
            ${deleteResolverName}(whereId: $whereId)
        }
    `;

    const [updateAction, updateState] = useMutation(UPDATE)
    const [createAction, createState] = useMutation(CREATE)
    const [deleteAction, deleteState] = useMutation(DELETE)

    const sendData = () => {
        if (type == "edit")
            updateAction({
                variables: {
                    whereId: parseInt(`${oldForm.Id}`),
                    model: objDiferentiator(oldForm, form)
                }
            }).then(() => { onSend(form) })

        if (type == "create")
            createAction({
                variables: {
                    model: form

                }
            }).then(() => { onSend(form) })
    }

    const deleteData = () => {
        deleteAction({
            variables: {
                whereId: parseInt(`${oldForm.Id}`),
            }
        }).then(() => { onSend(form) })
    }

    return <div className='flex flex-wrap gap-2 w-full whitespace-nowrap text-center'>


        <IF conditional={type == "edit"}>
            <Button className="basis-[80px] flex-grow justify-center bg-red-600 border-red-600 text-white" loading={deleteState.loading} onClick={deleteData} >Excluir</Button>
            <Button className="basis-[80px] flex-grow justify-center bg-blue-600 border-blue-600 text-white" loading={updateState.loading} onClick={sendData}>Atualizar</Button>
        </IF>
        <IF conditional={type == "create"}>
            <Button className="basis-[80px] flex-grow justify-center bg-blue-600 border-blue-600 text-white" loading={createState.loading} onClick={sendData}>Criar</Button>
        </IF>

        <span className="max-w-full break-words">
            <IF conditional={!!updateState.error || !!createState.error}>
                {getMessageFromError(updateState.error)}
                {getMessageFromError(createState.error)}
            </IF>
        </span>
    </div>

};
