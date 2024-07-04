import React from 'react';
import TimeChallenge from "../components/games/TimeChallenge";
import GuessNextStep from "../components/games/GuessNextStep";

const Games = () => {
    return (
        <div>
            <h1>Games</h1>
            <div className={"container"}>
                <div className={"row mt-3"}>
                    <div className={"col-12 col-md-6"}>
                        <TimeChallenge/>
                    </div>
                    <div className={"col-12 col-md-6"}>
                        <GuessNextStep/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Games;
