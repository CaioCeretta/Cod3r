/** biome-ignore-all lint/a11y/useValidAnchor: development */

// export interface RodapeProps {}

export const Rodape = () => {
  return (
    <footer className="flex justify-end items-center h-20 bg-zinc-900">
      <div className="flex justify-end container">
         <p>Todos os direitos reservados &copy; {new Date().getFullYear() }</p>
      </div>
    </footer>
  );
};

export default Rodape;
