import React, { useEffect, useState } from 'react'
import Web3Modal from 'web3modal';
import { ethers } from "ethers";


//internal import
import { CrowdFundingABI, CrowdFundingAddress } from './contants';

//fetching smart contract
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");


    const createCampaign = async (campaign) => {
        const { title, description, amount, deadline } = campaign;
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        console.log("current account",currentAccount);

        try {
            const transaction = await contract.createCampaign(
                currentAccount, //owner
                title, //title
                description, //description
                ethers.utils.parseUnits(amount, 18),
                new Date(deadline).getTime() //deadline,
            );
            await transaction.wait();
            console.log("contract call success", transaction);
            
        } catch (err) {
            console.log("contract call failed", err);
        }
    };

    const getCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const campaigns = await contract.getNumberOfCampaigns();

        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i,
        }));
        return parsedCampaigns;
    };

    const getUserCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const allCampaigns = await contract.getNumberOfCampaigns();

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })
        const currentUser = accounts[0];
        console.log(currentUser);
        const filteredCampaigns = allCampaigns.filter(
            (campaign) =>
                campaign.owner === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        );

        const userData = filteredCampaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i,
        }))
        return userData;
    };

    const donate = async (pId, amount) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const campaignData = await contract.donateToCampaign(pId, {
            value: ethers.utils.parseEther(amount),
        });
        await campaignData.wait();
        location.reload();
        return campaignData;
    };


    const getDonations = async (pId) => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                amount: ethers.utils.formatEther(donations[1][i].toString()),
            });
        }
        return parsedDonations;
    }

    //check if the wallet is connected
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum)
                return setOpenError(true), setError("install metamask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No account found");
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        checkIfWalletConnected();

    }, [])

    //connect wallet function
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return console.log("Install metamask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentAccount(accounts[0]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <CrowdFundingContext.Provider
            value={{
                titleData,
                currentAccount,
                connectWallet,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    )
}












