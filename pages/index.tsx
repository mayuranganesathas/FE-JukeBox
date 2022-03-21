import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import "tailwindcss/tailwind.css";
import Block from "../components/ui/Block";
import Footer from "../components/footer/Footer";
import { ethers } from "ethers";
import abi from "../utils/JukeBoxData.json";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { useRouter } from "next/router";
import { BlockDummyData } from "../pages/api/dummyData";
declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export interface HomeTypes {}
export const Home = ({}: HomeTypes) => {
  const [currentAccount, setCurrentAccount] = useState("");
  //Spotify raw song link is submitted
  const [submitLink, setSubmitLink] = useState("");
  const [spotifyResponse, setSpotifyResponse] = useState({});
  const contractAddress = "0x8DeeC618262Fa586293E20B4400505b2a6598fF3";
  const contractABI = abi.abi;
  const playSong = () => {
    return null;
  };
  const playButton = () => {
    return null;
  };
  const accessToken = `Bearer BQCiSLftRweU6bvRaHpsQ68IwVWp3mAw16oNR2V8XdrnsQjPs8V9LO7C8us3kqAGskjDZ5e0KS47 -
   GFvKeBZFJjH6MQJJEw0tHnvnQPnAOnlpJMjyhlDxwYCrto66FFiG8cs9e7x41vECa54`;
  // Fetches spotify data and stores in relevant object

  // const fetchSpotifyData = async () => {
  //   await fetch(`https://open.spotify.com/track/15OlC497ScJt9N2BS8lOev`, {
  //     method: "GET",
  //     headers: {
  //       " Accept": "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `${accessToken}`,
  //     },
  //   })
  //     .then((data) => {
  //       console.log("Success:", data);
  //       setSpotifyResponse(data);
  //     })
  //     .catch((error) => {
  //       console.log("NOT WORKING", error);
  //     });
  // };

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
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

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
      console.log("NOT WORKING", error);
    }
  };

  const submitLinkForm = () => {
    // submitSong();
    // fetchSpotifyData();
    // setSubmitLink("");
  };

  // const submitSong = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (ethereum) {
  //       const provider = new ethers.providers.Web3Provider(ethereum as any);
  //       const signer = provider.getSigner();
  //       const jukeBoxContract = new ethers.Contract(
  //         contractAddress,
  //         contractABI,
  //         signer
  //       );

  //       let linkTxn = await jukeBoxContract.jukeBoxPlay(submitLink);
  //       let linkHistory = await jukeBoxContract.getJukeBoxData();

  //       console.log("Mining...", linkTxn.hash);

  //       await linkTxn.wait();
  //       console.log("Mined!", linkTxn.hash);
  //       console.log(JSON.stringify(linkHistory));
  //     } else {
  //       console.log("Ethereum object doesn't exist!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="flex-col	">
      {JSON.stringify(spotifyResponse + "test" + submitLink)}
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
        <Block
          backgroundImageSrc={BlockDummyData.backgroundImageSrc}
          songTitle={BlockDummyData.songTitle}
          artistName={BlockDummyData.artistName}
          transactionId={BlockDummyData.transactionId}
          playButton={() => BlockDummyData.playButton()}
        />{" "}
      </div>
      <div className="flex">
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
        <Block
          backgroundImageSrc={BlockDummyData.backgroundImageSrc}
          songTitle={BlockDummyData.songTitle}
          artistName={BlockDummyData.artistName}
          transactionId={BlockDummyData.transactionId}
          playButton={() => BlockDummyData.playButton()}
        />{" "}
      </div>
    </div>
  );
};

export default Home;
