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
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
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
        date: "",
        time: "",
        sub_category: "",
        vendor: "",
        amount: "",
    });

    useEffect(() => {
        let sub_category_value = document.getElementById("sub_category").value;
        setFields("sub_category", sub_category_value);
    }, [subCategories]);

    function openModal(value) {
        getCategories();
        getVendors();
        if (value) {
            setName(value.vendors.name);
            getSubCategories(value.sub_category_id);
            setFields({
                id: value.id,
                date: value.date,
                time: value.time,
                category: value.sub_categories.category_id,
                sub_category: value.sub_category_id,
                vendor: value.vendor_id,
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
            ? `http://127.0.0.1:8000/expense/store-or-update/${fields.id}`
            : "http://127.0.0.1:8000/expense/store-or-update";

        axios
            .post(url, fields)
            .then(function () {
                router.visit("/expense");
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
                        <label className="form-label">Category</label>
                        <select
                            name="category"
                            onChange={(e) => {
                                getSubCategories(e.target.value),
                                    setFields("category", e.target.value);
                            }}
                            value={fields.category}
                            className={`form-select`}
                        >
                            <option value="">Open this select menu</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Sub Category</label>
                        <select
                            id="sub_category"
                            name="sub_category"
                            value={fields.sub_category}
                            onChange={(e) => {
                                setFields("sub_category", e.target.value);
                            }}
                            className={`form-select ${
                                errors.sub_category ? "is-invalid" : ""
                            }`}
                        >
                            <option value="" disabled>
                                Open this select menu
                            </option>
                            {subCategories.map((sub_category, index) => (
                                <option key={index} value={sub_category.id}>
                                    {sub_category.name}
                                </option>
                            ))}
                        </select>
                        <div className="invalid-feedback">
                            {errors.sub_category}
                        </div>
                    </div>
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

    function getCategories() {
        axios
            .get("http://127.0.0.1:8000/expense/get-categories")
            .then(function (response) {
                setCategories(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getSubCategories(id) {
        axios
            .get(`http://127.0.0.1:8000/expense/get-sub-categories/${id}`)
            .then(function (response) {
                setSubCategories(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getVendors() {
        axios
            .get("http://127.0.0.1:8000/expense/get-vendors")
            .then(function (response) {
                setVendors(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});

export default Form;
