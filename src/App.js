import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Algorithms from './pages/Algorithms';
import UsersSolveProblem from './pages/UsersSolveProblem';
import CreateCustomisedGraph from './pages/CreateCustomisedGraph';
import Games from './pages/Games';
import HLFETAlgorithm from "./algorithms/HLFET-algorithm";
import MCPAlgorithm from "./algorithms/MCP-algorithm";
import ETFAlgorithm from "./algorithms/ETF-algorithm";
import DLSAlgorithm from "./algorithms/DLS-algorithm";
import TimeChallengePage from "./pages/TimeChallengePage";
import GuessNextStepPage from "./pages/GuessNextStepPage";
import GenerateGraphPage from "./pages/GenerateGraphPage";

const App = () => {
    return (
        <Router>
            <Navbar/>
            <div className="container mt-4"> {/* Add margin-top */}
                <Routes>
                    <Route path="/" element={<Home/>}/> {/* Home route */}
                    <Route path="/algorithms" element={<Algorithms/>}/>
                    <Route path="/users-solve-problem" element={<UsersSolveProblem/>}/>
                    <Route path="/create-customised-graph/:algorithmName?" element={<CreateCustomisedGraph/>}/>
                    <Route path="/games" element={<Games/>}/>
                    <Route path="/algorithms/hlfet" element={<HLFETAlgorithm/>}/>
                    <Route path="/algorithms/mcp" element={<MCPAlgorithm/>}/>
                    <Route path="/algorithms/etf" element={<ETFAlgorithm/>}/>
                    <Route path="/algorithms/dls" element={<DLSAlgorithm/>}/>
                    <Route path="/game/time-challenge" element={<TimeChallengePage/>}/>
                    <Route path="/game/guess-next-step" element={<GuessNextStepPage/>}/>
                    <Route path="/generate-graph" element={<GenerateGraphPage/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
