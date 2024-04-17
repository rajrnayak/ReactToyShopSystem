import { router, Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Form from "./Form";

function Index() {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    const [page_number, setPageNumber] = useState(10);
    let form_ref = useRef(null);

    function formHandler(value = null) {
        form_ref.current.openModal(value);
    }

    function getUsers() {
        axios
            .get(`http://127.0.0.1:8000/user/get-users/${page_number}`)
            .then(function (response) {
                setData(response.data);
                setUsers(response.data.data);
                return;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getUsers();
    }, [page_number]);

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
            });
    }

    return (
        <>
            <UserHeader />

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

            <Pagination />
        </>
    );

    function UserHeader() {
        return (
            <>
                <div className="d-flex justify-content-center pb-1">
                    <div className="header d-flex justify-content-between w-100 row">
                        <h2 className="col-2">Users</h2>
                        <div className="col-3 d-flex align-item-between">
                            <select
                                name="page"
                                value={page_number}
                                onChange={(e) => {
                                    setPageNumber(e.target.value);
                                }}
                                className="form-select form-select-sm"
                                aria-label="Small select example"
                            >
                                <option value="0">Select Page</option>
                                <option value="2">2</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select>
                            <button
                                type="button"
                                className="btn btn-dark col-4 ms-3"
                                onClick={() => formHandler()}
                            >
                                Add User
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    function Pagination() {
        return (
            <>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link">1</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </>
        );
    }
}

export default Index;

// query()->paginate(perPage: ,page: )
