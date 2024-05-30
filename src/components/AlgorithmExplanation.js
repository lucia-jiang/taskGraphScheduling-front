import React from 'react'
import PropTypes from "prop-types"
import "./Algorithms.css"
import {Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const AlgorithmExplanation = ({algorithmName, shortName, desc}) => {
    const navigate = useNavigate()
    function handleExample(){
        navigate()
    }

    function handleCustomisedGraph(){

    }

    return (
        <div className={"rounded-square"}>
            <h1> {algorithmName} </h1>
            <p1 className={"mt-2"}>{desc}</p1>
            <div className={"row mt-4"}>
                <div className={"col-md-6"}>
                    <Button onClick={()=>navigate(`/algorithms/${shortName}`)}> See an example</Button>
                </div>
                <div className={"col-md-6"}>
                    <Button onClick={handleCustomisedGraph}> Solve customised graph</Button>
                </div>
            </div>
        </div>
    )
}

AlgorithmExplanation.propTypes = {
    algorithmName: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
}

// AlgorithmExplanation.defaultProps = {
//     className: ""
// }

export default AlgorithmExplanation