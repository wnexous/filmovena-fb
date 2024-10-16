const typeDefs = /* GraphQL */ `

  scalar Date

  type Query {
    filmes: [Filme]
    atores: [Ator]
    elencos: [Elenco]
    estilos: [Estilo]
    generos: [Genero]
    produtoras: [Produtora]
  }
  type Mutation {
    editarAtor(model: AtorInput, whereId: Int): Boolean
    deletarAtor(modelId: Int): Boolean

    editarElenco(model: ElencoInput, whereId: Int): Boolean
    deletarElenco(modelId: Int): Boolean

    editarEstilo(model: EstiloInput, whereId: Int): Boolean
    deletarEstilo(modelId: Int): Boolean

    editarFilme(model: FilmeInput, whereId: Int): Boolean
    deletarFilme(modelId: Int): Boolean

    editarGenero(model: GeneroInput, whereId: Int): Boolean
    deletarGenero(modelId: Int): Boolean

    editarProdutora(model: ProdutoraInput, whereId: Int): Boolean
    deletarProdutora(modelId: Int): Boolean
  }
  type Filme {
    Id: ID
    Nome: String
    Dt_Lanc: Date
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
    IMDB: Float
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
  input AtorInput {
    Id: String
    Nome: String
    Dt_Nasc: String
    Sexo: String
    Nacionalidade: String
    Raca: String
    Qntd_Oscar: String
    Dt_Morte: String
  }
  type Elenco {
    Id: ID
    fk_Ator_Id: Int
    fk_Filme_Id: Int
  }
  input ElencoInput {
    Id: String
    fk_Ator_Id: String
    fk_Filme_Id: String
  }
  type Estilo {
    Id: ID
    fk_Filme_Id: Int
    fk_Genero_Id: Int
  }
  input EstiloInput {
    Id: String
    fk_Filme_Id: String
    fk_Genero_Id: String
  }
  type Genero {
    Id: ID
    Nome: String
    Descricao: String
  }
  input GeneroInput {
    Id: String
    Nome: String
    Descricao: String
  }
  type Produtora {
    Id: ID
    Nome: String
    Ano_Fund: Int
  }
  input ProdutoraInput {
    Id: String
    Nome: String
    Ano_Fund: String
  }
`;

export default typeDefs