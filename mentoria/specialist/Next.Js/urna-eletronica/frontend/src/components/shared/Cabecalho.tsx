/** biome-ignore-all lint/a11y/useValidAnchor: development */

import Link from "next/link";

// export interface CabecalhoProps {}

export const Cabecalho = () => {
  return (
    <header className="flex justify-between items-center h-24 bg-zinc-900">
      <div className="flex justify-between items-center container">
        <h1 className="text-white text-2xl font-bold ml-5">Elections 2012</h1>
        <nav className="flex gap-5 mr-5">
          <Link href={'/'}>
            Start
          </Link>
          <Link href="/candidate" className="text-white">
            Candidates
          </Link>
          <Link href="/voter" className="text-white">
            Voter
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Cabecalho;
