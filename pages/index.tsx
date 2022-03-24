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

interface SpotifyData {
  album: any;
  name: any;
  artists: any;
  songLink: any;
}

export interface HomeTypes {}
export const Home = ({}: HomeTypes) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [submitLink, setSubmitLink] = useState("");
  const [spotifyResponse, setSpotifyResponse] = useState<SpotifyData>({
    album: "",
    name: "",
    artists: [""],
    songLink: "",
  });
  const contractAddress = "0x8DeeC618262Fa586293E20B4400505b2a6598fF3";
  const contractABI = abi.abi;
  //object to be sent to the smart contract
  let spotifySongOb = {
    albumImage: "", // holds place for album image
    songTitle: "", //holds place for song title
    artistName: "", //holds place for artist name
    songLink: "",
  };

  //TODO: PLAY SONG WHEN PLAY BUTTON IS CLICKED
  const playSong = () => {
    return null;
  };
  const playButton = () => {
    return null;
  };

  const spotifyIdParser = () => {
    try {
      let spotifyId = new URL(submitLink);
      return spotifyId.pathname.split("track/").slice(1);
    } catch (error) {
      console.log(error);
      alert(
        "Incorrect Spotify Link, Try ` https://open.spotify.com/track/15OlC497ScJt9N2BS8lOev?si=f99d587b90644e30` "
      );
    }
  };
  // TODO https://developer.spotify.com/documentation/general/guides/authorization/code-flow/

  //Fetches spotify data and stores in response state variable
  const fetchSpotifyData = async () => {
    await fetch(`https://api.spotify.com/v1/tracks/${spotifyIdParser()}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${process.env.NEXT_PUBLIC_SPOTIFY_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setSpotifyResponse(data);
        spotifySongOb.albumImage = spotifyResponse.album.images[0].url;
        spotifySongOb.songTitle = spotifyResponse.name;
        spotifySongOb.artistName = spotifyResponse.artists[0].name;
        spotifySongOb.songLink = submitLink;
      })
      .catch((error) => {
        alert(
          "Incorrect Spotify Link, Try ` https://open.spotify.com/track/15OlC497ScJt9N2BS8lOev?si=f99d587b90644e30` "
        );
        console.log(error);
      });
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
      window.Error("Not Working");
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

  const submitLinkForm = async () => {
    await fetchSpotifyData();
    await submitSong(spotifySongOb);
    setSubmitLink("");
  };

  // TODO: PASS DATA FROM FETCH REQ TO submitSong() to store in contract

  const submitSong = async (songObj: {}) => {
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

        let linkTxn = await jukeBoxContract.jukeBoxPlay(songObj);
        let linkHistory = await jukeBoxContract.getJukeBoxData();

        console.log("Mining...", linkTxn.hash);

        await linkTxn.wait();
        console.log("Mined!", linkTxn.hash);
        console.log(JSON.stringify(linkHistory));
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //TODO: Refresh page after new addition of song
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
        {/* TODO: Pull data from contract and  map/populate blocks */}
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
      </div>
    </div>
  );
};

export default Home;
