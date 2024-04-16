import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { useForm, router } from "@inertiajs/react";
import Modal from "../../../components/Modal.jsx";

const Form = forwardRef(function Form({ title }, ref) {
    let modal_ref = useRef(null);
    const [name, setName] = useState(null);
    const [vendors, setVendors] = useState([]);
    const {
        data: fields,
        setData: setFields,
        errors,
        setError,
        clearErrors,
        reset,
    } = useForm({
        id: null,
        vendor: "",
        date: "2024-04-16",
        time: "13:00",
        type: "",
        amount: "",
    });

    function openModal(value) {
        getVendors();
        if (value) {
            setName(value.vendors.name);
            setFields({
                vendor: value.vendor_id,
                id: value.id,
                date: value.date,
                time: value.time,
                type: value.type,
                amount: value.amount,
            });
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
            ? `http://127.0.0.1:8000/payment/store-or-update/${fields.id}`
            : "http://127.0.0.1:8000/payment/store-or-update";

        axios
            .post(url, fields)
            .then(function () {
                router.visit("/payment");
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
                        <label className="form-label">Vendor</label>
                        <select
                            name="vendor"
                            value={fields.vendor}
                            onChange={(e) => {
                                setFields("vendor", e.target.value);
                            }}
                            className={`form-select ${
                                errors.vendor ? "is-invalid" : ""
                            }`}
                        >
                            <option value="" disabled>
                                Open this select menu
                            </option>
                            {vendors.map((vendor, index) => (
                                <option key={index} value={vendor.id}>
                                    {vendor.name}
                                </option>
                            ))}
                        </select>
                        <div className="invalid-feedback">{errors.vendor}</div>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={fields.date}
                            onChange={(e) => {
                                setFields("date", e.target.value);
                            }}
                            className={`form-control ${
                                errors.date ? "is-invalid" : ""
                            }`}
                        />
                        <div className="invalid-feedback">{errors.date}</div>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Time</label>
                        <input
                            type="time"
                            name="time"
                            value={fields.time}
                            onChange={(e) => {
                                setFields("time", e.target.value);
                            }}
                            className={`form-control ${
                                errors.time ? "is-invalid" : ""
                            }`}
                        />
                        <div className="invalid-feedback">{errors.time}</div>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Type</label>
                        <select
                            name="type"
                            onChange={(e) => {
                                setFields("type", e.target.value);
                            }}
                            value={fields.type}
                            className={`form-select ${
                                errors.type ? "is-invalid" : ""
                            }`}
                        >
                            <option value="" disabled>
                                Open this select menu
                            </option>
                            <option value="1">Credit</option>
                            <option value="2">Debit</option>
                        </select>
                        <div className="invalid-feedback">{errors.type}</div>
                    </div>
                    <div className="col-12">
                        <label className="form-label ">Amount</label>
                        <input
                            type="text"
                            name="amount"
                            value={fields.amount}
                            onChange={(e) => {
                                setFields("amount", e.target.value);
                            }}
                            className={`form-control ${
                                errors.amount ? "is-invalid" : ""
                            }`}
                        />
                        <div className="invalid-feedback">{errors.amount}</div>
                    </div>
                </div>
            </Modal>
        </form>
    );

    function getVendors() {
        axios
            .get("http://127.0.0.1:8000/payment/get-vendors")
            .then(function (response) {
                setVendors(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});

export default Form;
