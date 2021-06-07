import readline from 'readline';
import Graph from '../modules_graph/Graph';
import Helper from '../utils/Helper';
import { Array2D } from '../../types/graphTypes'

export default class Menu {

    private graph: Graph = new Graph();
    private helper: Helper = new Helper();

    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    private getInput():Promise<string> {
        return new Promise((resolve, reject) => {
            let str: string = ''
            console.log('wpisz')
            this.rl.on('line', input => {
                str += input + '\n';
                if (input.toLowerCase() == 'e') resolve(str)
            })
        })
    }

    private printGraph(val: Array2D<number>) {
        val.forEach((row: Array<number>, r: number) => this.graph.addVertex(r))
        val.forEach((row: Array<number>, r: number) => row.forEach((col: number) => this.graph.addEdge(r, col)))
        this.graph.getAll();
    }


    private async switchMenu(val: string) {

        const inputVal: string = await this.getInput();

        switch (val) {
            case '1':
                const arrayVal: Array2D<number> = this.helper.stringToArray(inputVal)
                this.printGraph(arrayVal);
                process.exit();
            case '2':
                const matrix: Array2D<number> = this.helper.matrixToAdjList(inputVal);
                this.printGraph(matrix);
                process.exit();
        }
    }

    public start() {
        this.rl.question('Wybierz metode wprowadzania:\n1. Lista sąsiedztwa\n2. Macierz sąsiedztwa\n', input => {
            this.switchMenu(input)
        })
    }
}