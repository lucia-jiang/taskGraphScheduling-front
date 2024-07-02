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
                    <p>
                        Task graph scheduling problems involve efficiently <strong>assigning interdependent tasks to
                        multiple
                        processors</strong>. These tasks, along with their dependencies, are represented using <strong>directed
                        acyclic
                        graphs (DAGs)</strong>. In these graphs, nodes represent tasks, and edges indicate dependencies
                        between
                        tasks. Each node has a weight that signifies the time required to complete the task, while each
                        edge has a weight representing the communication cost for transferring data between tasks
                        assigned to different processors. If the predecessor task and the current task are assigned to
                        the same processor, no communication cost is incurred. Additionally, a key constraint in task
                        scheduling is that each processor can only handle one task at a time.
                    </p>
                    <p>
                        The primary goal of task graph scheduling algorithms is to <strong>minimise the total completion
                        time of
                        all tasks.</strong> This involves not only optimising the order in which tasks are executed but
                        also
                        strategically assigning tasks to processors to reduce communication overhead. Effective
                        scheduling ensures a balanced workload distribution among processors and minimises idle time,
                        leading to improved performance in computational systems. These algorithms are crucial in
                        parallel computing environments, where tasks are often interdependent and must be executed in a
                        specific sequence.
                    </p>
                    <p>
                        It's important to note that while these algorithms provide good enough solutions, the underlying
                        problem is NP-complete. This means that there is no known polynomial-time solution that
                        guarantees finding the optimal solution in all cases. Therefore, task graph scheduling
                        algorithms focus on heuristic and approximation methods to find near-optimal solutions within a
                        reasonable time frame.
                    </p>
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
