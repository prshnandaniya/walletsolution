import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Web3Provider, useWeb3 } from "react-web3-modal";

const config = {
  supportedChainIds: [1, 3, 4, 5, 42, 100],
  connectors: {
    walletconnect: {
      rpc: {
        56: `https://bsc-dataseed.binance.org/`,
        1: `https://mainnet.infura.io/v3/be46916a77964b5fb4cc36a21d014610`,
      },
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
      pollingInterval: 15000,
    },
  },
};

const ConnectButton = () => {
  const { account, openWalletModal } = useWeb3();
  console.log(account);
  return (
    <div className="App">
      <button className="btn btn-primary" onClick={openWalletModal}>
        {account ? account : "Connect wallet"}
      </button>
    </div>
  );
};

function NavBar() {
  const { account, openWalletModal } = useWeb3();

  return (
    <div>
      <Web3Provider config={config}>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link className="nav-link d-flex align-items-center" to="/">
                Home
              </Link>
              <Link className="nav-link d-flex align-items-center" to="/about">
                About
              </Link>
              <div className="nav-link">
                <ConnectButton />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Web3Provider>
    </div>
  );
}

export default NavBar;
