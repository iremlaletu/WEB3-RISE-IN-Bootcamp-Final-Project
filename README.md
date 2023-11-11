# FINAL PROJECT == still working on it
- This is a decentralized application. Built on the Chiliz Spicy testnet with thirdweb
- The ultimate project centers around the concept of RENTALABLE NFTs. As the NFT owner, you possess the capability to issue and allocate the NFT to a user for a specified duration. You have the flexibility to establish an expiration date, and once that date is reached, the user's access to the NFT will cease. Our framework for this functionality will be based on the ERC-4907 smart contract from Thirdweb/

## Configuration Process
- Clone this project and follow these steps to properly configure your environment for the application.

### Step 1: Environment File Setup
- Navigate to the root directory of the project, ensuring you are at the top-level (same level as the src directory, not within it).
- Create a new file and name it .env.local. This file will store important global settings required for the application to function correctly.

### Step 2: Environment Variables
- Populate the .env.local file with the necessary environment variables. These are crucial for linking the application with your specific resources on Thirdweb. Below is a list of the required variables:

- * NEXT_PUBLIC_CLIENT_ID: Your unique client identifier from Thirdweb. You can find this by logging into your account, navigating to "Settings," then "API Keys," and selecting your key to view the clientID.
- * NEXT_PUBLIC_NETWORK = "SpicyChain"
- * NEXT_PUBLIC_NFT_CONTRACT_ADDRESS: The address corresponding to your smart contract.
- * NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS: The address corresponding to your smart contract

### Step 3: Dependency Installation
- Execute the following command in your terminal to install the project dependencies:

```bash
npm install
```
npm install

### Step 4: Launching the Development Server
- To start the development server, run:

```bash
npm run dev
```

### DEMO
