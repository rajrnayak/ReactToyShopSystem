import { Link } from "@inertiajs/react";

function Create() {
    function addSubCategory() {
        const sub_category_div = document.getElementById("subCategory");
        const text = `<h1>Hii</h1>`;
        sub_category_div.innerHTML = text;
    }
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
                            <div className="card">
                                <div className="card-body">
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
                                            onClick={addSubCategory}
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div id="subCategory"></div>
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
                                    href="/category"
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
