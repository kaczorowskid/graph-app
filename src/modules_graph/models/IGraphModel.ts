export default interface IGraphModel {
    addVertex: (v: number) => void;
    addEdge: (v: number, w: number) => void;
    printGraph: () => void;
    bfs: (startingNode: number) => void;
    dfs: (startingNode: number) => void;
}