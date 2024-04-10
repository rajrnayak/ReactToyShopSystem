import { forwardRef, useImperativeHandle, useRef } from "react";
import { useForm, router } from "@inertiajs/react";
import Modal from "../../../components/Modal.jsx";

const Form = forwardRef(function Form({ title }, ref) {
    let modal_ref = useRef(null);
    const {
        data: fields,
        setData: setFields,
        errors,
        setError,
        clearErrors,
        reset,
    } = useForm({ id: null, type: "", name: "", mobile_number: "", email: "" });

    function openModal(value) {
        if (value) {
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
            ? `http://127.0.0.1:8000/agency-or-vendor/store-or-update/${fields.id}`
            : "http://127.0.0.1:8000/agency-or-vendor/store-or-update";

        axios
            .post(url, fields)
            .then(function () {
                router.visit("/agency-or-vendor");
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
                    fields.id
                        ? `Update ${title} : ${fields.name}`
                        : `Create ${title}`
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
                close_modal={closeModal}
            >
                <div className="row gy-2">
                    <div className="col-12">
                        <label className="form-label">Type</label>
                        <select
                            className={`form-select ${
                                errors.type ? "is-invalid" : ""
                            }`}
                            name="type"
                            value={fields.type}
                            onChange={(e) => {
                                setFields("type", e.target.value);
                            }}
                        >
                            <option value="" disabled>
                                Open this select menu
                            </option>
                            <option value="1">Agency</option>
                            <option value="2">Vendor</option>
                            <option value="3">Individual</option>
                        </select>
                        <div className="invalid-feedback">{errors.type}</div>
                    </div>
                    <div className="col-12">
                        <label className="form-label ">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={fields.name}
                            onChange={(e) => {
                                setFields("name", e.target.value);
                            }}
                            className={`form-control ${
                                errors.name ? "is-invalid" : ""
                            }`}
                        />
                        <div className="invalid-feedback">{errors.name}</div>
                    </div>
                    <div className="col-12">
                        <label className="form-label ">Mobile Number</label>
                        <input
                            type="text"
                            name="mobile_number"
                            value={fields.mobile_number}
                            onChange={(e) => {
                                setFields("mobile_number", e.target.value);
                            }}
                            className={`form-control ${
                                errors.mobile_number ? "is-invalid" : ""
                            }`}
                        />
                        <div className="invalid-feedback">
                            {errors.mobile_number}
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
