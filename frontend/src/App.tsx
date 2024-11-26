import React from "react";
import FetchProduct from "./component.ts/FetchProduct";
import WalletContextProvider from "./component.ts/connection";
import { CustomWalletMultiButton } from "./component.ts/connection";

const App: React.FC = () => {
  return (
    <WalletContextProvider>
      <div className="min-h-screen bg-gradient-to-br from-black via-brown to-black flex flex-col items-center justify-between p-6">
        <h1 className="text-3xl text-yellow text-center mb-6">
          ACKEE TASK 5::bookeeperApp
        </h1>
        <div className="p-6">
          <CustomWalletMultiButton />
        </div>
        <FetchProduct />
      </div>
    </WalletContextProvider>
  );
};

export default App;
