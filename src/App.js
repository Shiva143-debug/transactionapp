
import React, { Component } from 'react';
import TransactionsList from './TransactionsList'; 


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateTransactions: 0, 
        };
    }

    handleTransactionAdded = () => {
        this.setState(prevState => ({
            updateTransactions: prevState.updateTransactions + 1
        }));
    };

    render() {
        return (
            <div>
                <TransactionsList key={this.state.updateTransactions} onTransactionAdded={this.handleTransactionAdded} />
            </div>
        );
    }
}

export default App;

