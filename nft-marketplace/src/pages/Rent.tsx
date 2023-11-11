import { ConnectWallet, MediaRenderer, ThirdwebNftMedia, useAddress, useContract, useContractRead, useNFT } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Layout from "@/layout/Layout"

const Home: NextPage = () => {
    const address = useAddress ();
    const contractAddress = "0x1f3cc10bFE31b92E4BA1b60142190162376cb08b";
    const { contract } = useContract (contractAddress);
    const { data: nft } = useNFT (contract, 0);
    const { data: userAddress, isLoading: userLoading } = useContractRead (contract, "userOf", [0]);
    const { data: ownerAddress, isLoading: OwnerLoading } = useContractRead (contract, "ownerOf", [0] );

    let message = "";

    if(address == ownerAddress) {
        message = "You are the owner of this NFT"
    } else if (address == userAddress) {
        message = "You have user access to this NFT"
    }else {
    message = "You do not have access to this NFT"
    }

    return (
        <Layout>
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-2xl">
            <main>
                <ConnectWallet/>
                <br />
                {userLoading && OwnerLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <center>
                            <MediaRenderer
                            src = {nft?.metadata.image}
                            height="100px"
                            width="100px"
                            />
                            <p>owner: {ownerAddress}</p>
                            <p>{message}</p>
                        </center>
                    </div>
                )}
            </main>
            </div>
        </Layout>
    );
}

export default Home