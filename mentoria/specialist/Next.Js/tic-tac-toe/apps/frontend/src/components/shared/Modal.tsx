export interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Modal(props: ModalProps) {
  return props.visible ? (
    <div
      className="flex flex-col justify-center items-center absolute top-0 left-0
    w-screen h-screen bg-black/50"
    >
      <div
        className={`flex flex-col justify-center items-center bg-dark-400 w-full
      h-1/3 ${props.className ?? ""}
      `}
      >
        {props.children}
      </div>
    </div>
  ) : null;
}
