import { router } from "@inertiajs/react";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import Form from "./Form";

function Index({ categories }) {
    const [data, setData] = useState(categories);
    let form_ref = useRef(null);

    function formHandler(value = null) {
        form_ref.current.openModal(value);
    }

    function destroy(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success m-1",
                cancelButton: "btn btn-danger m-1",
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios
                        .get(`http://127.0.0.1:8000/category/destroy/${id}`)
                        .then(function () {
                            router.get("/category");
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your data has been deleted.",
                        icon: "success",
                        width: "400px",
                        showConfirmButton: false,
                        timer: 1000,
                    });
                }
            });
    }

    return (
        <>
            <div className="d-flex justify-content-center pb-1">
                <div className="header d-flex justify-content-between w-100">
                    <h2>Categories</h2>
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => formHandler()}
                    >
                        Add Category
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <table className="table">
                    <thead className="table">
                        <tr>
                            <th scope="col">Sr.No</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Sub Category Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {data.map((category, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{category.name}</td>
                                <td>
                                    <ul className="list-group">
                                        {category.sub_categories.map(
                                            (sub_category, index) => (
                                                <li
                                                    className="list-group-item"
                                                    key={index}
                                                >
                                                    {sub_category.name}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => {
                                            formHandler(category);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger ms-1"
                                        onClick={() => {
                                            destroy(category.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Form title={"Category"} ref={form_ref}></Form>
        </>
    );
}

export default Index;
