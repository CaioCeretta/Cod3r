import { createContext, useState } from "react";

const ContextoTema = createContext({} as any)


export function TemaProvider(props: any) {

  const cores = [
    "blue-500",
    "red-500",
    "pink-500",
    "orange-500",
    "green-500",
    "purple-500",
    "yellow-600",
  ];


  const [corDestaque, setCorDestaque] = useState<any>(cores[0])

  const ctx = { cores, corDestaque, setCorDestaque }

  return (
    <ContextoTema.Provider value={ctx}>
      {props.children}
    </ContextoTema.Provider>
  )



}

export default ContextoTema