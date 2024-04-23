import { router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Form from "./Form";
import DataTable from "../../../components/DataTable";

function Index() {
    const [users, setUsers] = useState([]);
    const [columns, setColumns] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        per_page: 5,
        total_page: 0,
    });

    let form_ref = useRef(null);

    useEffect(() => {
        loadUsersData();
    }, [pagination.per_page]);

    function loadUsersData(page = 1) {
        axios
            .get(
                `http://127.0.0.1:8000/user/load-users-data/${pagination.per_page}/${page}`
            )
            .then(function (response) {
                setUsers(response.data.data);
                setPagination({
                    ...pagination,
                    total_page: response.data.last_page,
                    current_page: page,
                });
                addColumns(response.data.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function actionButtons(row) {
        return (
            <>
                <td>
                    <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => {
                            formHandler(row);
                        }}
                    >
                        <i className="fas fa-edit"></i>
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-danger ms-1"
                        onClick={() => {
                            destroy(row.id);
                        }}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </td>
            </>
        );
    }

    function formHandler(value = null) {
        form_ref.current.openModal(value);
    }

    function addColumns(row) {
        let temp = [];
        temp.push({
            key: "sr_no",
            name: "Sr.No",
        });
        Object.keys(row).map((key) => {
            if (key != "id") {
                const column = convertToTitleCase(key);
                temp.push({
                    key: key,
                    name: column,
                });
            }
        });
        setColumns(temp);
    }

    function convertToTitleCase(str) {
        let titleCase = "";
        str.split("_").forEach((word) => {
            const capitalizedWord =
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            titleCase += capitalizedWord + " ";
        });
        return titleCase;
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
            });
    }

    return (
        <>
            <div className="d-flex justify-content-center pb-1">
                <div className="header d-flex justify-content-between w-100 row">
                    <h2 className="col-2">Users</h2>
                    <button
                        type="button"
                        className="btn btn-outline-dark col-1"
                        onClick={() => formHandler()}
                    >
                        Add User
                    </button>
                </div>
            </div>

            <br />

            <DataTable
                columns={columns}
                rows={users}
                loadUsersData={loadUsersData}
                pagination={pagination}
                setPagination={setPagination}
                per_page_numbers={[2, 5, 10, 25]}
                actionButtons={actionButtons}
            />
            <Form title={"User"} ref={form_ref}></Form>
        </>
    );
}

export default Index;
