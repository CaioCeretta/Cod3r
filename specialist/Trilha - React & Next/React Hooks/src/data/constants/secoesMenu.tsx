import {
  IconAppWindow,
  IconArrowsLeftRight,
  IconBrain,
  IconDimensions,
  IconLetterCase,
  IconLock,
  IconMathGreater,
  IconNumbers,
  IconPin,
  IconRefreshAlert,
  IconSettings,
  IconShoppingCart,
  IconUsers,
} from "@tabler/icons-react";

const secoes = [
  {
    titulo: "Essenciais",
    aberta: false,
    itens: [
      {
        titulo: "Contador",
        url: "/essenciais/contador",
        tag: "useState",
        icone: <IconNumbers />,
      },
      {
        titulo: "Votação",
        url: "/essenciais/votacao",
        tag: "useState",
        icone: <IconUsers />,
      },
      {
        titulo: "Consulta API",
        url: "/essenciais/consultaAPI",
        tag: "useEffect",
        icone: <IconArrowsLeftRight />,
      },
      {
        titulo: "Maior",
        url: "/essenciais/maior",
        tag: "useEffect",
        icone: <IconMathGreater />,
      },
      {
        titulo: "Contagem Caracteres",
        url: "/essenciais/contagemCaracteresEffect",
        tag: "useEffect",
        icone: <IconLetterCase />,
      },
      {
        titulo: "State VS Referência",
        url: "/essenciais/stateVSRef",
        tag: "useRef",
        icone: <IconRefreshAlert />,
      },
      {
        titulo: "Referenciando Elemento",
        url: "/essenciais/refElemento",
        tag: "useRef",
        icone: <IconSettings />,
      },
      {
        titulo: "Contagem Caracteres",
        url: "/essenciais/contagemCaracteresRef",
        tag: "useRef",
        icone: <IconLetterCase />,
      },
    ],
  },
  {
    titulo: "Personalizados",
    aberta: true,
    itens: [
      {
        titulo: "Modal",
        url: "/personalizados/modal",
        tag: "Customs (useToggle)",
        icone: <IconAppWindow />,
      },
      {
        titulo: "Tamanho Janela",
        url: "/personalizados/tamanhoJanela",
        tag: "Customs",
        icone: <IconDimensions />,
      },
      {
        titulo: "Validando Senha",
        url: "/personalizados/senha",
        tag: "Personalizados",
        icone: <IconLock />,
      },
    ],
  },
  {
    titulo: "Contextos",
    aberta: true,
    itens: [
      {
        titulo: "Loja",
        url: "/contexto/loja",
        tag: "useContext",
        icone: <IconShoppingCart />,
      },
    ],
  },
  {
    titulo: "Outros",
    aberta: true,
    itens: [
      {
        titulo: "Memoizando Elementos",
        url: "/outros/memoizacao",
        tag: "useMemo",
        icone: <IconPin />
      },
      {
        titulo: "Memoizando Funções",
        url: "/outros/memoizandoFuncoes ",
        tag: "useCallback",
        icone: <IconPin />
      },
    ]
  },
];

export { secoes }