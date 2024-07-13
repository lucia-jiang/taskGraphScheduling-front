import axios from "axios";

export const fetchAlgorithmResults = async (graphData) => {
    try {
        const [hlfet, mcp, etf] = await Promise.all([
            axios.post('https://task-graph-scheduling-lucia-jiang-2e58e4e5.koyeb.app/algorithm/hlfet-steps', graphData, { headers: { 'Content-Type': 'application/json' } }),
            axios.post('https://task-graph-scheduling-lucia-jiang-2e58e4e5.koyeb.app/algorithm/mcp-steps', graphData, { headers: { 'Content-Type': 'application/json' } }),
            axios.post('https://task-graph-scheduling-lucia-jiang-2e58e4e5.koyeb.app/algorithm/etf-steps', graphData, { headers: { 'Content-Type': 'application/json' } })
        ]);

        // Function to find the maximum total time for an algorithm
        const getMaxTotalTime = (data) => {
            if (!data || data.length === 0) {
                return 0;
            }

            // Filter out steps that don't have details.total_time
            const validSteps = data.filter(step => step.details && typeof step.details.total_time === 'number');

            // Find the maximum total_time among valid steps
            return Math.max(...validSteps.map(step => step.details.total_time));
        };

        // Calculate maximum times for each algorithm
        const algorithm1Time = getMaxTotalTime(hlfet.data);
        const algorithm2Time = getMaxTotalTime(mcp.data);
        const algorithm3Time = getMaxTotalTime(etf.data);

        const minTime = Math.min(algorithm1Time, algorithm2Time, algorithm3Time);

        return {
            algorithm1: { time: algorithm1Time, data: hlfet.data },
            algorithm2: { time: algorithm2Time, data: mcp.data },
            algorithm3: { time: algorithm3Time, data: etf.data },
            minTime: minTime
        };
    } catch (error) {
        console.error('Error fetching algorithm results:', error);
        throw error;
    }
};

export const calculateAssignmentTime = (node, processor, assignments, scheduledTasks, currentProcessorTimes, graphData) => {
    let maxPredecessorEndTime = 0;
    const predecessors = graphData.edges.filter(edge => edge.target === node);

    for (const { source } of predecessors) {
        const predecessorTask = scheduledTasks.find(task => task.node === source);
        if (predecessorTask) {
            const commCost = graphData.edges.find(edge => edge.source === source && edge.target === node)?.cost || 0;
            if (predecessorTask.processor === processor) {
                maxPredecessorEndTime = Math.max(maxPredecessorEndTime, predecessorTask.endTime);
            } else {
                maxPredecessorEndTime = Math.max(maxPredecessorEndTime, predecessorTask.endTime + commCost);
            }
        }
    }
    const latestProcessorTime = currentProcessorTimes[processor] || 0;

    return Math.max(maxPredecessorEndTime, latestProcessorTime);
};

