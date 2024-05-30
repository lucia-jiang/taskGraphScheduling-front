import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Algorithms from './pages/Algorithms';
import UsersSolveProblem from './pages/UsersSolveProblem';
import CreateCustomisedGraph from './pages/CreateCustomisedGraph';
import Games from './pages/Games';
import Algorithm1 from "./algorithms/Algorithm1";
import Algorithm2 from "./algorithms/Algorithm2";
import Algorithm3 from "./algorithms/Algorithm3";
import Algorithm4 from "./algorithms/Algorithm4";

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4"> {/* Add margin-top */}
                <Routes>
                    <Route path="/" element={<Home />} /> {/* Home route */}
                    <Route path="/algorithms" element={<Algorithms />} />
                    <Route path="/users-solve-problem" element={<UsersSolveProblem />} />
                    <Route path="/create-customised-graph" element={<CreateCustomisedGraph />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/algorithms/alg1" element={<Algorithm1 />} />
                    <Route path="/algorithms/alg2" element={<Algorithm2 />} />
                    <Route path="/algorithms/alg3" element={<Algorithm3 />} />
                    <Route path="/algorithms/alg4" element={<Algorithm4 />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
