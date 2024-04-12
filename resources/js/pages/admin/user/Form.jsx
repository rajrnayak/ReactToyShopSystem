import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Modal from "../../../components/Modal.jsx";

const Form = forwardRef(function Form({ title }, ref) {
    let modal_ref = useRef(null);
    const [name, setName] = useState(null);
    const {
        data: fields,
        setData: setFields,
        errors,
        setError,
        clearErrors,
        reset,
    } = useForm({ id: null, user_name: "", email: "" });

    function openModal(value) {
        if (value) {
            setName(value.user_name);
            setFields(value);
        }
        modal_ref.current.show();
    }

    function closeModal() {
        reset();
        clearErrors();
    }

    useImperativeHandle(ref, () => {
        return {
            openModal,
            closeModal,
        };
    });

    function submit(e) {
        e.preventDefault();
        clearErrors();
        let url = fields.id
            ? `http://127.0.0.1:8000/user/store-or-update/${fields.id}`
            : "http://127.0.0.1:8000/user/store-or-update";
        axios
            .post(url, fields)
            .then(function () {
                router.visit("/user");
                modal_ref.current.close();
            })
            .catch(function (error) {
                setError(error.response.data.errors);
            });
    }

    return (
        <form>
            <Modal
                title={
                    fields.id ? `Update ${title} : ${name}` : `Create ${title}`
                }
                ref={modal_ref}
                footer={
                    <button
                        type="submit"
                        onClick={submit}
                        className="btn btn-primary"
                    >
                        Submit
                    </button>
                }
                closeModal={closeModal}
            >
                <div className="row gy-2">
                    <div className="col-12">
                        <label className="form-label ">User Name</label>
                        <input
                            type="text"
                            name="user_name"
                            value={fields.user_name}
                            onChange={(e) => {
                                setFields("user_name", e.target.value);
                            }}
                            className={`form-control ${
                                errors.user_name ? "is-invalid" : ""
                            }`}
                        />
                        <div className="invalid-feedback">
                            {errors.user_name}
                        </div>
                    </div>
                    <div className="col-12">
                        <label className="form-label ">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={fields.email}
                            onChange={(e) => {
                                setFields("email", e.target.value);
                            }}
                            className={`form-control ${
                                errors.email ? "is-invalid" : ""
                            }`}
                        />
                        <div className="invalid-feedback">{errors.email}</div>
                    </div>
                </div>
            </Modal>
        </form>
    );
});

export default Form;
