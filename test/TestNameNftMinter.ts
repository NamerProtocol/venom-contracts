import { expect } from "chai";
import { Address, Contract, Signer, toNano, WalletTypes } from "locklift";
import { FactorySource } from "../build/factorySource";
const nftItemABI = require("../build/NameNft.abi.json");
// let NameNftMinter: Contract<FactorySource["NameNFT"]>;
let signer: Signer;
// const nftItemABI = {
//   "ABI version": 2,
//   "version": "2.2",
//   "header": ["pubkey", "time", "expire"],
//   "functions": [
//     {
//       "name": "constructor",
//       "inputs": [
//         { "name": "owner", "type": "address" },
//         { "name": "sendGasTo", "type": "address" },
//         { "name": "remainOnNft", "type": "uint128" },
//         { "name": "json", "type": "string" },
//         { "name": "codeIndex", "type": "cell" },
//         { "name": "indexDeployValue", "type": "uint128" },
//         { "name": "indexDestroyValue", "type": "uint128" }
//       ],
//       "outputs": [
//       ]
//     },
//     {
//       "name": "indexCode",
//       "inputs": [
//         { "name": "answerId", "type": "uint32" }
//       ],
//       "outputs": [
//         { "name": "code", "type": "cell" }
//       ]
//     },
//     {
//       "name": "indexCodeHash",
//       "inputs": [
//         { "name": "answerId", "type": "uint32" }
//       ],
//       "outputs": [
//         { "name": "hash", "type": "uint256" }
//       ]
//     },
//     {
//       "name": "resolveIndex",
//       "inputs": [
//         { "name": "answerId", "type": "uint32" },
//         { "name": "collection", "type": "address" },
//         { "name": "owner", "type": "address" }
//       ],
//       "outputs": [
//         { "name": "index", "type": "address" }
//       ]
//     },
//     {
//       "name": "getJson",
//       "inputs": [
//         { "name": "answerId", "type": "uint32" }
//       ],
//       "outputs": [
//         { "name": "json", "type": "string" }
//       ]
//     },
//     {
//       "name": "transfer",
//       "inputs": [
//         { "name": "to", "type": "address" },
//         { "name": "sendGasTo", "type": "address" },
//         { "components": [{ "name": "value", "type": "uint128" }, { "name": "payload", "type": "cell" }], "name": "callbacks", "type": "map(address,tuple)" }
//       ],
//       "outputs": [
//       ]
//     },
//     {
//       "name": "changeOwner",
//       "inputs": [
//         { "name": "newOwner", "type": "address" },
//         { "name": "sendGasTo", "type": "address" },
//         { "components": [{ "name": "value", "type": "uint128" }, { "name": "payload", "type": "cell" }], "name": "callbacks", "type": "map(address,tuple)" }
//       ],
//       "outputs": [
//       ]
//     },
//     {
//       "name": "changeManager",
//       "inputs": [
//         { "name": "newManager", "type": "address" },
//         { "name": "sendGasTo", "type": "address" },
//         { "components": [{ "name": "value", "type": "uint128" }, { "name": "payload", "type": "cell" }], "name": "callbacks", "type": "map(address,tuple)" }
//       ],
//       "outputs": [
//       ]
//     },
//     {
//       "name": "getInfo",
//       "inputs": [
//         { "name": "answerId", "type": "uint32" }
//       ],
//       "outputs": [
//         { "name": "id", "type": "uint256" },
//         { "name": "owner", "type": "address" },
//         { "name": "manager", "type": "address" },
//         { "name": "collection", "type": "address" }
//       ]
//     },
//     {
//       "name": "supportsInterface",
//       "inputs": [
//         { "name": "answerId", "type": "uint32" },
//         { "name": "interfaceID", "type": "uint32" }
//       ],
//       "outputs": [
//         { "name": "value0", "type": "bool" }
//       ]
//     }
//   ],
//   "data": [
//     { "key": 1, "name": "_id", "type": "uint256" }
//   ],
//   "events": [
//     {
//       "name": "NftCreated",
//       "inputs": [
//         { "name": "id", "type": "uint256" },
//         { "name": "owner", "type": "address" },
//         { "name": "manager", "type": "address" },
//         { "name": "collection", "type": "address" }
//       ],
//       "outputs": [
//       ]
//     },
//     {
//       "name": "OwnerChanged",
//       "inputs": [
//         { "name": "oldOwner", "type": "address" },
//         { "name": "newOwner", "type": "address" }
//       ],
//       "outputs": [
//       ]
//     },
//     {
//       "name": "ManagerChanged",
//       "inputs": [
//         { "name": "oldManager", "type": "address" },
//         { "name": "newManager", "type": "address" }
//       ],
//       "outputs": [
//       ]
//     },
//     {
//       "name": "NftBurned",
//       "inputs": [
//         { "name": "id", "type": "uint256" },
//         { "name": "owner", "type": "address" },
//         { "name": "manager", "type": "address" },
//         { "name": "collection", "type": "address" }
//       ],
//       "outputs": [
//       ]
//     }
//   ],
//   "fields": [
//     { "name": "_pubkey", "type": "uint256" },
//     { "name": "_timestamp", "type": "uint64" },
//     { "name": "_constructorFlag", "type": "bool" },
//     { "name": "_supportedInterfaces", "type": "optional(cell)" },
//     { "name": "_id", "type": "uint256" },
//     { "name": "_collection", "type": "address" },
//     { "name": "_owner", "type": "address" },
//     { "name": "_manager", "type": "address" },
//     { "name": "_json", "type": "string" },
//     { "name": "_indexDeployValue", "type": "uint128" },
//     { "name": "_indexDestroyValue", "type": "uint128" },
//     { "name": "_codeIndex", "type": "cell" }
//   ]
// }


describe("NameNFTMinter Test", async function () {
  before(async () => {
    signer = (await locklift.keystore.getSigner("0"))!;
  });
  describe("Deploy contract & mint Nft", async function () {
    it("Load contract factory", async function () {
      const nftMinter = locklift.factory.getContractArtifacts("NameNftMinter");
      const nftArtifacts = locklift.factory.getContractArtifacts("NameNft");
      const indexArtifacts = locklift.factory.getContractArtifacts("Index");
      const indexBasisArtifacts = locklift.factory.getContractArtifacts("IndexBasis");

      expect(nftMinter.code).not.to.equal(undefined, "nftMinter code should be available");
      expect(nftMinter.abi).not.to.equal(undefined, "nftMinter ABI should be available");
      expect(nftMinter.tvc).not.to.equal(undefined, "nftMinter tvc should be available");

      expect(nftArtifacts.code).not.to.equal(undefined, "nftArtifacts code should be available");
      expect(nftArtifacts.abi).not.to.equal(undefined, "nftArtifacts ABI should be available");
      expect(nftArtifacts.tvc).not.to.equal(undefined, "nftArtifacts tvc should be available");

      expect(indexArtifacts.code).not.to.equal(undefined, "indexArtifacts code should be available");
      expect(indexArtifacts.abi).not.to.equal(undefined, "indexArtifacts ABI should be available");
      expect(indexArtifacts.tvc).not.to.equal(undefined, "indexArtifacts tvc should be available");

      expect(indexBasisArtifacts.code).not.to.equal(undefined, "indexBasisArtifacts code should be available");
      expect(indexBasisArtifacts.abi).not.to.equal(undefined, "indexBasisArtifacts ABI should be available");
      expect(indexBasisArtifacts.tvc).not.to.equal(undefined, "indexBasisArtifacts tvc should be available");

      const { contract, tx } = await locklift.factory.deployContract({
        contract: "NameNftMinter",
        publicKey: signer.publicKey,
        initParams: {},
        constructorParams: {
          codeNft: nftArtifacts.code,
          codeIndex: indexArtifacts.code,
          codeIndexBasis: indexBasisArtifacts.code,
          json: `{"collection":"tutorial"}` // EXAMPLE...not by TIP-4.2
        },
        value: locklift.utils.toNano(5),
      });

      console.log(`Collection deployed at: ${contract.address.toString()}`);
      const { account } = await locklift.factory.accounts.addNewAccount({
        type: WalletTypes.WalletV3,
        value: toNano(1000),
        publicKey: signer.publicKey
      });
      console.log(`User account address: ${account.address}`);
      const balanceBefore = await locklift.provider.getBalance(account.address);
      console.log(`User balance BEFORE mint: ${balanceBefore}`);
      const collectionBalanceBefore = await locklift.provider.getBalance(contract.address);
      console.log(`Collection balance BEFORE mint: ${collectionBalanceBefore}`);

      const { count: id } = await contract.methods.totalSupply({ answerId: 0 }).call();
      //await contract.methods.mintNft({ root: contract.address, json: `{"name":"hello world"}` }).send({ from: account.address, amount: toNano(100) });
      const { traceTree } = await locklift.tracing.trace(contract.methods.mintNft({ root: contract.address, hPrice: toNano(15), name: "testname", json: `{"name":"hello world"}` }).send({ from: account.address, amount: toNano(10) }))
      // await traceTree?.beautyPrint()

      const { nft: nftAddress } = await contract.methods.nftAddress({ answerId: 0, id: id }).call();
      expect((await contract.methods.totalSupply({ answerId: 0 }).call()).count).to.equal("1");

      const balanceAfter = await locklift.provider.getBalance(account.address);
      console.log(`User balance AFTER mint: ${balanceAfter}`);
      const collectionBalanceAfter = await locklift.provider.getBalance(contract.address);
      console.log(`Collection balance AFTER mint: ${collectionBalanceAfter}`);

      console.log(`Balance CHANGE: ${locklift.utils.fromNano(Number.parseInt(balanceBefore) - Number.parseInt(balanceAfter))}`);
      console.log(`Collection balance CHANGE: ${locklift.utils.fromNano(Number.parseInt(collectionBalanceAfter) - Number.parseInt(collectionBalanceBefore))}`);

      console.log(`NFT: ${nftAddress.toString()}`);
      // set subdomain price
      const { traceTree: tt } = await locklift.tracing.trace(contract.methods.setSubDomainPrice({ domain: nftAddress, price: toNano(888) }).send({ from: account.address, amount: toNano(10) }))
      await tt?.beautyPrint()
      const { subPrice } = await contract.methods.getSubDomainPrice({ answerId: 0, domain: nftAddress }).call();
      console.log(`Subdomain price: ${subPrice}`);


      const { codeHash } = await contract.methods.nftCodeHash({ answerId: 0 } as never).call({ responsible: true });
      const nftCodeHash = BigInt(codeHash).toString(16);

      const addresses = await locklift.provider.getAccountsByCodeHash({
        codeHash: nftCodeHash,
      });

      //console.log(addresses);
      if (addresses.accounts) {
        for (let acc of addresses.accounts) {
          console.log(`trying ${acc}`);
          const nftItemContract = new locklift.provider.Contract(
            nftItemABI,
            acc,
          );
          const getJsonAnswer = (await (nftItemContract.methods as any)
            .getDomainInfo({ answerId: 0 } as never)
            .call());
          console.log(getJsonAnswer);

          const getNameAnswer = (await (nftItemContract.methods as any)
            .getName({ answerId: 0 } as never)
            .call());
          console.log(`Domain name: ${JSON.stringify(getNameAnswer.value0)}`);
        }
      }

    });

    // it("Deploy contract", async function () {
    //   const INIT_STATE = 0;
    //   const { contract } = await locklift.factory.deployContract({
    //     contract: "NameNftMinter",
    //     publicKey: signer.publicKey,
    //     initParams: {
    //       _nonce: locklift.utils.getRandomNonce(),
    //     },
    //     constructorParams: {
    //       _state: INIT_STATE,
    //     },
    //     value: locklift.utils.toNano(2),
    //   });
    //   sample = contract;

    //   expect(await locklift.provider.getBalance(sample.address).then(balance => Number(balance))).to.be.above(0);
    // });

    // it("Interact with contract", async function () {
    //   const NEW_STATE = 1;

    //   await sample.methods.setState({ _state: NEW_STATE }).sendExternal({ publicKey: signer.publicKey });

    //   const response = await sample.methods.getDetails({}).call();

    //   expect(Number(response._state)).to.be.equal(NEW_STATE, "Wrong state");
    // });
  });
});
