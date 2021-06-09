import { Array2D } from '../types/graphTypes';

export default class Helper {
    public stringToArray(data: string): Array2D<number> {
        return data.split(/\n|e|10|20/g).map(i => i.split(' ').map(x => Number(x))).filter((i: any) => i != 0);
    }

    public matrixToAdjList(adjMatrix: string): Array2D<number> {
        const arr = this.stringToArray(adjMatrix);
        return arr.map((a: Array<number>) => a.map((v: number, i: number) => Number(v) ? Number(i) : -1).filter((v: number) => Number(v) !== -1))
    }

    public joinString(data: string): string {
        return `${data[0]}${data[1]}`
    }
}