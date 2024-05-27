class Node {
    constructor(name) {
        this.name = name;
        this.edges = [];
    }
}

function createGraph() {
    let graph = {};

    graph.A = new Node('A');
    graph.B = new Node('B');
    graph.C = new Node('C');
    graph.D = new Node('D');

    graph.A.edges.push({ node: graph.B, connections: 1 });
    graph.B.edges.push(...[
        { node: graph.A, connections: 1 },
        { node: graph.C, connections: 2 },
        { node: graph.D, connections: 1 },
    ]);
    graph.C.edges.push({ node: graph.B, connections: 2 });
    graph.D.edges.push({ node: graph.B, connections: 1 });

    return graph;
}

function main() {
    const graph = createGraph();

    let minCut = guessMinCut(graph);
    return minCut;
}

function guessMinCut(graph) {
    let graphLen = Object.keys(graph).length;
    while (graphLen > 2) {
        const u = chooseRandomNode(graph);
        const v = chooseRandomNeighor(graph, u);

        removeEdge(graph, u, v);
        removeEdge(graph, v, u);

        u.name < v.name
            ? mergeNodes(graph, u, v)
            : mergeNodes(graph, v, u);

        graphLen--;
    }
    return graph;
}

function chooseRandomNode(graph) {
    let keys = Object.keys(graph);
    return graph[keys[Math.floor(Math.random() * keys.length)]];
}

function chooseRandomNeighor(graph, node) {
    let adjacencyList = [...node.edges];
    let candidate = adjacencyList[Math.floor(Math.random() * adjacencyList.length)].node.name;
    return graph[candidate];
}

function removeEdge(graph, pivotNode, targetNode) {
    graph[pivotNode.name].edges =
        graph[pivotNode.name].edges.filter(el => el.node.name != targetNode.name);
}

function mergeNodes(graph, node1, node2) {
    let connectionDict = {};

    for (let { node, connections } of node1.edges) {
        connectionDict[node.name] = connections;
    }

    for (let { node, connections } of node2.edges) {
        if (connectionDict[node.name]) {
            connectionDict[node.name] += connections;
        }
        else connectionDict[node.name] = connections;
    }

    const newEdges = [];
    for (let name in connectionDict) {
        newEdges.push({
            node: graph[name],
            connections: connectionDict[name]
        })
    }

    node1.edges = [...newEdges];
    graph[node2.name] = graph[node1.name];
}

function printMinCut(mc) {
    let minCutNodes = {};

    for (let node in mc) {
        if (node == mc[node].name) {
            minCutNodes[node] = [];
        }
    }

    for (let node in mc) {
        if (node != mc[node].name) {
            let curr = node;
            while (curr != mc[curr].name) {
                curr = mc[curr].name;
            }
            minCutNodes[curr].push(node);
        }
    }

    const keys = Object.keys(minCutNodes);
    const V1 = minCutNodes[keys[0]].concat([keys[0]]);
    const V2 = minCutNodes[keys[1]].concat([keys[1]]);

    console.log(`Min Cut Guessed: (${V1}) | (${V2})`);
}

const minCut = main();
printMinCut(minCut);
