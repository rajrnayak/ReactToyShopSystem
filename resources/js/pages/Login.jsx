import { Link, useForm, router } from "@inertiajs/react";
import GuestLayout from "../components/GuestLayout";

function Login() {
    const {
        data: fields,
        setData: setFields,
        errors,
        setError,
        clearErrors,
        reset,
    } = useForm({ email: "", password: "" });

    function submit(e) {
        e.preventDefault();
        clearErrors();
        axios
            .post("http://127.0.0.1:8000/login-post", fields)
            .then(function () {
                router.visit("/dashboard");
            })
            .catch(function (error) {
                setError(error.response.data.errors);
            });
    }

    return (
        <>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header">
                                        <h3 className="text-center font-weight-light my-4">
                                            Login
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={submit}>
                                            <div className="form-floating mb-3">
                                                <input
                                                    id="inputEmail"
                                                    type="email"
                                                    name="email"
                                                    value={fields.email}
                                                    onChange={(e) => {
                                                        setFields(
                                                            "email",
                                                            e.target.value
                                                        );
                                                    }}
                                                    className={`form-control ${
                                                        errors.email
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    placeholder="name@example.com"
                                                />
                                                <label htmlFor="inputEmail">
                                                    Email address
                                                </label>
                                                <div className="invalid-feedback">
                                                    {errors.email}
                                                </div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    id="inputPassword"
                                                    type="password"
                                                    name="password"
                                                    value={fields.password}
                                                    onChange={(e) => {
                                                        setFields(
                                                            "password",
                                                            e.target.value
                                                        );
                                                    }}
                                                    className={`form-control ${
                                                        errors.password
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    placeholder="Password"
                                                />
                                                <label htmlFor="inputPassword">
                                                    Password
                                                </label>
                                                <div className="invalid-feedback">
                                                    {errors.password}
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mt-4 mb-0">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                >
                                                    Login
                                                </button>
                                                {/* <a
                                                    className="btn btn-danger ms-1"
                                                    href="index.html"
                                                >
                                                    Cancel
                                                </a> */}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

Login.layout = (page) => <GuestLayout children={page} />;

export default Login;
