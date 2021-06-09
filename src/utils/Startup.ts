import art, { Art } from 'ascii-art';

export default class Startup {
    constructor(readonly font: string) { }

    public async printStartupScreen(text: string): Promise<void> {
        try {
            const rendered: Art = await art.font(text, this.font);
            console.log(rendered);
        } catch (err) {
            console.log(err)
        }
    }
}