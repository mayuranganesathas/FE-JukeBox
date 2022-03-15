import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Title from "../components/Title";
import "tailwindcss/tailwind.css";
import Block from "../components/ui/Block";
import Footer from "../components/footer/Footer";
import ethers from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export interface HomeTypes {}

export const Home = ({}: HomeTypes) => {
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
    } finally {
    }
  };

  return (
    <div className="flex-col	">
      <div className="text-center ">
        <Title />
      </div>
      <div className="text-center justify-center">
        <Block playButton={playSong} />{" "}
      </div>
      <div className="bg-gray-500 w-full h-full">
        <Footer />
        <Block playButton={playButton} />{" "}
      </div>
    </div>
  );
};

export default Home;
