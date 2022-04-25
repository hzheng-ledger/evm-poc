const Web3 = require("web3");
const ethers = require('ethers');
const config = require("./config.json");
const testnet = config.endpoint;

const web3 = new Web3(new Web3.providers.HttpProvider(testnet));

const erc20ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];

const erc721ABI = [
    {
       "constant":false,
       "inputs":[
          {
             "internalType":"address",
             "name":"to",
             "type":"address"
          },
          {
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"approve",
       "outputs":[
          
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {
       "constant":false,
       "inputs":[
          {
             "internalType":"address",
             "name":"to",
             "type":"address"
          },
          {
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"mint",
       "outputs":[
          
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {
       "constant":false,
       "inputs":[
          {
             "internalType":"address",
             "name":"from",
             "type":"address"
          },
          {
             "internalType":"address",
             "name":"to",
             "type":"address"
          },
          {
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"safeTransferFrom",
       "outputs":[
          
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {
       "constant":false,
       "inputs":[
          {
             "internalType":"address",
             "name":"from",
             "type":"address"
          },
          {
             "internalType":"address",
             "name":"to",
             "type":"address"
          },
          {
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          },
          {
             "internalType":"bytes",
             "name":"_data",
             "type":"bytes"
          }
       ],
       "name":"safeTransferFrom",
       "outputs":[
          
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {
       "constant":false,
       "inputs":[
          {
             "internalType":"address",
             "name":"to",
             "type":"address"
          },
          {
             "internalType":"bool",
             "name":"approved",
             "type":"bool"
          }
       ],
       "name":"setApprovalForAll",
       "outputs":[
          
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {
       "constant":false,
       "inputs":[
          {
             "internalType":"address",
             "name":"from",
             "type":"address"
          },
          {
             "internalType":"address",
             "name":"to",
             "type":"address"
          },
          {
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"transferFrom",
       "outputs":[
          
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {
       "inputs":[
          
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"constructor"
    },
    {
       "anonymous":false,
       "inputs":[
          {
             "indexed":true,
             "internalType":"address",
             "name":"from",
             "type":"address"
          },
          {
             "indexed":true,
             "internalType":"address",
             "name":"to",
             "type":"address"
          },
          {
             "indexed":true,
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"Transfer",
       "type":"event"
    },
    {
       "anonymous":false,
       "inputs":[
          {
             "indexed":true,
             "internalType":"address",
             "name":"owner",
             "type":"address"
          },
          {
             "indexed":true,
             "internalType":"address",
             "name":"approved",
             "type":"address"
          },
          {
             "indexed":true,
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"Approval",
       "type":"event"
    },
    {
       "anonymous":false,
       "inputs":[
          {
             "indexed":true,
             "internalType":"address",
             "name":"owner",
             "type":"address"
          },
          {
             "indexed":true,
             "internalType":"address",
             "name":"operator",
             "type":"address"
          },
          {
             "indexed":false,
             "internalType":"bool",
             "name":"approved",
             "type":"bool"
          }
       ],
       "name":"ApprovalForAll",
       "type":"event"
    },
    {
       "constant":true,
       "inputs":[
          {
             "internalType":"address",
             "name":"owner",
             "type":"address"
          }
       ],
       "name":"balanceOf",
       "outputs":[
          {
             "internalType":"uint256",
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    {
       "constant":true,
       "inputs":[
          {
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"getApproved",
       "outputs":[
          {
             "internalType":"address",
             "name":"",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    {
       "constant":true,
       "inputs":[
          {
             "internalType":"address",
             "name":"owner",
             "type":"address"
          },
          {
             "internalType":"address",
             "name":"operator",
             "type":"address"
          }
       ],
       "name":"isApprovedForAll",
       "outputs":[
          {
             "internalType":"bool",
             "name":"",
             "type":"bool"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    {
       "constant":true,
       "inputs":[
          {
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"ownerOf",
       "outputs":[
          {
             "internalType":"address",
             "name":"",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    {
       "constant":true,
       "inputs":[
          {
             "internalType":"bytes4",
             "name":"interfaceId",
             "type":"bytes4"
          }
       ],
       "name":"supportsInterface",
       "outputs":[
          {
             "internalType":"bool",
             "name":"",
             "type":"bool"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    }
 ];

async function getNetworkId(): Promise<number> {
    return await web3.eth.net.getId();
}

async function getChainId(): Promise<number> {
    return await web3.eth.getChainId();
}

async function getBlockNumber(): Promise<number> {
    return await web3.eth.getBlockNumber();
}

async function getBalance(address: string) : Promise<number> {
    const walletAddress = Web3.utils.toChecksumAddress(address);
    const balance = await web3.eth.getBalance(walletAddress);
    return await web3.utils.fromWei(balance, 'ether');
}

async function getTokenName(contractAddress: string) : Promise<string> {
    const contract = new web3.eth.Contract(erc20ABI, contractAddress);
    return await contract.methods.name().call();
}

async function getTokenDecimals(contractAddress: string) : Promise<number> {
    const contract = new web3.eth.Contract(erc20ABI, contractAddress);
    return await contract.methods.decimals().call();
}

async function getTokenSymbol(contractAddress: string) : Promise<string> {
    const contract = new web3.eth.Contract(erc20ABI, contractAddress);
    return await contract.methods.symbol().call();
}

async function getTokenBalance(address: string, contractAddress: string) : Promise<number> {
    const contract = new web3.eth.Contract(erc20ABI, contractAddress);
    const balance = await contract.methods.balanceOf(address).call();
    const decimals = await contract.methods.decimals().call();
    return balance/Math.pow(10, decimals);
}

async function getNFT(address: string, contractAddress: string) : Promise<{ [tokenId:number]: number }> {
    const contract = new web3.eth.Contract(erc721ABI, contractAddress);
    const transferFromEvents : any[] = await contract.getPastEvents("Transfer",
        { 
            fromBlock: 0,
            filter: { from: address },
        }
    );
    const transferToEvents : any[] = await contract.getPastEvents("Transfer",
        {
            fromBlock: 0,
            filter: { to: address },
        }
    );
    const dict : { [tokenId:number]: number } = {};
    transferToEvents.forEach(
        (event) => {
            const tokenId:number = event.returnValues.tokenId;
            if (dict[tokenId]){
                dict[tokenId] ++;
            }
            else{
                dict[tokenId] = 1;
            }
        }
    );
    transferFromEvents.forEach(
        (event) => {
            const tokenId:number = event.returnValues.tokenId;
                dict[tokenId] --;
        }
    );
    return dict;
}

async function getNFTBalance(address: string, contractAddress: string) : Promise<number> {
    const contract = new web3.eth.Contract(erc721ABI, contractAddress);
    const balance = await contract.methods.balanceOf(address).call();
    return balance;
}

async function main() {
    
    ////////////////////////////
    // Get chain info and balance
    ////////////////////////////
    console.log('chain Id: ' + await getChainId());
    console.log('network Id: ' + await getNetworkId());
    console.log('block number: ' + await getBlockNumber());
    console.log('balance: ' + await getBalance(config.accountaddress));

    ////////////////////////////
    // Get token info and balance
    ////////////////////////////
    console.log('weth balance: ' + await getTokenBalance(config.accountaddress, config.tokenaddress));
    console.log('token name: ' + await getTokenName(config.tokenaddress));
    console.log('token decimals: ' + await getTokenDecimals(config.tokenaddress));
    console.log('token symbol: ' + await getTokenSymbol(config.tokenaddress));
    
    ////////////////////////////
    // Get NFT info and balance
    ////////////////////////////
    console.log('NFT balance: ' + await getNFTBalance(config.accountaddress, config.nftaddress));
    console.log('NFT tokenId: ' + JSON.stringify(await getNFT(config.accountaddress, config.nftaddress)));
    console.log('NFT tokenId: ' + JSON.stringify(await getNFT(config.anotheraddress, config.nftaddress)));


    ///////////////////////////////////////
    // send tx
    ///////////////////////////////////////
    const mnemonic = config.mnemonic;    
    const privateKey = ethers.Wallet.fromMnemonic(mnemonic).privateKey;

    
    const nonce = await web3.eth.getTransactionCount(config.accountaddress, 'latest');
    // Refer to https://web3js.readthedocs.io/en/v1.2.11/web3-eth-accounts.html#signtransaction for more parameters
    const transaction = {
        'to': config.toaddress,
        'value': 10000,
        'nonce': nonce,
        'gas': 30000, //Gas Limit provided by sender
       };
       const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);
       web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error: any, hash: any) {
       if (!error) {
         console.log("tx sent successfully",hash);
       } else {
         console.log("tx error", error);
       }
    });
    
    ///////////////////////////////////////
    // send token
    ///////////////////////////////////////
    /*
    const myContract = new web3.eth.Contract(erc20ABI, config.tokenaddress, { from: config.accountaddress});
    const amount = 1;
    let data = myContract.methods.transfer(config.toaddress, amount).encodeABI();
    
    const tokenTransaction = {
        gas: web3.utils.toHex(100000),
        "data": data,
        "from": config.accountaddress,
        "to": config.tokenaddress
    }
    const signedTokenTx = await web3.eth.accounts.signTransaction(tokenTransaction, privateKey);
    web3.eth.sendSignedTransaction(signedTokenTx.rawTransaction, function(error: any, hash: any) {
    if (!error) {
      console.log("token sent successfully",hash);
    } else {
      console.log("token sent error", error);
    }
    });*/
}
main();
