import art from 'ascii-art';

export default class Startup {
    constructor(readonly font: string) { }

    public async printStartupScreen(text: string) {
        try {
            let rendered = await art.font(text, this.font);
            console.log(rendered);
        } catch (err) {
            console.log(err)
        }
    }
}