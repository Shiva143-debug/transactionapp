import React, { Component } from 'react';
import TransactionsList from './TransactionsList';
import AddTransaction from './AddTransaction';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateTransactions: false,
        };
    }

    handleTransactionAdded = () => {
        this.setState({ updateTransactions: !this.state.updateTransactions });
    };

    render() {
        return (
            <div>
                <h1>Transaction Management</h1>
                <AddTransaction onTransactionAdded={this.handleTransactionAdded} />
                <TransactionsList key={this.state.updateTransactions} />
            </div>
        );
    }
}

export default App;
