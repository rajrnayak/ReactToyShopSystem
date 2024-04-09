import { forwardRef, useImperativeHandle } from "react";

const Modal = forwardRef(function Modal(props, ref) {
    const show = () => {
        const modal = new bootstrap.Modal(document.getElementById("modal"));
        modal.show();
    };

    const close = () => {
        const modal = new bootstrap.Modal(document.getElementById("modal"));
        modal.hide();
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
                id="modal"
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
                                {props.title}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={close}
                            ></button>
                        </div>
                        <div className="modal-body">{props.children}</div>
                        <div className="modal-footer">
                            {props.submit_button}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
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
