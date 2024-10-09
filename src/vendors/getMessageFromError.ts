import { ApolloError } from "@apollo/client";


export default function getMessageFromError(error: ApolloError | undefined) {

    if (!error) return;
    return (error.cause?.extensions as { originalError: { message: string } })?.originalError?.message

};
