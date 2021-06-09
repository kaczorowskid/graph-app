import Queue from '../utils/Queue';
import IGraphModel from './models/IGraphModel';
import { IMyObjectType, Array2D } from '../types/graphTypes'

import art from 'ascii-art';

export default class Graph implements IGraphModel {
    edges: { [key: string]: Array<number> } = {};
    colors: IMyObjectType<number> = {};
    nodes: Array<number> = [];

    public addVertex(node: number): void {
        this.nodes.push(node);
        this.edges[node] = [];
        this.colors[node] = -1;
    }

    public addEdge(node1: number, node2: number): void {
        if (node1 !== node2) {
            this.edges[node1].push(node2);
            this.edges[node2].push(node1);
        }
    }

    public printGraph(): void {
        console.log("\n\Lista sąsiedztwa:")
        console.log(this.nodes.reduce((text: string, node: number) =>
            text += (node + " -> " + [...new Set(this.edges[node])].join(", ") + "\n"), ""))
    }

    public bfs(startingNode: number): void {
        let visited: IMyObjectType<boolean> = {};
        const q: Queue = new Queue();
        visited[startingNode] = true;
        q.enqueue(startingNode);

        let str: string = '';

        while (!q.isEmpty()) {
            const getQueueElement: any = q.dequeue();
            Object.values(this.edges[getQueueElement]).forEach((i: any) => {
                if (!visited[i]) {
                    visited[i] = true;
                    q.enqueue(i);
                }
            })
            str += getQueueElement + ' ';
        }

        console.log(str)
    }

    public dfs(startingNode: number): void {

        let str: string = ''

        const DFSUtil = (vert: number, visited: any) => {
            visited[vert] = true;
            str += vert + ' ';

            var get_neighbours = this.edges[vert]
            for (var i in get_neighbours) {
                var get_elem = get_neighbours[i];
                if (!visited[get_elem])
                    DFSUtil(get_elem, visited);
            }
        }

        var visited = {};
        DFSUtil(startingNode, visited);
        console.log(str)
    }

    public adjacencyMatrix(): void {
        const inArray: Array2D<number> = Object.values(this.edges).map((row: Array<number>) => [...new Set(row)])
        console.log('\nMacierz sąsiedztwa:')
        const arrLen: number = inArray.length;
        const outArr = Array.from({ length: arrLen }, () => Array.from({ length: arrLen }, () => 0))
        inArray.forEach((row: Array<number>, r: number) => row.forEach((col: number) => outArr[r][col] = 1))
        console.log(outArr.join('\n'))
    }

    public color(): this {
        this.nodes.forEach(
            (node: number) => this.colors[node] =
                this.edges[node].map((x: number) => this.colors[x]).
                    filter((color: number) => color >= 0).
                    sort((a: number, b: number) => a - b).
                    reduce((current: number, next: number) => current === next ? current += 1 : current, 0)
        )
        return this;
    }

    public colored(): void {
        let colors = ["Czerwony", "Zielony", "Żółty", "Niebieski", "Magenta", "Cyjan", "Biały", "Czarny"]
        let col_arr = [31, 32, 33, 34, 35, 36, 37, 30]
        console.log("\nKolory wierzchołków:")
        this.nodes.forEach((node: number) => {
            console.log(`\x1b[${col_arr[this.colors[node]]}m%s`, node + " -> " + colors[this.colors[node]])
        });
    }

    public getAll(): void {
        this.color();
        this.printGraph();
        this.adjacencyMatrix();
        console.log('\nPrzeszukiwanie wszerz:')
        this.bfs(0);
        console.log('\nPrzeszukiwanie w głąb:')
        this.dfs(0);
        this.colored();
    }
}