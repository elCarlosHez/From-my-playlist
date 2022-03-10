import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IModal {
  children: JSX.Element;
  onClose: () => void
}

export const Modal = (props: IModal) => {
  const { children, onClose } = props;
  return (
    <aside className="absolute top-0 left-0 w-screen h-screen z-10 bg-slate-100 px-5">
      <button
        type="button"
        className="absolute top-10 right-10 z-20"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faClose} size="2x" />
      </button>
      {children}
    </aside>
  );
};
