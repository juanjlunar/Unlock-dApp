import React from 'react';
import Web3 from 'web3';
import { Switch, Redirect, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
// importing components
import HomeView from './HomeView';
import HeaderContainer from '../containers/HeaderContainer';

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
            this.setMainAccount(window.ethereum.enable());
            window.ethereum.on('accountsChanged', this.props.changeMainAccount);
            this.props.getContractActions(window.web3.eth.net.getId());
            return;
        }
        window.web3 = new Web3(window.web3.currentProvider);
        this.props.getContractActions(window.web3.eth.net.getId());
        this.props.changeMainAccount(window.web3.eth.accounts[0]);
    }
	setMainAccount(accountsPromise) {
		this.props.storeMainAccount(accountsPromise);
	}
    render() {
        console.log('Root')
        return (
            <Router>
                <HeaderContainer />
                <Switch>
                    <Route path="/" component={HomeView} exact />
                    <Redirect to="/" />
                </Switch>
            </Router>
        );
    }
}
export default Root;