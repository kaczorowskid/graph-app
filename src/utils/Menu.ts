import readline, { Interface } from 'readline';
import Graph from '../modules_graph/Graph';
import Helper from '../utils/Helper';
import FileReader from '../utils/FileReader';
import { Array2D } from '../types/graphTypes'

export default class Menu {

    private graph: Graph = new Graph();
    private helper: Helper = new Helper();
    private fileReader: FileReader = new FileReader();

    private rl: Interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    private getInput():Promise<string> {
        return new Promise((resolve, reject) => {
            let str: string = ''
            console.log('\nWpisz graf:')
            this.rl.on('line', input => {
                str += input + '\n';
                if (input.toLowerCase() == 'e') resolve(str)
            })
        })
    }

    private printGraph(val: Array2D<number>): void {
        val.forEach((row: Array<number>, r: number) => this.graph.addVertex(r))
        val.forEach((row: Array<number>, r: number) => row.forEach((col: number) => this.graph.addEdge(r, col)))
        this.graph.getAll();
    }


    private async switchMenu(val: string): Promise<void> {
        switch (val) {
            case '1':
                const adjListInput: string = await this.getInput();
                const arrayVal: Array2D<number> = this.helper.stringToArray(adjListInput)
                this.printGraph(arrayVal);
                process.exit();
            case '2':
                const adjMatrixInput: string = await this.getInput();
                const matrix: Array2D<number> = this.helper.matrixToAdjList(adjMatrixInput);
                this.printGraph(matrix);
                process.exit();
            case '3':
                const txtData: string = this.fileReader.read();
                const typeData = this.helper.joinString(txtData)
                if(typeData == '10') {
                    const txtArrayVal: Array2D<number> = this.helper.stringToArray(txtData)
                    this.printGraph(txtArrayVal);
                    process.exit();
                }
                else if(typeData == '20') {
                    const txtMatrix: Array2D<number> = this.helper.matrixToAdjList(txtData);
                    this.printGraph(txtMatrix);
                    process.exit();
                }
        }
    }

    public start(): void {
        this.rl.question('Wybierz metode wprowadzania:\n1. Lista sąsiedztwa\n2. Macierz sąsiedztwa\n3. Załaduj z pliku .txt\n', input => {
            this.switchMenu(input)
        })
    }
}