
import React, { Component } from 'react';
import { fetchTransactions, deleteTransaction } from './api';
import "./App.css";
import Modal from 'react-modal'; 
import AddTransaction from './AddTransaction';
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

Modal.setAppElement('#root'); 

class TransactionsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            isModalOpen: false, 
        };
    }

    componentDidMount() {
        this.loadTransactions();
    }

    loadTransactions = async () => {
        try {
            const transactions = await fetchTransactions();
            
            // Example of marking a new transaction (you need to set this appropriately when a new transaction is added)
            const newTransactionId = 'new-transaction-id'; // Replace with actual ID or identifier of the new transaction
            const newTransaction = transactions.find(transaction => transaction.id === newTransactionId);
            if (newTransaction) {
                newTransaction.isNew = true;
            }
    
            const sortedTransactions = transactions.sort((a, b) => {
                const dateComparison = new Date(b.date) - new Date(a.date);
                if (dateComparison !== 0) {
                    return dateComparison;
                }
                // If dates are the same, prioritize new transaction
                if (a.isNew) return -1;
                if (b.isNew) return 1;
                // If neither is new, fall back to sorting by ID
                return b.id - a.id;
            });
    
            let runningBalance = 0;
            const updatedTransactions = [];
    
            for (let i = sortedTransactions.length - 1; i >= 0; i--) {
                const transaction = sortedTransactions[i];
                if (transaction.type === 'credit') {
                    runningBalance += transaction.amount;
                } else if (transaction.type === 'debit') {
                    runningBalance -= transaction.amount;
                }
                updatedTransactions.unshift({
                    ...transaction,
                    running_balance: runningBalance
                });
            }
    
            this.setState({
                transactions: updatedTransactions
            });
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    

    // loadTransactions = async () => {
    //     try {
    //         const transactions = await fetchTransactions();
    //         const sortedTransactions = transactions.sort((a, b) => {
    //             const dateComparison = new Date(b.date) - new Date(a.date);
    //             if (dateComparison !== 0) {
    //                 return dateComparison;
    //             }
    //             // If the dates are the same, sort by the creation time or an identifier 
    //             // that indicates the order of addition (assuming `timestamp` or `createdAt` is available).
    //             // This example assumes a `timestamp` property that reflects the creation time of the transaction.
    //             const timeComparison = new Date(b.timestamp) - new Date(a.timestamp);
    //             if (timeComparison !== 0) {
    //                 return timeComparison;
    //             }
    //             // If creation times are also the same, sort by ID as a fallback.
    //             return a.id - b.id;
    //         });
    
    //         let runningBalance = 0;
    //         const updatedTransactions = [];
    
    //         for (let i = sortedTransactions.length - 1; i >= 0; i--) {
    //             const transaction = sortedTransactions[i];
    //             if (transaction.type === 'credit') {
    //                 runningBalance += transaction.amount;
    //             } else if (transaction.type === 'debit') {
    //                 runningBalance -= transaction.amount;
    //             }
    //             updatedTransactions.unshift({
    //                 ...transaction,
    //                 running_balance: runningBalance
    //             });
    //         }
    
    //         this.setState({
    //             transactions: updatedTransactions
    //         });
    //     } catch (error) {
    //         console.error('Error fetching transactions:', error);
    //     }
    // };
    
    // loadTransactions = async () => {
    //     try {
    //         const transactions = await fetchTransactions();
    //         const sortedTransactions = transactions.sort((a, b) => {
    //             const dateComparison = new Date(b.date) - new Date(a.date);
    //             if (dateComparison !== 0) {
    //                 return dateComparison;
    //             }
    //             return a.id - b.id;
    //         });

    //         let runningBalance = 0;
    //         const updatedTransactions = [];

    //         for (let i = sortedTransactions.length - 1; i >= 0; i--) {
    //             const transaction = sortedTransactions[i];
    //             if (transaction.type === 'credit') {
    //                 runningBalance += transaction.amount;
    //             } else if (transaction.type === 'debit') {
    //                 runningBalance -= transaction.amount;
    //             }
    //             updatedTransactions.unshift({
    //                 ...transaction,
    //                 running_balance: runningBalance
    //             });
    //         }

    //         this.setState({
    //             transactions: updatedTransactions
    //         });
    //     } catch (error) {
    //         console.error('Error fetching transactions:', error);
    //     }
    // };

    handleDelete = async (transactionId) => {
        try {
            await deleteTransaction(transactionId);
            this.loadTransactions();
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    openModal = () => {
        this.setState({ isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    handleTransactionAdded = () => {
        this.loadTransactions();
        this.closeModal(); 
    };

    render() {
        return (
            <div>
                <h2 style={{ textAlign: "center" }}>Transactions List</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Office Transactions</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th onClick={this.openModal} style={{ cursor: 'pointer' }}>+Add Transaction</th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Credit</th>
                            <th>Debit</th>
                            <th>Running Balance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{new Date(transaction.date).toLocaleDateString('en-US', {
                                    month: 'numeric',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.type === 'credit' ? transaction.amount : ''}</td>
                                <td>{transaction.type === 'debit' ? transaction.amount : ''}</td>
                                <td>{transaction.running_balance}</td>
                                <td >
                                {/* <GrUpdate style={{marginLeft:"20px"}} /> */}
                                <MdDelete style={{color:"red",marginLeft:"20px"}} onClick={() => this.handleDelete(transaction.id)}/>
                                    {/* <button onClick={() => this.handleDelete(transaction.id)}>Delete</button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal
                    isOpen={this.state.isModalOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Add Transaction"
                    className="modalOverlay modalContent"

                >
                    <AddTransaction onTransactionAdded={this.handleTransactionAdded} closeModal={this.closeModal} />
                </Modal>
            </div>
        );
    }
}

export default TransactionsList;