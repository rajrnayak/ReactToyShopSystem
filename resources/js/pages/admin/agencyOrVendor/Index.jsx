import { Link } from "@inertiajs/react";

function Index({ agency_or_vendors }) {
    return (
        <>
            <div className="d-flex justify-content-center pb-1">
                <div className="header d-flex justify-content-between w-100">
                    <h2>Agency Or Vendors</h2>
                    <Link href="/admin/agencyOrVendor/form">
                        <button type="button" className="btn btn-dark">
                            Add Agency Or Vendor
                        </button>
                    </Link>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <table className="table">
                    <thead className="table">
                        <tr>
                            <th scope="col">Sr.No</th>
                            <th scope="col">Type</th>
                            <th scope="col">Name</th>
                            <th scope="col">Mobile Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {agency_or_vendors.map((agency_or_vendor, index) => (
                            <tr key={index}>
                                <th scope="row" className="col-1">
                                    {index + 1}
                                </th>
                                <td>{agency_or_vendor.type}</td>
                                <td className="col-2">
                                    {agency_or_vendor.name}
                                </td>
                                <td>{agency_or_vendor.mobile_number}</td>
                                <td>{agency_or_vendor.email}</td>
                                <td>
                                    <Link href="/admin/user/create">
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
