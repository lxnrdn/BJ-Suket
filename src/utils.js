require('colors');

const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function displayHeader() {
    process.stdout.write('\x1Bc');
    console.log('  ____       _            _         _                 '.cyan);
    console.log(' |  _ \     | |     /\   (_)       | |                '.cyan);
    console.log(' | |_) |    | |    /  \   _ _ __ __| |_ __ ___  _ __  '.cyan);
    console.log(' |  _ < _   | |   / /\ \ | | '__/ _` | '__/ _ \| '_ \ '.cyan);
    console.log(' | |_) | |__| |  / ____ \| | | | (_| | | | (_) | |_) |'.cyan);
    console.log(' |____/ \____/  /_/    \_\_|_|  \__,_|_|  \___/| .__/ '.cyan);
    console.log('                                               | |    '.cyan);
    console.log('                                               |_|    '.cyan);
    console.log();
  }

module.exports = { delay, displayHeader };
