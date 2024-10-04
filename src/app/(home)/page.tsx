"use client"

import { Button } from 'primereact/button';
import PageForm from './page.form';

import { gql, useQuery } from "@apollo/client"

const GET_DATA = gql`
  query {
      teste
  }
`;


export default function Home() {

  const { loading, error, data } = useQuery(GET_DATA);

  if(loading) return <div>Loading...</div>
  console.log('error', error)
  console.log('loading', loading)
  console.log('data', data)


  return (
    <main className="wrapper self-center min-h-[100vh] flex justify-center items-center my-aut mx-auto">
      <div className='bg-neutral-800 p-4 rounded-md max-w-96 flex flex-col gap-4'>
        <h1 className='font-sans'>Filmovena</h1>


        <PageForm />


        <div className='flex flex-wrap gap-2 w-full whitespace-nowrap text-center'>
          <Button className="basis-[80px] flex-grow justify-center bg-green-600 border-green-600 text-white" >Insert</Button>
          <Button className="basis-[80px] flex-grow justify-center">Select *</Button>
          <Button className="basis-[160px] flex-grow justify-center">Select one record</Button>
          <Button className="basis-[80px] flex-grow justify-center bg-red-600 border-red-600 text-white" >Delete</Button>
          <Button className="basis-[80px] flex-grow justify-center bg-blue-600 border-blue-600 text-white">Update</Button>
        </div>

      </div>
    </main>
  );
}
