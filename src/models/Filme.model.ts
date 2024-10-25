export default class FilmeModel {
    public Id = Number()
    public Nome = String()
    public Dt_Lanc = Date()
    public IMDB = Number()
    public Tempo_duracao = Number()
    public Sinopse = String()
    public fk_Produtora_Id = Number()
    public fk_FaixaEtaria_Id = Number()
};
