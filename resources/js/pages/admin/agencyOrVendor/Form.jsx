import { useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import Modal from "../../../components/Modal.jsx";

function Form() {
    let ref = useRef(null);

    useEffect(() => {
        ref.current.show();
    }, []);

    return (
        <Modal title="Modal" ref={ref}>
            <form
                method="POST"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="card">
                    <h5 className="card-header">Create Agency Or Vendor</h5>
                    <div className="card-body p-2">
                        <div className="row p-2">
                            <label className="col-form-label col-form-label-lg">
                                User Name
                            </label>
                            <div className="col-sm-12">
                                <input
                                    type="text"
                                    name="user_name"
                                    className="form-control form-control-lg"
                                />
                            </div>
                        </div>
                        <div className="row p-2">
                            <label className="col-form-label col-form-label-lg">
                                Email
                            </label>
                            <div className="col-sm-12">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control form-control-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default Form;
