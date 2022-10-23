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
const gweiPumpAddress = "0xd27759C36967E299ef16df8FAac24D4adb21665c"
const gweiPumpABI =
[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"msgValueTooSmall","type":"error"},{"inputs":[],"name":"notOwner","type":"error"},{"inputs":[],"name":"oraclePriceFeedZero","type":"error"},{"inputs":[],"name":"pumpNotFilled","type":"error"},{"inputs":[],"name":"upKeepNotNeeded","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkRequested","type":"event"},{"anonymous":false,"inputs":[],"name":"oilBought","type":"event"},{"anonymous":false,"inputs":[],"name":"updateWti","type":"event"},{"inputs":[],"name":"Owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Wti40Milliliters","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WtiPriceOracle","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyOil40Milliliters","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"chainlinkNodeRequestWtiPrice","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"checkUpkeep","outputs":[{"internalType":"bool","name":"upkeepNeeded","type":"bool"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"erc20LINK","outputs":[{"internalType":"contract ERC20TokenContract","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"uint256","name":"memoryWtiPriceOracle","type":"uint256"}],"name":"fulfill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getLatestMaticUsd","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLatestWtiMatic","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPumpFilled","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastWtiPriceCheckUnixTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manualUpKeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"status","type":"uint256"}],"name":"ownerPumpFilledStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"}],"name":"performUpkeep","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const deployedGweiPump = new web3.eth.Contract(gweiPumpABI, gweiPumpAddress)

const vockTailsAddress = "0xC14708B1faf3737602EA69b68C893beb58baB5a7"
const vockTailsAbi =[{"inputs":[{"internalType":"address","name":"have","type":"address"},{"internalType":"address","name":"want","type":"address"}],"name":"OnlyCoordinatorCanFulfill","type":"error"},{"anonymous":false,"inputs":[],"name":"drinkVRF","type":"event"},{"inputs":[{"internalType":"uint256","name":"requestId","type":"uint256"},{"internalType":"uint256[]","name":"randomWords","type":"uint256[]"}],"name":"rawFulfillRandomWords","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"requestRandomWords","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"COORDINATOR","outputs":[{"internalType":"contractVRFCoordinatorV2Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LINKTOKEN","outputs":[{"internalType":"contractLinkTokenInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"randomDrinkValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"requestId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const deployedVockTails = new web3.eth.Contract(vockTailsAbi, vockTailsAddress)

//Get the latest value.
deployedGweiPump.methods.WtiPriceOracle().call((err, wtiPriceOracleResponse) => {
  if(wtiPriceOracleResponse === undefined){
    document.getElementById("getWtiUsd").innerHTML =  "Install Metamask and select Mumbai Testnet to have a Web3 provider to read blockchain data."
  }
  else{
    document.getElementById("getWtiUsd").innerHTML =  "$" + (wtiPriceOracleResponse/100000000).toFixed(2)
  }
})

//Get the latest value.
deployedGweiPump.methods.isPumpFilled().call((err, isPumpFilledResponse) => {
  if(isPumpFilledResponse === undefined){
    document.getElementById("getPumpStatus").innerHTML =  "Install Metamask and select Mumbai Testnet to have a Web3 provider to read blockchain data."
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

//Get the latest value.
deployedGweiPump.methods.Wti40Milliliters().call((err, isPumpFilledResponse) => {
  if(isPumpFilledResponse === undefined){
    document.getElementById("getWei40mLmatic").innerHTML =  "Install Metamask and select Mumbai Testnet to have a Web3 provider to read blockchain data."
  }
  else{
    document.getElementById("getWei40mLmatic").innerHTML = Number( ( ( (11*isPumpFilledResponse)/10)/1000000000000000000).toFixed(8) );

  }
})

//Get the latest value.
deployedVockTails.methods.randomDrinkValue().call((err, randomValueResponse) => {
  if(randomValueResponse === undefined){
    document.getElementById("randomValueVRFv2").innerHTML =  "Install Metamask and select Mumbai Testnet to have a Web3 provider to read blockchain data."
  }
  else{
    document.getElementById("randomValueVRFv2").innerHTML = BigInt(randomValueResponse);
  }
})

// MODIFY CONTRACT STATE WITH SET FUNCTION WITH PREDEFINED DATA FROM WEB3.JS
const buyOilButton = document.querySelector('.buyOilButton');
buyOilButton.addEventListener('click', () => {
  checkAddressMissingMetamask()
  buyOil()

  async function buyOil() {

    let isPumpFilledResponse = await deployedGweiPump.methods.isPumpFilled().call();

    if(isPumpFilledResponse != 1){
      alert("PUMP IS CLOSED!")
      return;
    }

    let msgValue = await deployedGweiPump.methods.Wti40Milliliters().call()
    ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: gweiPumpAddress,
          data: deployedGweiPump.methods.buyOil40Milliliters().encodeABI(),
          value: web3.utils.toHex((11*msgValue)/10), //Scale up 10% to handle price changes in mempool.
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);

}


});

// MODIFY CONTRACT STATE WITH SET FUNCTION WITH PREDEFINED DATA FROM WEB3.JS
const requestRandomValueVRFv2Button = document.querySelector('.requestRandomValueVRFv2Button');
requestRandomValueVRFv2Button.addEventListener('click', () => {
  checkAddressMissingMetamask()
  requestRandomValueVRFv2()

  async function requestRandomValueVRFv2() {
    ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: vockTailsAddress,
          data: deployedVockTails.methods.requestRandomWords().encodeABI(),
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
  }


});
