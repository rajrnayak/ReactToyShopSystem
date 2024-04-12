import { forwardRef, useImperativeHandle, useState, useEffect } from "react";

const Modal = forwardRef(function Modal(
    { id = "default", closeModal, title, footer, children },
    ref
) {
    const [modal, setModal] = useState(null);

    useEffect(() => {
        setModal(new bootstrap.Modal(document.getElementById(id)));
    }, []);

    const show = () => {
        modal.show();
    };

    const close = () => {
        modal.hide();
        closeModal();
    };

    useImperativeHandle(ref, () => {
        return {
            show,
            close,
        };
    });

    return (
        <>
            <div
                className="modal fade"
                id={id}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="staticBackdropLabel"
                            >
                                {title}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={close}
                            ></button>
                        </div>
                        <div className="modal-body">{children}</div>
                        <div className="modal-footer">
                            {footer}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={close}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default Modal;
