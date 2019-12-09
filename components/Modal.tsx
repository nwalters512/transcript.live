import React, { Fragment } from "react";

interface IModalProps {
  title: string;
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
}

const Modal = ({ title, show, onHide, children }: IModalProps) => {
  if (!show) return null;
  return (
    <Fragment>
      <div
        className="fixed inset-0 opacity-75 bg-gray-900"
        onClick={() => onHide()}
      ></div>
      <div className="fixed inset-0 flex">
        <div className="bg-white rounded m-auto opacity-100 py-4 px-6 w-11/12 max-w-md flex flex-col">
          <h1 className="font-bold text-xl mb-2">{title}</h1>
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
