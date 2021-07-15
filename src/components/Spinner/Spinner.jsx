import React from "react";
import Loader from "react-loader-spinner";
import {SpinnerContainer} from "./Spinner.styled"

function Spinner() {
    return (
        <SpinnerContainer>
            <Loader type="ThreeDots" color="#3f51b5" height={280} width={280} />
        </SpinnerContainer>
    )
}

export default Spinner;
