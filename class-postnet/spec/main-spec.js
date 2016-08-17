"use strict";

describe('postnet-shell', () => {
    it('barcode-to-zipcode', ()=> {
        let BarcodeToZIpcodeCmd = require('../shell/commands/barcode-to-zipcode');
        let obj = new BarcodeToZIpcodeCmd();

        let CommandRespose = require('../shell/commands/command-response');

        let zipcode = obj.translate('|:|::|:|:|::||::::||:::|:|||:::|');

        let expected = new CommandRespose({
            error: undefined,
            text: '45632',
            reset: true,
            newMapping: undefined
        });

        expect(zipcode).toEqual(expected);
    });

    it('zipcode-to-barcode', () =>{
        let ZipcodeToBarcodeCmd = require('../shell/commands/zipcode-to-barcode');
        let obj = new ZipcodeToBarcodeCmd();

        let CommandRespose = require('../shell/commands/command-response');

        let barcode = obj.translate('56984');

        let expected = new CommandRespose({
            error: undefined,
            text: '|:|:|::||::|:|::|::|::|::||::|:|',
            reset: true,
            newMapping: undefined
        });

        expect(barcode).toEqual(expected);
    });

    it('route', () =>{
        let Route = require('../shell/route');
        let objRoute  = new Route();

        let RouteRespose = require('../shell/commands/route-response')

        let result = objRoute.run();

        let expected = new RouteRespose({text: `1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`});

        expect(result).toEqual(expected);
    });

    it('route', () =>{
        let Route = require('../shell/route');
        let objRoute  = new Route();

        let RouteRespose = require('../shell/commands/route-response')
        objRoute.run();
        let result = objRoute.run(1);

        let expected = new RouteRespose({text: 'Please input zip code:'});

        expect(result).toEqual(expected);
    });
});