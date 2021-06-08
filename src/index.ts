import Menu from './utils/Menu';
import Startup from './utils/Startup';

const menu: Menu = new Menu();
const startup: Startup = new Startup('doom');

( async () => {
    await startup.printStartupScreen('GraphApp');
    menu.start();
})()






