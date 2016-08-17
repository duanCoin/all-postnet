class CommandResponse {
    constructor({error, text, reset, newMapping, quit}){
        this.error = error;
        this.text =text;
        this.reset = reset;
        this.newMapping = newMapping;
        this.quit = quit;
    };
}

module.exports = CommandResponse;