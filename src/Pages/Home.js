import React, { useEffect, useState } from "react";
import Web3 from "web3";
import abi from "./abi.json";

function Home() {
  const [web3, setWeb3] = useState("");
  const [addr, setAddr] = useState("");
  const [instance, setInstance] = useState(null);
  const [mintNumber, setMintNumber] = useState(1);
  const [checkNetwork, setCheckNetwork] = useState("");
  const [checkMintedNumber, setCheckMintNumber] = useState("");
  const [walletConnected, setWalletConnected] = useState("");

  useEffect(() => {
    let web3 = new Web3(Web3.givenProvider);
    setWeb3(web3);

    const ins = new web3.eth.Contract(
      abi,
      "0x04015E8E7380F2e8f672875D9Ba8FFD76B6183cC"
    );

    setInstance(ins);
  }, []);

  const checkWallet = async () => {
    let add = await web3.eth.getAccounts();
    console.log(add[0]);
    setAddr(add[0]);
  };

  const mint = async () => {
    if (addr) {
      if (instance) {
        if (mintNumber >= 1 && mintNumber <= 10) {
          console.log(
            await instance.methods.mainSaleBuy(mintNumber).send({
              from: addr,
              value: (
                (await instance.methods.cost().call()) * mintNumber
              ).toString(),
            })
          );
        } else {
          setCheckMintNumber(
            "invalid mint number. mint number between 1 and 10"
          );
        }
      } else {
        console.log("error");
      }
    } else {
      setWalletConnected("Please Connect your wallet");
      alert("Please Connect your wallet");
    }
  };

  const plus = () => {
    if (mintNumber < 10) setMintNumber(mintNumber + 1);
  };

  const minus = () => {
    if (mintNumber > 1) {
      setMintNumber(mintNumber - 1);
    }
  };

  return (
    <div>
      <h1>This is Home Page</h1>
      <div className="">
        <div className="button-mint d-flex justify-content-center">
          <button className="minus mr-3" onClick={minus}>
            -
          </button>
          <div className="display-number d-flex justify-content-center align-items-center">
            <span className="number">{mintNumber}</span>
          </div>
          <button className="plus ml-3" onClick={plus}>
            +
          </button>
        </div>
        <div className="mintnowdiv text-center mt-5">
          <button onClick={mint} className="cusbtn">
            Mint Now
          </button>
        </div>
      </div>

      <button onClick={checkWallet}>checkwallet</button>
    </div>
  );
}

export default Home;
