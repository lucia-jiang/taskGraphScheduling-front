import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import "../Components.css";

const AlgorithmExplanation = ({algorithmTitle, algorithmName, desc}) => {
    const navigate = useNavigate();

    return (
        <div className="rounded-square">
            <h1>{algorithmTitle}</h1>
            <p className="mt-2">{desc}</p>
            <div className="button-container">
                <button className="custom-button" onClick={() => navigate(`/algorithms/${algorithmName}`)}>
                    See an example
                </button>
                <button className="custom-button" onClick={() => navigate(`/create-customised-graph/${algorithmName}`)}>
                    Solve customised graph
                </button>
            </div>
        </div>
    );
};

AlgorithmExplanation.propTypes = {
    algorithmTitle: PropTypes.string.isRequired,
    algorithmName: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
};

export default AlgorithmExplanation;
