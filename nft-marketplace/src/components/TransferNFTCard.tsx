import React, { useState } from 'react';
import { useContract, useTransferNFT } from '@thirdweb-dev/react';
import { getNFTAddress } from '@/util/getContractAddress';

const TransferNFTCard= ({ id } : {id: string}) => {
    const [to, setTo] = useState("");
    const { contract } = useContract(getNFTAddress());
    const {
        mutateAsync: transferNFT,
        isLoading,
        error,
    } = useTransferNFT(contract);

    const handleAddresChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTo(event.target.value);
    };

    const handleTransfer = async () => {
        try {
            const data = await (transferNFT({to, tokenId: id}))
            alert(`Transfer successful to this address ,${data}`)
            if (to == "") {
                throw "Error Transfer Invalid Address!!"
            } 
        }catch(e) {
            alert ("Error Transfer Invalid Address!!")
        }
    };

    return (
        <div className="relative bg-gray-800 text-white p-6 rounded-lg w-full shadow-md mt-4">
            <h1 className="text-2xl font-semibold mb-2 ">Transfer NFT</h1>
            <div>
                <label className="font-bold text-xl">To:</label>
                <input
                    className="bg-gray-800 w-full outline-none p-2 border border-gray-700 rounded-lg"
                    placeholder="Recipient Address"
                    type="text"
                    value={to}
                    onChange={handleAddresChange}
                />
            </div>
            <button
                onClick={handleTransfer}
                className="mt-4 bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Transfer
            </button>
            {
                isLoading && (
                    <div className="text-center mt-4">Transfer in progress...</div>
                )
            }
            {
                error as unknown as boolean && (
                    <div className="text-center mt-4">Error!</div>
                )
            }
        </div>
    )
}
export default TransferNFTCard
