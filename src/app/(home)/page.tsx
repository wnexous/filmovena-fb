"use client"

import AtorForm from "@/components/templates/AtorForm";
import ElencoForm from "@/components/templates/ElencoForm";
import EstiloForm from "@/components/templates/EstiloForm";
import GeneroForm from "@/components/templates/GeneroForm";
import ProdutoraForm from "@/components/templates/ProdutoraForm";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { TabPanel, TabView } from 'primereact/tabview';
import FilmeForm from '../../components/templates/FilmeForm';




export default function Home() {



  return (
    <main className="wrapper self-center min-h-[100vh] flex justify-center items-center my-aut mx-auto">
      <Card className='flex flex-col gap-4 max-w-full' title="Filmovena" subTitle="Assista filmes gratuitamente">

        <TabView className='bg-transparent'>
          <TabPanel header="Filmes" className='bg-transparent'>
            <FilmeForm />
          </TabPanel>
          <TabPanel header="Atores">
            <AtorForm />
          </TabPanel>
          <TabPanel header="Genero">
            <GeneroForm />
          </TabPanel>
          <TabPanel header="Produtora">
            <ProdutoraForm />
          </TabPanel>
          <TabPanel header="Elenco">
            <ElencoForm />
          </TabPanel>
          <TabPanel header="Estilo">
            <EstiloForm />
          </TabPanel>
        </TabView>


        <div className='flex flex-wrap gap-2 w-full whitespace-nowrap text-center'>
          <Button className="basis-[80px] flex-grow justify-center bg-green-600 border-green-600 text-white" >Insert</Button>
          <Button className="basis-[80px] flex-grow justify-center">Select *</Button>
          <Button className="basis-[160px] flex-grow justify-center">Select one record</Button>
          <Button className="basis-[80px] flex-grow justify-center bg-red-600 border-red-600 text-white" >Delete</Button>
          <Button className="basis-[80px] flex-grow justify-center bg-blue-600 border-blue-600 text-white">Update</Button>
        </div>

      </Card>
    </main>
  );
}
