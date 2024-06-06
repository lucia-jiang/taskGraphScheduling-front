// src/components/games/TimeChallenge.js
import React from 'react';
import "../Components.css"
import {Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


const TimeChallenge = ({ }) => {
    const navigate = useNavigate();
    return (
        <div className={"rounded-square"}>
            <h1>Time challenge</h1>
            <p1>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p1>
            <Button onClick={()=>navigate('/game/time-challenge')} className={"mt-2"}>Challenge accepted!</Button>
        </div>
    );
};

export default TimeChallenge;
