import resolvers from "@/graphql/resolvers";

type Queries = keyof typeof resolvers.Query


export default Queries