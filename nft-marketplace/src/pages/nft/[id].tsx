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

