import { router } from "@inertiajs/react";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import Form from "./Form";

function Index({ all_users }) {
    const [users, setUsers] = useState(all_users);
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
                        .get(`http://127.0.0.1:8000/user/destroy/${id}`)
                        .then(function () {
                            router.get("/user");
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
                // else if (result.dismiss === Swal.DismissReason.cancel) {
                //     swalWithBootstrapButtons.fire({
                //         title: "Cancelled",
                //         text: "Your data file is safe :)",
                //         icon: "error",
                //     });
                // }
            });
    }

    return (
        <>
            <div className="d-flex justify-content-center pb-1">
                <div className="header d-flex justify-content-between w-100">
                    <h2>Users</h2>
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => formHandler()}
                    >
                        Add User
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <table className="table">
                    <thead className="table">
                        <tr>
                            <th scope="col">Sr.No</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {users.map((user, index) => (
                            <tr key={index}>
                                <th scope="row" className="col-1">
                                    {index + 1}
                                </th>
                                <td className="col-2">{user.user_name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => {
                                            formHandler(user);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger ms-1"
                                        onClick={() => {
                                            destroy(user.id);
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
            <Form title={"User"} ref={form_ref}></Form>
        </>
    );
}

export default Index;
