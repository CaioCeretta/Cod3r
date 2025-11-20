'use client'

import { Teste } from "@ddd/auth";
import { useState } from "react";

`use client`
export default function Home() {
  const [texto, setTexto] = useState('')

  async function executar() {
    const casoDeUso = new Teste()
    const resposta = await casoDeUso.execute()
    setTexto(resposta)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <span>Resposta: {texto}</span>
        <button onClick={executar} type="button">Executar</button>
      </main >
    </div >
  );
}
