import { FC, ReactNode } from 'react';

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Dialog: FC<DialogProps> = ({
  isOpen,
  onClose,
  children
}) => {
  return isOpen && <>
    <span className="absolute inset-0 bg-black/50" onClick={onClose}></span>
    <div className="absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center rounded-lg shadow-lg p-6 z-50">
      {children}
    </div>
  </>
}