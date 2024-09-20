//Metamask sending trasactions:
//https://docs.metamask.io/guide/sending-transactions.html#transaction-parameters

//Empty array to be filled once Metamask is called.
let accounts = [];
document.getElementById("enableEthereumButton").innerHTML =  "Connect Metamask 🦊"

//If Metamask is not detected the user will be told to install Metamask.
function detectMetamaskInstalled(){
  try{
     ethereum.isMetaMask
  }
  catch(missingMetamask) {
     alert("Metamask not detected in browser! Install Metamask browser extension, then refresh page!")
  }
}

//Alert user to connect their Metamask address to the site before doing any transactions.
function checkAddressMissingMetamask() {
  if(accounts.length == 0) {
    alert("No address from Metamask found. Click the top button to connect your Metamask account then try again without refreshing the page.")
  }
}

//Function called for getting Metamask accounts on Goerli. Used in every button in case the user forgets to click the top button.
function enableMetamaskOnGoerli() {
  //Get account details from Metamask wallet.
  getAccount();
  //Check if user is on the Goerli testnet. If not, alert them to change to Goerli.
  if(window.ethereum.networkVersion != 84532){
    alert("You are not on the Base Sepolia Testnet! Please switch to Base Sepolia and refresh page.")
  }
}

//When the page is opened check for error handling issues.
detectMetamaskInstalled()

//Connect to Metamask.
const ethereumButton = document.querySelector('#enableEthereumButton');
ethereumButton.addEventListener('click', () => {
    detectMetamaskInstalled()
    enableMetamaskOnGoerli()
});

async function getAccount() {
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  document.getElementById("enableEthereumButton").innerText = accounts[0].substr(0,5) + "..." +  accounts[0].substr(38,4)
}

//Make Metamask the client side Web3 provider. Needed for tracking live events.
const web3 = new Web3(window.ethereum)
//Now build the contract with Web3.
const gweiPumpAddress = "0x5c9E9e129dE558eCd87DaDa56CA8b058B562ee62";
const gweiPumpABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"EmptyArgs","type":"error"},{"inputs":[],"name":"EmptySource","type":"error"},{"inputs":[],"name":"NoInlineSecrets","type":"error"},{"inputs":[],"name":"OnlyRouterCanFulfill","type":"error"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"name":"UnexpectedRequestID","type":"error"},{"inputs":[],"name":"etherNotSent","type":"error"},{"inputs":[],"name":"msgValueTooSmall","type":"error"},{"inputs":[],"name":"oraclePriceFeedZero","type":"error"},{"inputs":[],"name":"pumpNotFilled","type":"error"},{"inputs":[],"name":"upKeepNotNeeded","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"RequestFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"RequestSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"requestId","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"response","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"err","type":"bytes"}],"name":"Response","type":"event"},{"anonymous":false,"inputs":[],"name":"oilBought","type":"event"},{"anonymous":false,"inputs":[],"name":"updateWti","type":"event"},{"inputs":[],"name":"MAX_BPS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SCALE_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyOil40Milliliters","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getLatestEthUsdPennies","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLatestWtiEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWti40Milliliters","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"bytes","name":"response","type":"bytes"},{"internalType":"bytes","name":"err","type":"bytes"}],"name":"handleOracleFulfillment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPumpFilled","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastWtiPriceCheckUnixTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"status","type":"uint256"}],"name":"ownerPumpFilledStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"s_lastError","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"s_lastRequestId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"s_lastResponse","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"subscriptionId","type":"uint64"},{"internalType":"string[]","name":"args","type":"string[]"}],"name":"sendRequest","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wtiUsdPenniesPriceOracle","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
const deployedGweiPump = new web3.eth.Contract(gweiPumpABI, gweiPumpAddress)

//Get the latest value.
deployedGweiPump.methods.isPumpFilled().call((err, isPumpFilledResponse) => {
  if(isPumpFilledResponse === undefined){
    document.getElementById("getPumpStatus").innerHTML =  "Install Metamask and select Base Sepolia Testnet to have a Web3 provider to read blockchain data."
  }
  else{
    if(isPumpFilledResponse == "1"){
      document.getElementById("getPumpStatus").innerHTML = "Open (" + isPumpFilledResponse + ")"
      document.getElementById("getPumpStatus").className = "text-success"
    }else{
      document.getElementById("getPumpStatus").innerHTML = "Closed (" + isPumpFilledResponse + ")"
      document.getElementById("getPumpStatus").className = "text-danger"
    }
  }
})

// MODIFY CONTRACT STATE WITH SET FUNCTION WITH PREDEFINED DATA FROM WEB3.JS
const closePumpButton = document.querySelector('.closePumpButton');
closePumpButton.addEventListener('click', () => {
  checkAddressMissingMetamask()
  closePump()

  async function closePump() {

    let ownerAddress = await deployedGweiPump.methods.owner().call();

    if(accounts[0].toLowerCase() != ownerAddress.toLowerCase() ) {
      alert("WALLET ADDRESS CONNECTED IS NOT THE OWNER!")
      return;
    }

    let isPumpFilledResponse = await deployedGweiPump.methods.isPumpFilled().call();

    if(isPumpFilledResponse == 0){
      alert("PUMP IS CLOSED ALREADY!")
      return;
    }

    ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: gweiPumpAddress,
          data: deployedGweiPump.methods.ownerPumpFilledStatus("0").encodeABI(),
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
  }


});

// MODIFY CONTRACT STATE WITH SET FUNCTION WITH PREDEFINED DATA FROM WEB3.JS
const openPumpButton = document.querySelector('.openPumpButton');
openPumpButton.addEventListener('click', () => {
  checkAddressMissingMetamask()
  openPump()

  async function openPump() {

    let ownerAddress = await deployedGweiPump.methods.owner().call();

    if(accounts[0].toLowerCase() != ownerAddress.toLowerCase() ) {
      alert("WALLET ADDRESS CONNECTED IS NOT THE OWNER!")
      return;
    }

    let isPumpFilledResponse = await deployedGweiPump.methods.isPumpFilled().call();

    if(isPumpFilledResponse == 1){
      alert("PUMP IS OPEN ALREADY!")
      return;
    }

    ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: gweiPumpAddress,
          data: deployedGweiPump.methods.ownerPumpFilledStatus("1").encodeABI(),
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
  }


});

// // MODIFY CONTRACT STATE WITH SET FUNCTION WITH PREDEFINED DATA FROM WEB3.JS
// const manualUpKeepButton = document.querySelector('.manualUpKeepButton');
// manualUpKeepButton.addEventListener('click', () => {
//   checkAddressMissingMetamask()
//   manualUpKeep()

//   async function manualUpKeep() {
//     ethereum.request({
//       method: 'eth_sendTransaction',
//       params: [
//         {
//           from: accounts[0],
//           to: gweiPumpAddress,
//           data: deployedGweiPump.methods.manualUpKeep().encodeABI(),
//         },
//       ],
//     })
//     .then((txHash) => console.log(txHash))
//     .catch((error) => console.error);
//   }


// });
