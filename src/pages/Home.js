import React from 'react';
import {Link} from 'react-router-dom';
import ImageGallery from "../components/ImageGallery";

const Home = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-7">
                    <div className="task-graph-example">
                        <ImageGallery/>
                    </div>
                </div>
                {/* Explanation Section */}
                <div className="col-md-5">
                    <h2>What is Task Graph Scheduling?</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non hendrerit ipsum. In at
                        dapibus sem. Etiam et porta quam, at fermentum diam. Suspendisse potenti. Aliquam eu iaculis
                        neque, ut congue justo. Nullam ut rutrum sapien. Ut id commodo nunc, vitae scelerisque ipsum.
                        Quisque imperdiet, nisi in eleifend porta, ligula libero viverra augue, eu cursus arcu libero eu
                        nisl. Nullam leo enim, porta quis arcu eu, aliquet rutrum est. Aenean et neque feugiat,
                        imperdiet mauris eu, tristique urna. Sed tortor dolor, posuere at varius a, iaculis sodales
                        ipsum. Praesent porta ipsum id pretium posuere. Phasellus vestibulum arcu eu sodales
                        viverra.</p>
                    {/*TODO: change list to 2x2 buttoms*/}
                    <div className="list-group">
                        <Link to="/algorithms" className="list-group-item list-group-item-action">Algorithms</Link>
                        <Link to="/users-solve-problem" className="list-group-item list-group-item-action">Users Solve
                            Problem</Link>
                        <Link to="/create-customised-graph" className="list-group-item list-group-item-action">Create
                            Customised Graph</Link>
                        <Link to="/games" className="list-group-item list-group-item-action">Games</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
