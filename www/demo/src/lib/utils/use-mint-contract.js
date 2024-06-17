import { ethers } from "ethers";
import abi from "../../../abi/Bottle-Token.abi.json";

/** @type {string} */
const contractAddress = "0x986796bd24f06c6ae28b6397f8ea53cfb39c6b0b";

/** @type {ethers.InterfaceAbi} */
const contractAbi = abi;

export const useMintContract = async (gs1barcode, account, provider) => {
    if (gs1barcode) {
        const signer = await provider.getSigner(account);
        const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
        );
        return contract.mintByApprove(gs1barcode, {
            gasLimit: 130000,
        });
    } else {
        throw new Error('barcode is empty')
    }
}

export const useGetBottle = async (account, provider) => {
    const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
    );
    return contract.balanceOf(account, {
        gasLimit: 100000,
    });
}