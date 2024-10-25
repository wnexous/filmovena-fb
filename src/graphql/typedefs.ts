const typeDefs = /* GraphQL */ `

  scalar Date

  type Query {
    atores: [Ator]
    categoriasOscar: [CategoriaOscar]
    elencos: [Elenco]
    estilos: [Estilo]
    faixaEtarias: [FaixaEtaria]
    filmes: [Filme]
    generos: [Genero]
    oscars: [Oscar]
    produtoras: [Produtora]
  }
  type Mutation {
    criarAtor(model: AtorInput): Boolean
    editarAtor(model: AtorInput, whereId: Int): Boolean
    excluirAtor(whereId: Int): Boolean

    criarCategoriaOscar(model: CategoriaOscarInput): Boolean
    editarCategoriaOscar(model: CategoriaOscarInput, whereId: Int): Boolean
    excluirCategoriaOscar(whereId: Int): Boolean

    criarElenco(model: ElencoInput): Boolean
    editarElenco(model: ElencoInput, whereId: Int): Boolean
    excluirElenco(whereId: Int): Boolean

    criarEstilo(model: EstiloInput): Boolean
    editarEstilo(model: EstiloInput, whereId: Int): Boolean
    excluirEstilo(whereId: Int): Boolean

    criarFaixaEtaria(model: FaixaEtariaInput): Boolean
    editarFaixaEtaria(model: FaixaEtariaInput, whereId: Int): Boolean
    excluirFaixaEtaria(whereId: Int): Boolean

    criarFilme(model: FilmeInput): Boolean
    editarFilme(model: FilmeInput, whereId: Int): Boolean
    excluirFilme(whereId: Int): Boolean

    criarGenero(model: GeneroInput): Boolean
    editarGenero(model: GeneroInput, whereId: Int): Boolean
    excluirGenero(whereId: Int): Boolean

    criarOscar(model: OscarInput): Boolean
    editarOscar(model: OscarInput, whereId: Int): Boolean
    excluirOscar(whereId: Int): Boolean

    criarProdutora(model: ProdutoraInput): Boolean
    editarProdutora(model: ProdutoraInput, whereId: Int): Boolean
    excluirProdutora(whereId: Int): Boolean
  }
  type Ator {
    Id: ID
    Nome: String
    Dt_Nasc: Date
    Sexo: String
    Nacionalidade: String
    Raca: String
    Dt_Morte: Date
  }
  input AtorInput {
    Id: ID
    Nome: String
    Dt_Nasc: String
    Sexo: String
    Nacionalidade: String
    Raca: String
    Dt_Morte: String
  }
  type CategoriaOscar {
    Id: ID
    Descricao: String
    Tipo: String
  }
  input CategoriaOscarInput {
    Id: ID
    Descricao: String
    Tipo: String
  }
  type Elenco {
    Id: ID
    fk_Ator_Id: Int
    fk_Filme_Id: Int
  }
  input ElencoInput {
    Id: ID
    fk_Ator_Id: String
    fk_Filme_Id: String
  }
  type Estilo {
    Id: ID
    fk_Filme_Id: Int
    fk_Genero_Id: Int
  }
  input EstiloInput {
    Id: ID
    fk_Filme_Id: String
    fk_Genero_Id: String
  }
  type FaixaEtaria {
    Id: ID
    Idade: Int
    Descricao: String
  }
  input FaixaEtariaInput {
    Id: ID
    Idade: String
    Descricao: String
  }
  type Filme {
    Id: ID
    Nome: String
    Dt_Lanc: Date
    IMDB: Float
    Tempo_duracao: String
    Sinopse: String
    fk_Produtora_Id: Int
    fk_FaixaEtaria_Id: Int
  }
  input FilmeInput {
    Id: ID
    Nome: String
    Dt_Lanc: Date
    IMDB: Float
    Tempo_duracao: String
    Sinopse: String
    fk_Produtora_Id: String
    fk_FaixaEtaria_Id: String
  }
  type Genero {
    Id: ID
    Nome: String
    Descricao: String
  }
  input GeneroInput {
    Id: ID
    Nome: String
    Descricao: String
  }
  type Oscar {
    Id: ID
    fk_CategoriaOscar_Id: Int
    fk_Ator_Id: Int
    DataPremiacao: Date
  }
  input OscarInput {
    Id: ID
    fk_CategoriaOscar_Id: String
    fk_Ator_Id: String
    DataPremiacao: Date
  }
  type Produtora {
    Id: ID
    Nome: String
    Ano_Fund: Int
  }
  input ProdutoraInput {
    Id: ID
    Nome: String
    Ano_Fund: String
  }
`;

export default typeDefs