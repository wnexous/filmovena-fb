
const resolvers = {
    Query: {
        teste: async () => "Feijao"
    },
    Filme: {
        Id: () => "Ident",
        Nome: () => "Nome",
        Dt_Nasc: () => "Ident",
        Sexo: () => "Ident",
        Nacionalidade: () => "Ident",
        Raca: () => "Ident",
        Qntd_Oscar: () => "Ident",
        Dt_Morte: () => "Ident",
    }
};


export default resolvers
