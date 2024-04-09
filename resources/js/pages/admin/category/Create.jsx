import { Link } from "@inertiajs/react";

function Create() {
    return (
        <>
            <div className="container w-50 mt-5">
                <form method="POST">
                    <div className="card">
                        <h5 className="card-header">Create Category</h5>
                        <div className="card-body p-2">
                            <div className="row p-2">
                                <label
                                    htmlFor="colFormLabelLg"
                                    className="col-form-label col-form-label-lg"
                                >
                                    Category Name
                                </label>
                                <div className="col-sm-12">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control form-control-lg"
                                        id="colFormLabelLg"
                                    />
                                </div>
                            </div>
                            <div className="row p-3 d-flex justify-content-between">
                                <label
                                    htmlFor="colFormLabelLg"
                                    className="col-form-label col-form-label-lg col-5"
                                >
                                    Sub-Category Name
                                </label>
                                <button
                                    type="button"
                                    className="btn btn-primary col-sm-2 m-1"
                                >
                                    Add
                                </button>
                            </div>
                            <div id="subCategory"></div>
                            <div className="pt-3 ms-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Submit
                                </button>
                                <Link
                                    href="/admin/category"
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
