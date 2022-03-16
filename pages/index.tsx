import React, { useState } from "react";
import Title from "../components/Title";
import "tailwindcss/tailwind.css";
import Block from "../components/ui/Block";
import Footer from "../components/footer/Footer";
import { ethers } from "ethers";
import abi from "../utils/JukeBoxData.json";
import { MetaMaskInpageProvider } from "@metamask/providers";
declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export interface HomeTypes {}
export const Home = ({}: HomeTypes) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [submitLink, setSubmitLink] = useState("");
  const contractAddress = "0x8DeeC618262Fa586293E20B4400505b2a6598fF3";
  const contractABI = abi.abi;
  const playSong = () => {
    return null;
  };
  const playButton = () => {
    return null;
  };

  //Checks if wallet is connected to MetaMask
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts: any = await ethereum.request({ method: "eth_accounts" });
      if (accounts == null || accounts == undefined) {
        console.log("No authorized account found");
      } else if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts: any = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const submitLinkForm = () => {
    submitSong();
    setSubmitLink("");
  };

  const submitSong = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        const signer = provider.getSigner();
        const jukeBoxContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let linkTxn = await jukeBoxContract.jukeBoxPlay(submitLink);
        console.log("Mining...", linkTxn.hash);

        await linkTxn.wait();
        console.log("Mined!", linkTxn.hash);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-col	">
      <div className="text-center ">
        <Title />
      </div>
      {!currentAccount && (
        <button
          className="bg-yellow-300 p-2 rounded-xl text-center flex justify-center"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
      <div className="text-center justify-center">
        <Block playButton={playSong} />{" "}
        <input
          className="bg-gray-200"
          placeholder="Input Spotify Link"
          type="text"
          onChange={(e) => setSubmitLink(e.target.value)}
        />
        <button
          className="bg-yellow-300 p-2 rounded-xl text-center flex justify-center"
          onClick={submitLinkForm}
        >
          {" "}
          Submit{" "}
        </button>
      </div>
      <div className="bg-gray-500 w-full h-full">
        <Footer />
        <Block playButton={playButton} />{" "}
      </div>
    </div>
  );
};

export default Home;
