// src/components/games/TimeChallenge.js
import React from 'react';
import "../Components.css"
import {Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';


const TimeChallenge = ({}) => {
    const navigate = useNavigate();
    return (<div className={"rounded-square"}>
        <h1>Time challenge</h1>
        <p1>
            Time Challenge is a game where you aim to efficiently schedule tasks across multiple processors. It
            presents you with a unique set of interdependent tasks represented as a directed acyclic graph (DAG). Your
            goal is to minimise the total completion time by optimising the order of task execution and strategically
            assigning tasks to processors. Beware of communication costs between processors and make sure to keep idle
            time to a minimum. It's a race against the clock as you strive to assign processors to all nodes before time
            runs out. Aim to complete the scheduling <strong>under the given time limit</strong> to prove your
            scheduling prowess and achieve the best time possible!
        </p1>
        <Button onClick={() => navigate('/game/time-challenge')} className={"mt-2"}>Challenge accepted!</Button>
    </div>);
};

export default TimeChallenge;
