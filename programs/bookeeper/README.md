# **Bookeeper v2**  

Bookeeper is a decentralized application (dApp) built on the Solana blockchain. It enables users to record and view trade records, storing the data on-chain for transparency, immutability, and decentralization. The app features a modern frontend for easy interaction and a robust Anchor program for backend operations.  

---

## **How It Works**  
1. **Record a Trade**:  
   Users can input trade details, including:  
   - Item name (e.g., "Laptop")  
   - Price (e.g., "2 SOL")  
   - Timestamp (e.g., `1668454800`) is automatically set 

   The data is securely stored on the Solana blockchain.  

2. **View Trades**:  
   Users can fetch and view all recorded trades, including item names, prices, and human-readable timestamps, from the blockchain.  

3. **Technology Stack**:  
   - **Frontend**: React, TypeScript, TailwindCSS, hosted on Vercel.  
   - **Backend**: Solana blockchain, Anchor framework.  

---

## **Live Deployment**  

- **Frontend App**: [Bookeeper Live](https://bookeeperapp.vercel.app)  
- **Solana Program**: Deployed on Solana Devnet.  

---

## **Instructions**  

### **1. Build and Test the Anchor Program Locally**  
Follow these steps to build and test the Anchor program:  

#### **Prerequisites**  
- Install Rust:  
  ```bash  
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh  
  source $HOME/.cargo/env  
  ```  
- Install Anchor CLI:  
  ```bash  
  npm install -g @project-serum/anchor-cli  
  ```  
- Set up Solana CLI:  
  ```bash  
  solana config set --url https://api.devnet.solana.com  
  ```  

#### **Steps**  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/your-repo/bookeeper.git  
   cd bookeeper/programs/bookeeper  
   ```  

2. Build the program:  
   ```bash  
   anchor build  
   ```  

3. Deploy the program:  
   ```bash  
   anchor deploy  
   ```  

4. Run tests:  
   ```bash  
   anchor test  
   ```  

---

### **2. Run the Frontend Locally**  
Follow these steps if you want to run the frontend locally.  

#### **Prerequisites**  
- Node.js (v16 or later): Install from [Node.js website](https://nodejs.org/).  
- Install dependencies:  
   ```bash  
   cd frontend  
   npm install  
   ```  

#### **Steps**  
1. Start the development server:  
   ```bash  
   npm run dev  
   ```  

2. Open your browser and navigate to:  
   ```  
   http://localhost:5173  
   ```  

3. Ensure you have a wallet (e.g., Solflare) connected to interact with the app.  

---

## **Contributing**  
Feel free to submit issues or pull requests to improve Bookeeper!  

**Contact**: https://t.me/OrkarFabianTheWise  

---  
