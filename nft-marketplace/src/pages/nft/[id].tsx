import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useNFT, useValidDirectListings, useAddress } from "@thirdweb-dev/react";

import Layout from "@/layout/Layout";
import NFTDetails from "@/components/NFTDetails";
import SellNFTCard from "@/components/SellNFTCard";
import CancelSellingCard from "@/components/CancelSelling";
import TransferNFTCard from "@/components/TransferNFTCard";
import { getMarketplaceContract, getNFTContract } from "@/util/getContracts";


function NFTDetailsPage() {
    const router = useRouter();
    const address = useAddress();
    const { nft_contract } = getNFTContract();
    const { marketplace } = getMarketplaceContract();
    const { data: directListings } = useValidDirectListings(marketplace, {
        start: 0,
        count: 100,
    });

    const [nftID, setNftID] = useState("");
    const [price, setPrice] = useState(0.01);
    const [symbol, setSymbol] = useState("");
    const [listingID, setListingID] = useState("");

    const { data: nft, isLoading: isNFTLoading } = useNFT(nft_contract, nftID);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const { id } = router.query;
            setNftID(id as string);
        }
        let listedNFT = directListings?.find((item) => item.tokenId === nftID);
        if (listedNFT) {
            setListingID(listedNFT.id);
            setPrice(Number(listedNFT.currencyValuePerToken.displayValue));
            setSymbol(listedNFT.currencyValuePerToken.symbol);
        }
    }, [directListings, price, listingID, router.query]);

    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    NFT Details
                </h1>
                {
                    isNFTLoading || !nft ? (
                        <div className="text-center">
                            {`Loading NFT with id ${nftID} `}
                        </div>
                    ) : (
                        <>
                            <NFTDetails {...nft} />
                            {
                                nft.owner === address && (
                                    <>
                                        <TransferNFTCard id={nftID} />
                                        {
                                            listingID ? (
                                                <CancelSellingCard
                                                    price={price}
                                                    symbol={symbol}
                                                    listingID={listingID}
                                                />
                                            ) : (
                                                <SellNFTCard
                                                    price={price}
                                                    onUpdatePrice={setPrice}
                                                    id={nftID}
                                                />
                                            )
                                        }
                                    </>
                                )
                            }
                        </>
                    )}
            </div>
        </Layout >
    );
}
export default NFTDetailsPage;

// here, we can actually show the details about NFT

// first start implementing the marketplace function

// when user clicks the nft s/he owns,is going to be directed to ID page.

// ID page will render the NFT details, under that if the nft isnt listed, we want to have a small card that lists the nft, if the list okay, we will another card that says cancel this listing. for that we have some UI components, first is in /NFTDetails, imported from @thirdweb-dev/sdk we are just going to be showing them based on the inputs that we getting

// when we get the actual detail about nft, we are calling "NFTDetail" functional components

