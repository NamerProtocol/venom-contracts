import { Address, toNano, WalletTypes } from "locklift";
const nftItemABI = require("../build/NameNft.abi.json");

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const nftArtifacts = await locklift.factory.getContractArtifacts("NameNft");
  const indexArtifacts = await locklift.factory.getContractArtifacts("Index");
  const indexBasisArtifacts = await locklift.factory.getContractArtifacts("IndexBasis");

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
    value: locklift.utils.toNano(1),
  });

  console.log(`Collection deployed at: ${contract.address.toString()}`);
  const everWalletAccount = await locklift.factory.accounts.addExistingAccount({
    address: new Address("0:fefdc5af29bd72bdb3d33ce54766b42b8c4280416aba93017754092fa27baf06"),
    type: WalletTypes.EverWallet,
  });
  console.log(`Minting from: ${everWalletAccount.address}`);

  const { count: id } = await contract.methods.totalSupply({ answerId: 0 }).call();
  await contract.methods.mintNft({ root: contract.address, name: "testname", hPrice: toNano(15), json: `{"name":"hello world"}` }).send({ from: everWalletAccount.address, amount: toNano(10) });
  const { nft: nftAddress } = await contract.methods.nftAddress({ answerId: 0, id: id }).call();

  console.log(`NFT: ${nftAddress.toString()}`);
  console.log(`NFT: ${nftAddress.toString()}`);
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
        .getInfo({ answerId: 0 } as never)
        .call());
      console.log(getJsonAnswer.owner._address);

      const getNameAnswer = (await (nftItemContract.methods as any)
        .getName({ answerId: 0 } as never)
        .call());
      console.log(`Domain name: ${JSON.stringify(getNameAnswer.value0)}`);
    }
  }


}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });



