

const Modal = ({ width,modalId, children }) => {
    console.log(modalId);
    return (
        <dialog id={modalId} className="modal">
            <div className={`modal-box ${width}`} >
                <div className="border-b border-violet-700">
                    <p className="pb-3 ps-2 text-xl font-bold">Edit</p>
                </div>
                <form method="dialog" >
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-outline btn-primary absolute right-4 top-4 z-50">✕</button>
                </form>

                <div className="">
                    {children}
                </div>
            </div>
        </dialog>
    );
};

export default Modal;