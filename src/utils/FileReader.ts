import fs from 'fs';

export default class FileReader {
    public read(): string {
        return fs.readFileSync('data.txt', 'utf8');
    }
}