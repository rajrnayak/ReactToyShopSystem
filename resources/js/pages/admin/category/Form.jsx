import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Modal from "../../../components/Modal.jsx";
import Swal from "sweetalert2";

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
    } = useForm({
        id: null,
        name: "",
        sub_categories: [],
    });

    function openModal(value) {
        if (value) {
            setName(value.name);

            value.sub_categories.forEach((subCategory) => {
                delete subCategory.category_id;
            });

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

    function addSubCategory() {
        let data = { ...fields };

        data.sub_categories.push({
            id: null,
            name: "",
        });

        setFields(data);
    }

    function changeSubCategoryName(e, index) {
        const { value, name } = e.target;

        let subCategories = [...fields.sub_categories];
        subCategories[index][name] = value;

        setFields({ ...fields, sub_categories: subCategories });
    }

    function deleteSubCategoryField(index) {
        let subCategories = [...fields.sub_categories];

        if (subCategories.length == 1) {
            Swal.fire({
                title: "Deleted!",
                text: "You can't delete this field minimum 1 Sub-Category required.",
                icon: "error",
                width: "400px",
                showConfirmButton: false,
                timer: 2000,
            });
        } else {
            let changed_subCategories = subCategories.filter(
                (a, i) => i !== index
            );
            setFields({ ...fields, sub_categories: changed_subCategories });
        }
    }

    function submit(e) {
        e.preventDefault();

        clearErrors();
        let url = fields.id
            ? `http://127.0.0.1:8000/category/store-or-update/${fields.id}`
            : "http://127.0.0.1:8000/category/store-or-update";
        axios
            .post(url, fields)
            .then(function () {
                router.visit("/category");
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
                <div className="row gy-3">
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
                    <div className="col-12 d-flex justify-content-between">
                        <label className="col-form-label col-5">
                            Sub Categories
                        </label>
                        <button
                            type="button"
                            className="btn btn-primary col-2"
                            onClick={() => addSubCategory()}
                        >
                            Add
                        </button>
                    </div>
                    <div className="text-danger col-12">
                        {errors.sub_categories}
                    </div>
                    {fields.sub_categories.map((sub_category, index) => (
                        <div
                            key={index}
                            id={index}
                            className="col-12 d-flex justify-content-between"
                        >
                            <div className="col-9">
                                <input
                                    type="text"
                                    name="name"
                                    value={sub_category.name}
                                    onChange={(e) =>
                                        changeSubCategoryName(e, index)
                                    }
                                    className={`form-control ${
                                        errors[`sub_categories.${index}.name`]
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                />
                                <div className="invalid-feedback">
                                    {errors[`sub_categories.${index}.name`]}
                                </div>
                            </div>
                            <button
                                type="button"
                                className="btn btn-danger col-2"
                                onClick={() => deleteSubCategoryField(index)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </Modal>
        </form>
    );
});

export default Form;
