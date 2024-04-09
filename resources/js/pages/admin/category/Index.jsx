import { Link } from "@inertiajs/react";

function Index() {
    return (
        <>
            <div className="d-flex justify-content-center pb-1">
                <div className="header d-flex justify-content-between w-100">
                    <h2>Categorys</h2>
                    <Link href="/admin/category/create">
                        <button type="button" className="btn btn-dark">
                            Add Category
                        </button>
                    </Link>
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
                                <a href="">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                    >
                                        Edit
                                    </button>
                                </a>
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
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Index;
