import { router } from "@inertiajs/react";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import Form from "./Form";

function Index() {
    const [category, setCategory] = useState(null);
    let form_ref = useRef(null);

    function formHandler(value = null) {
        form_ref.current.openModal();
    }

    return (
        <>
            <div className="d-flex justify-content-center pb-1">
                <div className="header d-flex justify-content-between w-100">
                    <h2>Categories & Sub-Categories</h2>
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
                        <tr>
                            <th scope="row">1</th>
                            <td>Toy</td>
                            <td>Truck</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger ms-1"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Form title={"Category & Sub-Category"} ref={form_ref}></Form>
        </>
    );
}

export default Index;
