

const Modal = ({ width,modalId, children }) => {
    console.log(modalId);
    return (
        <dialog id={modalId} className="modal">
            <div className={`modal-box ${width}`} >
                <form method="dialog" >
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-outline btn-primary absolute -right-0 -top-0 z-50" id="btn_modal_1">✕</button>
                </form>

                <div className="">
                    {children}
                </div>
            </div>
        </dialog>
    );
};

export default Modal;