import {Component, useState} from "react";
import UnauthorizedError from "./UnauthorizedError.jsx";
import NotFoundError from "./NotFoundError.jsx";


function ErrorBoundary({errorStatus, errorDetail}) {

    return (
        <div >
            {errorStatus === 401 ? <UnauthorizedError detail={errorDetail} />: null}
            {errorStatus === 404 ? <NotFoundError detail={errorDetail} />: null}
        </div>
    )
}

export default ErrorBoundary