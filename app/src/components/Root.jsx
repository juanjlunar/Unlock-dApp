import React from 'react';
import Web3 from 'web3';
import { Switch, Redirect, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import ipfs from 'ipfs';
import FileShareContract from '../contracts/FileShare.json';
// importing components
import HomeViewContainer from '../containers/HomeViewContainer';
import HeaderContainer from '../containers/HeaderContainer';
import Loader from './Loader.jsx';

class Root extends React.Component {
    constructor() {
		super();
        this.setMainAccount = this.setMainAccount.bind(this);
        
	}
	componentDidMount() {
		this.initializeMetamask();
	}
	initializeMetamask() {
		if (typeof window.ethereum === 'undefined' && typeof window.web3 === 'undefined') {
            this.props.showMetamaskInstallMessage();
            return;
		}
		if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            this.setMainAccount();

            window.__fileShare = Object.freeze(new window.web3.eth.Contract(
                FileShareContract.abi,
                FileShareContract.address,
            ));
            window.__fileShare.events.allEvents().on('data', data => {
                console.log('EN ALL EVENTS FACK', data)
                if (data.event === 'DonateEvent') {
                    this.props.updateDonations(parseInt(data.returnValues.id), data.returnValues.donated, data.transactionHash);
                    this.props.getContractSingleFile(data.returnValues.id);
                    return;
                }
                if (data.event === 'InsertedFileEvent') {
                    this.props.getContractSingleFile(data.returnValues.id);
                    return;
                }
            });
            // window.__fileShare.events.InsertedFileEvent().on('data', data => {
            //     this.props.getContractSingleFile(data.returnValues.id);
            // })
            // window.__fileShare.events.DonateEvent().on('data', data => {
            //     console.log('EN EL EVENTO', {id: data.returnValues.id, donated: data.returnValues.donated})
            //     this.props.updateDonations(parseInt(data.returnValues.id), data.returnValues.donated);
            // })

            


            window.ethereum.on('accountsChanged', this.props.changeMainAccount);
            this.props.createStoreIpfsNode(ipfs.create());
            return;
        }
        window.web3 = new Web3(window.web3.currentProvider);
        this.props.changeMainAccount(window.web3.eth.accounts[0]);
        this.props.createStoreIpfsNode(ipfs.create());
    }
	setMainAccount() {
		this.props.storeMainAccount(window.ethereum.enable());
    }
    renderBody() {
        if (!this.props.isMainAccountLoading && this.props.mainAccount && !this.props.error) {
            return (
                <Switch>
                    <Route path="/" component={HomeViewContainer} exact />
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <div className="flex-1 flex-c-axis-centered">
                {this.renderErrorOrLoading()}
            </div>
        );
    }
    renderErrorOrLoading() {
        if (this.props.error) {
            return (
                <div className="flex-c-axis-centered">
                    <p className="metamask-error vertical-separator">{this.props.error}</p>
                    <button onClick={this.setMainAccount} className="btn">Retry</button>
                </div>
            );
        }
        return (
            <React.Fragment>
                <Loader
                    className="flex-r-x-centered vertical-separator"
                />
                <p className="metamast-log-in-title">Waiting for Metamask Log In</p>
            </React.Fragment>
        );
    }
    render() {
        console.log('Root')
        return (
            <Router>
                <HeaderContainer />
                {this.renderBody()}
            </Router>
        );
    }
}
export default Root;