import { useEffect } from "react";

function DataTable({
    columns,
    rows,
    loadUsersData,
    pagination,
    setPagination,
    per_page_numbers,
    actionButtons,
}) {
    return (
        <>
            <div className="main">
                {pagination && setPagination && (
                    <div className="header">
                        <div className="d-flex justify-content-between">
                            <div className="left d-flex align-items-center">
                                <PerPage />
                            </div>
                            <div className="right d-flex align-items-center"></div>
                        </div>
                    </div>
                )}
                <div className="body">
                    <table className="table">
                        <thead className="table">
                            <tr>
                                {columns.map((column, index) => (
                                    <th scope="col" key={index}>
                                        {column.name}
                                    </th>
                                ))}
                                {actionButtons && <th scope="col">Action</th>}
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    {columns.map((column, column_index) => (
                                        <td key={column_index}>
                                            {column.key == "sr_no"
                                                ? index + 1
                                                : row[column.key]}
                                        </td>
                                    ))}
                                    {actionButtons && actionButtons(row)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {pagination && setPagination && (
                    <div className="footer bg-transparent border-dark">
                        <div className="d-flex justify-content-between">
                            <div className="left d-flex align-items-center"></div>
                            <div className="right d-flex align-items-center">
                                <Pagination />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );

    function PerPage() {
        return (
            <>
                <label className="col-8">Select Per Page</label>
                <select
                    name="page"
                    value={pagination.per_page}
                    onChange={(e) => {
                        setPagination({
                            ...pagination,
                            per_page: parseInt(e.target.value),
                        });
                    }}
                    className="form-select form-select-sm"
                    aria-label="Small select example"
                >
                    {per_page_numbers ? (
                        per_page_numbers.map((value, index) => (
                            <option value={value} key={index}>
                                {value}
                            </option>
                        ))
                    ) : (
                        <option value="5">5</option>
                    )}
                </select>
            </>
        );
    }

    function Pagination() {
        let lists = [];

        for (let index = 1; index <= pagination.total_page; index++) {
            lists.push(
                <li className="page-item" key={index}>
                    <a
                        className={
                            pagination.current_page == index
                                ? "btn page-link active"
                                : "btn page-link"
                        }
                        onClick={() => loadUsersData(index)}
                    >
                        {index}
                    </a>
                </li>
            );
        }

        return (
            <>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <a
                                className="btn page-link"
                                aria-label="Previous"
                                onClick={() => {
                                    pagination.current_page != 1 &&
                                        loadUsersData(
                                            pagination.current_page - 1
                                        );
                                }}
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {lists}
                        <li className="page-item">
                            <a
                                className="btn page-link"
                                aria-label="Next"
                                onClick={() => {
                                    pagination.current_page !=
                                        pagination.total_page &&
                                        loadUsersData(
                                            pagination.current_page + 1
                                        );
                                }}
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </>
        );
    }
}

export default DataTable;
