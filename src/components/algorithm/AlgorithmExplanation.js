import React from 'react'
import PropTypes from "prop-types"
import "../Components.css"
import {Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const AlgorithmExplanation = ({algorithmTitle, algorithmName, desc}) => {
    const navigate = useNavigate();

    return (
        <div className={"rounded-square"}>
            <h1> {algorithmTitle} </h1>
            <p1 className={"mt-2"}>{desc}</p1>
            <div className={"row mt-4"}>
                <div className={"col-md-6 mb-2"}>
                    <Button onClick={()=>navigate(`/algorithms/${algorithmName}`)}> See an example</Button>
                </div>
                <div className={"col-md-6"}>
                    <Button onClick={()=>navigate(`/create-customised-graph/${algorithmName}`)}> Solve customised graph</Button>
                </div>
            </div>
        </div>
    )
}

AlgorithmExplanation.propTypes = {
    algorithmTitle: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
}

export default AlgorithmExplanation