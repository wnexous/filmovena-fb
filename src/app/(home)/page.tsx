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



      </Card>
    </main>
  );
}
