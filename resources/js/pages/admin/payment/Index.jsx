import { useRef, useState } from "react";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
import Form from "./Form";

function Index({ payments }) {
    const [data, setData] = useState(payments);
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
                        .get("http://127.0.0.1:8000/payment/destroy/" + id)
                        .then(function () {
                            router.get("/payment");
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
                    <h2>Payment</h2>
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => formHandler()}
                    >
                        Add Payment
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <table className="table">
                    <thead className="table">
                        <tr>
                            <th scope="col">Sr.No</th>
                            <th scope="col">Vendor</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Type</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {data.map((value, index) => (
                            <tr key={index}>
                                <th scope="col">{index + 1}</th>
                                <td scope="col">{value.vendors.name}</td>
                                <td scope="col">{value.date}</td>
                                <td scope="col">{value.time}</td>
                                <td scope="col">
                                    {value.type == 1 ? "Credit" : "Debit"}
                                </td>
                                <td scope="col">{value.amount}</td>
                                <td scope="col">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => formHandler(value)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger ms-1"
                                        onClick={() => destroy(value.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Form title={"Payment"} ref={form_ref}></Form>
        </>
    );
}

export default Index;
