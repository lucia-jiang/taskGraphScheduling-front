// graphData-generate/GenerateRandomGraph.js
import template1 from './graphData-templates/graph-10nodes.json';
import template2 from './graphData-templates/graph-5nodes.json';
import template3 from './graphData-templates/graph-5nodes2.json';
import template4 from './graphData-templates/graph-5nodes3.json';
import template5 from './graphData-templates/graph-6nodes.json';
import template6 from './graphData-templates/graph-6nodes2.json';
import template7 from './graphData-templates/graph-6nodes3.json';
import template8 from './graphData-templates/graph-6nodes4.json';
import template9 from './graphData-templates/graph-7nodes.json';
import template10 from './graphData-templates/graph-7nodes2.json';
import template11 from './graphData-templates/graph-7nodes3.json';
import template12 from './graphData-templates/graph-7nodes4.json';
import template13 from './graphData-templates/graph-7nodes5.json';
import template14 from './graphData-templates/graph-7nodes6.json';
import template15 from './graphData-templates/graph-8nodes.json';
import template16 from './graphData-templates/graph-8nodes10.json';
import template17 from './graphData-templates/graph-8nodes2.json';
import template18 from './graphData-templates/graph-8nodes3.json';
import template19 from './graphData-templates/graph-8nodes4.json';
import template20 from './graphData-templates/graph-8nodes5.json';
import template21 from './graphData-templates/graph-8nodes6.json';
import template22 from './graphData-templates/graph-8nodes7.json';
import template23 from './graphData-templates/graph-8nodes8.json';
import template24 from './graphData-templates/graph-8nodes9.json';
import template25 from './graphData-templates/graph-9nodes.json';

const templates = [
    template1,
    template2,
    template3,
    template4,
    template5,
    template6,
    template7,
    template8,
    template9,
    template10,
    template11,
    template12,
    template13,
    template14,
    template15,
    template16,
    template17,
    template18,
    template19,
    template20,
    template21,
    template22,
    template23,
    template24,
    template25
];

const generateRandomCostOrWeight = () => {
    return Math.floor(Math.random() * (30 - 4 + 1)) + 4; // Random integer between 4 and 30
};

const generateRandomProcessors = () => {
    return Math.floor(Math.random() * (5 - 2 + 1)) + 2; // Random integer between 2 and 5
};

const generateRandomGraph = () => {
    const randomIndex = Math.floor(Math.random() * templates.length);
    const templateData = JSON.parse(JSON.stringify(templates[randomIndex])); // Deep clone to avoid mutating original template

    // Modify costs and weights randomly
    templateData.nodes.forEach(node => {
        node.weight = generateRandomCostOrWeight();
    });

    templateData.edges.forEach(edge => {
        edge.cost = generateRandomCostOrWeight();
    });

    // Set a random number of processors
    templateData.num_processors = generateRandomProcessors();

    return templateData;
};

export default generateRandomGraph;
