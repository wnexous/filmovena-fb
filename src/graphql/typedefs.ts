const typeDefs = /* GraphQL */ `
  type Query {
    teste: String
  }
  type Filme {
    Id: ID
    Nome: String
    Dt_Nasc:String
    Sexo: String
    Nacionalidade: String
    Raca: String
    Qntd_Oscar: Int
    Dt_Morte: String 
  }
`;

export default typeDefs