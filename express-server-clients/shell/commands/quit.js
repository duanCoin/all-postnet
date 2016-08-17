let CommandResponse = require('./command-response');

class QuitCmd {
    go(){
        //process.exit();
        return new CommandResponse({
            quit: true,
            text: 'QUIT'
        })
    }
}

module.exports = QuitCmd;
