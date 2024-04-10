import { Link } from "@inertiajs/react";
import { useState } from "react";

function Index({ all_users }) {
    const [users, setUsers] = useState(all_users);
    return (
        <>
            <div className="d-flex justify-content-center pb-1">
                <div className="header d-flex justify-content-between w-100">
                    <h2>Users</h2>
                    <Link href="/user/create">
                        <button type="button" className="btn btn-dark">
                            Add User
                        </button>
                    </Link>
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
                                    <Link href="/user/create">
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                        >
                                            Edit
                                        </button>
                                    </Link>
                                    <a href="">
                                        <button
                                            type="button"
                                            className="btn btn-danger ms-1"
                                        >
                                            Delete
                                        </button>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Index;
