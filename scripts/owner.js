//Metamask sending trasactions:
//https://docs.metamask.io/guide/sending-transactions.html#transaction-parameters

//Empty array to be filled once Metamask is called.
let accounts = [];
document.getElementById("enableEthereumButton").innerHTML =  "Connect Metamask"

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
  if(window.ethereum.networkVersion != 80001){
    alert("You are not on the Mumbai Testnet! Please switch to Mumbai and refresh page.")
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
const contractAddress_JS = "0xdf6110fE578B98DEF32d5066fE3538a646C9A48B"
const contractABI_JS = [{"inputs":[],"name":"msgValueTooSmall","type":"error"},{"inputs":[],"name":"notOwner","type":"error"},{"inputs":[],"name":"oraclePriceFeedZero","type":"error"},{"inputs":[],"name":"pumpNotFilled","type":"error"},{"inputs":[],"name":"upKeepNotNeeded","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkRequested","type":"event"},{"anonymous":false,"inputs":[],"name":"oilBought","type":"event"},{"anonymous":false,"inputs":[],"name":"updateWti","type":"event"},{"inputs":[],"name":"buyOil40Milliliters","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"chainlinkNodeRequestWtiPrice","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"checkUpkeep","outputs":[{"internalType":"bool","name":"upkeepNeeded","type":"bool"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"uint256","name":"memoryWtiPriceOracle","type":"uint256"}],"name":"fulfill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"manualUpKeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"status","type":"uint256"}],"name":"ownerPumpFilledStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"performUpkeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"erc20LINK","outputs":[{"internalType":"contractERC20TokenContract","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeThreeThousandthPercent","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLatestMaticUsd","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLatestWtiMatic","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPumpFilled","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastWtiPriceCheckUnixTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Wti40Milliliters","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WtiPriceOracle","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

//Get the latest value.
contractDefined_JS.methods.WtiPriceOracle().call((err, balance) => {
  if(balance === undefined){
    document.getElementById("getValueStateSmartContract").innerHTML =  "Install Metamask and select Mumbai Testnet to have a Web3 provider to read blockchain data."
  }
  else{
    document.getElementById("getValueStateSmartContract").innerHTML =  "$" + (balance/100000000)
  }
})

// MODIFY CONTRACT STATE WITH SET FUNCTION WITH PREDEFINED DATA FROM WEB3.JS
const closePumpButton = document.querySelector('.closePumpButton');
pumpOffButton.addEventListener('click', () => {
  checkAddressMissingMetamask()
  closePump()

  async function closePump() {
    ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: contractAddress_JS,
          data: contractDefined_JS.methods.ownerPumpFilledStatus("0").encodeABI(),
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
    ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: contractAddress_JS,
          data: contractDefined_JS.methods.ownerPumpFilledStatus("1").encodeABI(),
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
  }


});
