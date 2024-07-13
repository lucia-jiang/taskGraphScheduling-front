import React from 'react';
import AlgorithmExplanation from "../components/algorithm/AlgorithmExplanation";
import InfoTooltip from "../InfoToolTip";

const Algorithms = () => {
    return (
        <div className={"container-fluid mr-3"}>
            <h1>
                Algorithms{' '}
                <InfoTooltip tooltipText={"Visualise algorithm steps on a randomly generated graph, or design your own graph."}/>
            </h1>
            <div className={"row"}>
                <div className={"col-12 col-md-6"}>
                    <AlgorithmExplanation algorithmTitle={"HLFET Algorithm"}
                                          algorithmName={"hlfet"}
                                          desc={"\n" +
                                              "The Highest Level First with Estimated Time (HLFET) algorithm is a static scheduling method used in parallel processing to efficiently allocate tasks to multiple processors. The algorithm prioritises tasks based on their static level (SL), which is calculated as the execution time of a task plus the maximum SL of its successors. Tasks are sorted in descending order of their SL, ensuring that higher-priority tasks are scheduled first. HLFET then assigns each task to the processor that allows the earliest possible start time, aiming to minimise the overall completion time and balance the load among processors. "}/>
                </div>
                <div className={"col-12 col-md-6"}>
                    <AlgorithmExplanation algorithmTitle={"MCP Algorithm"}
                                          algorithmName={"mcp"}
                                          desc={"The Minimum Communication Time (MCP) algorithm is a static scheduling method. Initially, it calculates the Latest Start Time (LST) for each task based on its dependencies within the graph. These LST values are then used to create sorted lists of tasks in ascending order of their LST values. The algorithm proceeds by dequeuing tasks from this sorted list and determining their earliest possible start times on available processors. Finally, each task is assigned to the processor that allows it to start earliest, ensuring efficient task allocation across the processors."}/>
                </div>
            </div>
            <div className={"row mt-4 mb-4 mr-1 ml-1"}>
                <AlgorithmExplanation algorithmTitle={"ETF Algorithm"}
                                      algorithmName={"etf"}
                                      desc={"The Earliest Task First (ETF) algorithm schedules tasks dynamically in a directed acyclic graph (DAG) by prioritising tasks based on their earliest possible start time. Initially, each task's static level (SL) is calculated, representing the longest path from the task to an exit node. The algorithm begins with the entry nodes, those with no predecessors, and iteratively schedules tasks by evaluating the earliest start times across all processors. For each task, the algorithm calculates potential start times on each processor, accounting for communication delays if the predecessor task was scheduled on a different processor. It then selects the node-processor pair that yields the earliest start time, with ties broken by choosing the task with the higher SL. The selected task is scheduled, and its completion time updates the processor's availability. The process continues, adding newly ready tasks to the ready list, until all tasks are scheduled."}/>
            </div>

        </div>);
};

export default Algorithms;
