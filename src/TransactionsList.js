// import React, { Component } from 'react';
// import axios from 'axios';

// class TransactionsList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             transactions: [],
//         };
//     }

//     componentDidMount() {
//         this.fetchTransactions();
//     }

//     fetchTransactions = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/transactions');
//             this.setState({ transactions: response.data });
//         } catch (error) {
//             console.error('Error fetching transactions:', error);
//         }
//     };

//     render() {
//         return (
//             <div>
//                 <h2>Transactions List</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Date</th>
//                             <th>Description</th>
//                             <th>Type</th>
//                             <th>Amount</th>
//                             <th>Running Balance</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.state.transactions.map(transaction => (
//                             <tr key={transaction.id}>
//                                 <td>{new Date(transaction.date).toLocaleString()}</td>
//                                 <td>{transaction.description}</td>
//                                 <td>{transaction.type}</td>
//                                 <td>{transaction.amount}</td>
//                                 <td>{transaction.running_balance}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }
// }

// export default TransactionsList;

// import React, { Component } from 'react';
// import axios from 'axios';

// class TransactionsList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             transactions: [],
//         };
//     }

//     componentDidMount() {
//         this.fetchTransactions();
//     }

//     fetchTransactions = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/transactions');
//             this.setState({ transactions: response.data });
//         } catch (error) {
//             console.error('Error fetching transactions:', error);
//         }
//     };

//     render() {
//         return (
//             <div>
//                 <h2>Transactions List</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Date</th>
//                             <th>Description</th>
//                             <th>Credit</th>
//                             <th>Debit</th>
//                             <th>Running Balance</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.state.transactions.map(transaction => (
//                             <tr key={transaction.id}>
//                                 <td>{new Date(transaction.date).toLocaleString()}</td>
//                                 <td>{transaction.description}</td>
//                                 <td>{transaction.type === 'credit' ? transaction.amount : ''}</td>
//                                 <td>{transaction.type === 'debit' ? transaction.amount : ''}</td>
//                                 <td>{transaction.running_balance}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }
// }

// export default TransactionsList;


import React, { Component } from 'react';
import { fetchTransactions } from './api'; // Import the fetchTransactions function

class TransactionsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
        };
    }

    componentDidMount() {
        this.loadTransactions();
    }

    loadTransactions = async () => {
        try {
            // Fetch all transactions
            const transactions = await fetchTransactions();
    
            // Sort transactions by date in descending order, and then by ID in ascending order for the same date
            const sortedTransactions = transactions.sort((a, b) => {
                // First sort by date in descending order
                const dateComparison = new Date(b.date) - new Date(a.date);
                if (dateComparison !== 0) {
                    return dateComparison;
                }
                // If dates are the same, sort by ID in ascending order
                return a.id - b.id;
            });
    
            // Calculate running balance based on sorted transactions, starting from the last transaction
            let runningBalance = 0;
            const updatedTransactions = [];
            
            for (let i = sortedTransactions.length - 1; i >= 0; i--) {
                const transaction = sortedTransactions[i];
                if (transaction.type === 'credit') {
                    runningBalance += transaction.amount;
                } else if (transaction.type === 'debit') {
                    runningBalance -= transaction.amount;
                }
                // Insert transaction at the beginning to maintain the correct order
                updatedTransactions.unshift({
                    ...transaction,
                    running_balance: runningBalance
                });
            }
    
            // Update state with sorted transactions and running balances
            this.setState({ 
                transactions: updatedTransactions
            });
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    

    // loadTransactions = async () => {
    //     try {
    //         // Fetch all transactions
    //         const transactions = await fetchTransactions();
    
    //         // Sort transactions by date in descending order, and then by ID in ascending order for the same date
    //         const sortedTransactions = transactions.sort((a, b) => {
    //             // First sort by date in descending order
    //             const dateComparison = new Date(b.date) - new Date(a.date);
    //             if (dateComparison !== 0) {
    //                 return dateComparison;
    //             }
    //             // If dates are the same, sort by ID in ascending order
    //             return a.id - b.id;
    //         });
    
    //         // Calculate running balance based on sorted transactions
    //         let runningBalance = 0;
    //         const updatedTransactions = sortedTransactions.map(transaction => {
    //             if (transaction.type === 'credit') {
    //                 runningBalance += transaction.amount;
    //             } else if (transaction.type === 'debit') {
    //                 runningBalance -= transaction.amount;
    //             }
    //             // Return a new transaction object with the updated running balance
    //             return {
    //                 ...transaction,
    //                 running_balance: runningBalance
    //             };
    //         });
    
    //         // Update state with sorted transactions and running balances
    //         this.setState({ 
    //             transactions: updatedTransactions
    //         });
    //     } catch (error) {
    //         console.error('Error fetching transactions:', error);
    //     }
    // };
    
    // loadTransactions = async () => {
    //     try {
    //         // Fetch all transactions
    //         const transactions = await fetchTransactions();
    
    //         // Calculate the running balance based on the original order
    //         let runningBalance = 0;
    //         const runningBalances = {};
    
    //         // Sort transactions by date in descending order, and then by ID in descending order
    //         const sortedTransactions = transactions.sort((a, b) => {
    //             // First sort by date in descending order
    //             const dateComparison = new Date(b.date) - new Date(a.date);
    //             if (dateComparison !== 0) {
    //                 return dateComparison;
    //             }
    //             // If dates are the same, sort by ID in descending order
    //             return b.id - a.id;
    //         });
    
    //         // Calculate running balance based on sorted transactions
    //         sortedTransactions.forEach(transaction => {
    //             if (transaction.type === 'credit') {
    //                 runningBalance += transaction.amount;
    //             } else if (transaction.type === 'debit') {
    //                 runningBalance -= transaction.amount;
    //             }
    //             // Store the running balance for each transaction
    //             runningBalances[transaction.id] = runningBalance;
    //         });
    
    //         // Update state with sorted transactions and running balances
    //         this.setState({ 
    //             transactions: sortedTransactions,
    //             runningBalances: runningBalances
    //         });
    //     } catch (error) {
    //         console.error('Error fetching transactions:', error);
    //     }
    // };
    

    handleDelete = async (transactionId) => {
        try {
            await deleteTransaction();
            // Refresh the transaction list after deletion
            this.props.onTransactionUpdated();
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    render() {
        return (
            <div>
                <h2>Transactions List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Credit</th>
                            <th>Debit</th>
                            <th>Running Balance</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{new Date(transaction.date).toLocaleString()}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.type === 'credit' ? transaction.amount : ''}</td>
                                <td>{transaction.type === 'debit' ? transaction.amount : ''}</td>
                                <td>{transaction.running_balance}</td>
                                <td>
                                    <button onClick={() => this.handleDelete(transaction.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TransactionsList;

