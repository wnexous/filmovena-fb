import FilmeListagemModel from "@/models/FilmeListagem.model";
import { FaImdb } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
export default function FilmeListagemItem(item: FilmeListagemModel) {
    return <div className="gap-2 justify-between flex flex-col rounded-md bg-neutral-900 px-4 py-2 border-solid border-[#ffd54f] border-[1px] basis-96 grow">
        <div className="flex flex-col">
            <div className="font-bold text-xl">
                {item.Nome}
            </div>
            <span className="flex leading-6  items-center gap-1 ">
                {item.Produtora_Nome}
            </span>
        </div>
        <div className="flex gap-4">
            <span className="">
                {new Date(item.Dt_Lanc).getFullYear()}
            </span>
            <span className="flex leading-6 items-center gap-1 bg-neutral-700 rounded-md px-1">
                <FaImdb />
                {item.IMDB}
            </span>
            <span className="flex leading-6  items-center gap-1 bg-neutral-700 rounded-md px-1">
                <MdAccessTime />
                {item.Tempo_duracao}
            </span>
        </div>
        <span className="flex leading-6  items-center gap-1 bg-neutral-700 rounded-md px-1">
            <PiTelevision />
            {item.FaixaEtaria_Descricao}
        </span>
    </div>
};
