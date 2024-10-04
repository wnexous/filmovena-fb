import { NextRequest } from "next/server"

interface ApiTableI {
    params: {
        table: string
    }
}

const GET = async (req: NextRequest, { params }: ApiTableI) => {
    return Response.json({ state: "WORKS", params })
}

export default GET