getContractAddress = function(callback) {
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source like Metamask")
            // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    console.log(web3.isConnected());
    web3.version.getNetwork(function(error, result) {
        if (error != null) {
            console.log('Unknown network');
            user_contract_addr = '';
            asset_contract_addr = '';
            auction_contract_addr = '';
            error = "Failed to load ethereum network and smart contract";
        } else {
            user_contract_addr = '0xa2972828820d2781ec5cfde627cc37ea6f8858dd';
            asset_contract_addr = '0xaae9eedf707340af01f01e66a13dca0dbc9f6542';
            auction_contract_addr = '0xc9336295f30f9fd1a7d8e9af2cfdb7438a85d9ae';
        }

        UserRecord = web3.eth.contract([{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }, { "name": "_userEmail", "type": "string" }, { "name": "_password", "type": "string" }], "name": "createUser", "outputs": [{ "name": "_creation", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_userEmail", "type": "string" }, { "name": "_assetId", "type": "uint8" }], "name": "addAsset", "outputs": [{ "name": "_success", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_userEmail", "type": "string" }, { "name": "_balance", "type": "uint8" }], "name": "addBalance", "outputs": [{ "name": "_success", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_userEmail", "type": "string" }, { "name": "_balance", "type": "uint8" }], "name": "deductBalance", "outputs": [{ "name": "_success", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_userEmail", "type": "string" }], "name": "getAssets", "outputs": [{ "name": "_assets", "type": "uint8[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_userEmail", "type": "string" }], "name": "getUserName", "outputs": [{ "name": "_name", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_userEmail", "type": "string" }], "name": "getUserPassword", "outputs": [{ "name": "_name", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_userEmail", "type": "string" }], "name": "getBalance", "outputs": [{ "name": "_totalBalance", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_userEmail", "type": "string" }, { "name": "_password", "type": "string" }], "name": "isValidPassword", "outputs": [{ "name": "_valid", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }]);
        AssetRecord = web3.eth.contract([{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "assetId", "type": "uint8" }, { "indexed": false, "name": "assetName", "type": "string" }, { "indexed": false, "name": "ownedBy", "type": "string" }, { "indexed": false, "name": "category", "type": "uint8" }], "name": "AssetCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "assetId", "type": "uint8" }, { "indexed": false, "name": "owner", "type": "string" }, { "indexed": false, "name": "newOwner", "type": "string" }, { "indexed": false, "name": "category", "type": "uint8" }], "name": "AssetOwnerChnaged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "assetId", "type": "uint8" }, { "indexed": false, "name": "owner", "type": "string" }, { "indexed": false, "name": "category", "type": "uint8" }], "name": "AssetUnsold", "type": "event" }, { "constant": false, "inputs": [{ "name": "_assetName", "type": "string" }, { "name": "_ownedBy", "type": "string" }], "name": "createAsset", "outputs": [{ "name": "_assetID", "type": "uint8" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_assetId", "type": "uint8" }, { "name": "_newOwner", "type": "string" }], "name": "setOwner", "outputs": [{ "name": "_success", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_assetId", "type": "uint8" }], "name": "setAssetUnsold", "outputs": [{ "name": "_success", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "getAssetID", "outputs": [{ "name": "_assetId", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_assetId", "type": "uint8" }], "name": "getAssetName", "outputs": [{ "name": "_commaSeparatedAsset", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_assetId", "type": "uint8" }], "name": "getOwner", "outputs": [{ "name": "_ownedBy", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }]);
        AuctionRecord = web3.eth.contract([{ "constant": true, "inputs": [{ "name": "", "type": "uint8" }], "name": "auctions", "outputs": [{ "name": "auctionId", "type": "uint8" }, { "name": "assetName", "type": "string" }, { "name": "assetId", "type": "uint8" }, { "name": "assetOwner", "type": "string" }, { "name": "basePrice", "type": "uint8" }, { "name": "auctionExpiry", "type": "uint256" }, { "name": "currentBid", "type": "uint8" }, { "name": "currentBidder", "type": "string" }, { "name": "status", "type": "uint8" }, { "name": "result", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "auctionId", "type": "uint8" }, { "indexed": false, "name": "assetName", "type": "string" }, { "indexed": false, "name": "ownedBy", "type": "string" }, { "indexed": false, "name": "basePrice", "type": "uint8" }, { "indexed": false, "name": "expiry", "type": "uint256" }], "name": "AuctionCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "auctionId", "type": "uint8" }, { "indexed": false, "name": "assetName", "type": "string" }, { "indexed": false, "name": "owner", "type": "string" }, { "indexed": false, "name": "previousBid", "type": "uint256" }, { "indexed": false, "name": "previousBidder", "type": "string" }, { "indexed": false, "name": "currentBid", "type": "uint256" }, { "indexed": false, "name": "currentBidder", "type": "string" }], "name": "AuctionBidPlaced", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "auctionId", "type": "uint8" }, { "indexed": false, "name": "assetId", "type": "uint8" }, { "indexed": false, "name": "owner", "type": "string" }, { "indexed": false, "name": "basePrice", "type": "uint256" }, { "indexed": false, "name": "currentPrice", "type": "uint256" }, { "indexed": false, "name": "currentBidder", "type": "string" }, { "indexed": false, "name": "status", "type": "uint8" }, { "indexed": false, "name": "result", "type": "uint8" }], "name": "AuctionClosed", "type": "event" }, { "constant": false, "inputs": [{ "name": "_assetId", "type": "uint8" }, { "name": "_assetName", "type": "string" }, { "name": "_assetOwner", "type": "string" }, { "name": "_basePrice", "type": "uint8" }, { "name": "_auctionExpiry", "type": "uint256" }], "name": "createAuction", "outputs": [{ "name": "_auctionID", "type": "uint8" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_auctionId", "type": "uint8" }], "name": "closeAuction", "outputs": [{ "name": "sucess", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_auctionId", "type": "uint8" }, { "name": "_bid", "type": "uint8" }, { "name": "_bidder", "type": "string" }], "name": "placeBid", "outputs": [{ "name": "_bidPlaced", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "getAuctionID", "outputs": [{ "name": "_auctionId", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_auctionId", "type": "uint8" }], "name": "getAuctionStatus", "outputs": [{ "name": "_auctionStatus", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_auctionId", "type": "uint8" }, { "name": "bidder", "type": "string" }], "name": "getAuction", "outputs": [{ "name": "_assetId", "type": "uint8" }, { "name": "_assetName", "type": "string" }, { "name": "_assetOwner", "type": "string" }, { "name": "_basePrice", "type": "uint8" }, { "name": "_currentBid", "type": "uint8" }, { "name": "_currentBidder", "type": "string" }, { "name": "_auctionExpiry", "type": "uint256" }, { "name": "_submitBid", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }]);


        console.log("network id: " + result);
        console.log("user record contract addr: " + user_contract_addr);
        console.log("assest record contract addr: " + asset_contract_addr);
        console.log("auction record contract addr: " + auction_contract_addr);

        callback(user_contract_addr, asset_contract_addr, auction_contract_addr, error);

    });
};