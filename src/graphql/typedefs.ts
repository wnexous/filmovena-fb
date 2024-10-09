const typeDefs = /* GraphQL */ `
  type Query {
    filmes: [Filme]
    atores: [Ator]
    elencos: [Elenco]
    estilos: [Estilo]
    generos: [Genero]
    produtoras: [Produtora]
  }
  type Mutation {
    editarFilme(filme: FilmeInput, whereId: Int): Filme
  }
  type Filme {
    Id: ID
    Nome: String
    Dt_Lanc: String
    IMDB: Float
    Tempo_duracao: String
    Faixa_Etaria: Int
    Sinopse: String
    fk_Produtora_Id: Int
  }
  input FilmeInput {
    Id: String
    Nome: String
    Dt_Lanc: String
    IMDB: String
    Tempo_duracao: String
    Faixa_Etaria: String
    Sinopse: String
    fk_Produtora_Id: String
  }
  type Ator {
    Id: ID
    Nome: String
    Dt_Nasc: String
    Sexo: String
    Nacionalidade: String
    Raca: String
    Qntd_Oscar: Int
    Dt_Morte: String
  }
  type Elenco {
    Id: ID
    fk_Ator_Id: Int
    fk_Filme_Id: Int
  }
  type Estilo {
    Id: ID
    fk_Filme_Id: Int
    fk_Genero_Id: Int
  }
  type Genero {
    Id: ID
    Nome: String
    Descricao: String
  }
  type Produtora {
    Id: ID
    Nome: String
    Ano_Fund: Int
  }
`;

export default typeDefs