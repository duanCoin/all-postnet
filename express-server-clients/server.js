let bodyParser = require("body-parser");

let express = require('express');
let  app = express();

let BestCharge = require('./core/best-charge');
let translateCode = new BestCharge();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const beginMenu = `1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`;

const functionMaping = {
  '1': 'Please input zip code:',
  '2': 'Please input bar code:',
  //'3':
  '*': 'Please give right input:'
};

app.get('/', function (req, res) {
  res.send(beginMenu);
});

let choseFunction = true;

app.post('/chose', function (req, res) {
  let code = req.body.code;

  if(code === '3'){
    res.end();
  }else {
    res.send(functionMaping[code] || functionMaping['*']);
  }
});


app.post('/translate', function (req, res) {
  let code = req.body.code;

  let barcodeType = translateCode.checkBarcode(code);
  let zipcodeType = translateCode.checkZipcode(code);

  if(barcodeType.isTrueBarcode) {
    res.send(translateCode.barcodeChangeToZipcode(code));
  }else if(zipcodeType.isTrueZipcode) {
    res.send(translateCode.zipcodeChangeToBarcode(code));
  }else {
    res.send(functionMaping['*']);
  }
});

app.listen(3000, function () {
  console.log('Server listening at http://localhost:3000');
});