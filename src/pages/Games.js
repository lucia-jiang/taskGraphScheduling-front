import React from 'react';
import TimeChallenge from "../components/games/TimeChallenge";
import AlgorithmExplanation from "../components/AlgorithmExplanation";
import GuessNextStep from "../components/games/GuessNextStep";

const Games = () => {
    return (
        <div>
            <h1>Games</h1>
            <p>Games for users to play: timing and guess the next step</p>

            <div className={"container"}>
            <div className={"row"}>
                <div className={"col-md-6"}>
                    <TimeChallenge/>
                </div>
                <div className={"col-md-6"}>
                    <GuessNextStep/>
                </div>
            </div>

        </div>
        </div>
    );
};

export default Games;
