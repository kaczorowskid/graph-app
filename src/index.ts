import Menu from './utils/Menu';
import Startup from './utils/Startup';
import { config } from './config';

const menu: Menu = new Menu();
const startup: Startup = new Startup(config.fontName);

( async () => {
    await startup.printStartupScreen(config.appName);
    menu.start();
})()