import { Link, router } from "@inertiajs/react";
import { useState } from "react";

const object = {
    id: null,
    user_name: "",
    email: "",
};

function Create() {
    const [user, setUser] = useState(object);

    function changeUserDetail(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    function storeData() {
        if (user.id == null) {
            axios
                .post("http://127.0.0.1:8000/admin/user/store-or-update", user)
                .then(function () {
                    router.get("/admin/user");
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
        }
    }

    console.log(user);
    return (
        <>
            <div className="container w-50 mt-5">
                <form
                    method="POST"
                    onSubmit={(e) => {
                        e.preventDefault();
                        storeData();
                    }}
                >
                    <div className="card">
                        <h5 className="card-header">Create Category</h5>
                        <div className="card-body p-2">
                            <div className="row p-2">
                                <label className="col-form-label col-form-label-lg">
                                    User Name
                                </label>
                                <div className="col-sm-12">
                                    <input
                                        type="text"
                                        name="user_name"
                                        value={user.user_name}
                                        onChange={changeUserDetail}
                                        className="form-control form-control-lg"
                                    />
                                </div>
                            </div>
                            <div className="row p-2">
                                <label className="col-form-label col-form-label-lg">
                                    Email
                                </label>
                                <div className="col-sm-12">
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={changeUserDetail}
                                        className="form-control form-control-lg"
                                    />
                                </div>
                            </div>
                            <div className="pt-3 ms-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Submit
                                </button>
                                <Link
                                    href="/admin/user"
                                    className="text-decoration-none ms-1"
                                >
                                    <label className="btn btn-danger">
                                        Cancel
                                    </label>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Create;
