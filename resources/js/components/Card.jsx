function Card({
    header_left,
    header_right,
    footer_left,
    footer_right,
    children,
}) {
    return (
        <>
            {(header_left ||
                header_right ||
                footer_left ||
                footer_right ||
                children) && (
                <div className="card border-dark">
                    {(header_left || header_right) && (
                        <div className="card-header bg-transparent border-dark">
                            <div className="d-flex justify-content-between">
                                <div className="left d-flex align-items-center">
                                    {header_left}
                                </div>
                                <div className="right d-flex align-items-center">
                                    {header_right}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="card-body">{children}</div>
                    {(footer_left || footer_right) && (
                        <div className="card-footer bg-transparent border-dark">
                            <div className="footer d-flex justify-content-between">
                                <div className="left d-flex align-items-center">
                                    {footer_left}
                                </div>
                                <div className="right d-flex align-items-center">
                                    {footer_right}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Card;
