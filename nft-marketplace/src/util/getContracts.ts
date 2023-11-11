import { useContract } from "@thirdweb-dev/react";
import { getMarketplaceAddress, getNFTAddress, getKeyContractAddress } from "./getContractAddress";

export const getMarketplaceContract = () => {
    let market_address = getMarketplaceAddress();

    const { contract: marketplace, isLoading: marketplaceLoading } =
        useContract(market_address, "marketplace-v3");

    return { marketplace, marketplaceLoading };
};

export const getNFTContract = () => {
    const nft_address = getNFTAddress();
    const { contract: nft_contract, isLoading: nftLoading } =
        useContract(nft_address);
    return { nft_contract, nftLoading };
};

export const getRentKeyContract = () => {
    const key_address = getKeyContractAddress();
    const { contract: key_contract, isLoading: keyLoading } =
        useContract(key_address);
    return { key_contract, keyLoading };
};