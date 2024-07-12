import React from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Algorithms from './pages/Algorithms';
import UsersSolveProblem from './pages/UsersSolveProblem';
import CreateCustomisedGraph from './pages/CreateCustomisedGraph';
import Games from './pages/Games';
import HLFETAlgorithm from "./algorithms/HLFET-algorithm";
import MCPAlgorithm from "./algorithms/MCP-algorithm";
import ETFAlgorithm from "./algorithms/ETF-algorithm";
import TimeChallengePage from "./pages/TimeChallengePage";
import GuessNextStepPage from "./pages/GuessNextStepPage";

const App = () => {
    return (
        <Router>
            <Navbar/>
            <div className="container-fluid mt-4 pl-5 pr-5">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/taskGraphScheduling-front" element={<Home/>}/>
                    <Route path="/algorithms" element={<Algorithms/>}/>
                    <Route path="/users-solve-problem" element={<UsersSolveProblem/>}/>
                    <Route path="/create-customised-graph/:algorithmName?" element={<CreateCustomisedGraph/>}/>
                    <Route path="/games" element={<Games/>}/>
                    <Route path="/algorithms/hlfet" element={<HLFETAlgorithm/>}/>
                    <Route path="/algorithms/mcp" element={<MCPAlgorithm/>}/>
                    <Route path="/algorithms/etf" element={<ETFAlgorithm/>}/>
                    <Route path="/game/time-challenge" element={<TimeChallengePage/>}/>
                    <Route path="/game/guess-next-step" element={<GuessNextStepPage/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
