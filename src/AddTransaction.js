// import React, { Component } from 'react';
// import axios from 'axios';

// class AddTransaction extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             type: 'credit',
//             amount: '',
//             description: '',
//             date: new Date().toISOString().slice(0, 19),
//         };
//     }

//     handleChange = (e) => {
//         this.setState({ [e.target.name]: e.target.value });
//     };

//     handleSubmit = async (e) => {
//         e.preventDefault();
//         const { type, amount, description, date } = this.state;

//         try {
//             await axios.post('http://localhost:3000/transactions', {
//                 type,
//                 amount,
//                 description,
//                 date,
//             });
//             this.setState({ amount: '', description: '' });
//             this.props.onTransactionAdded();
//         } catch (error) {
//             console.error('Error adding transaction:', error);
//         }
//     };

//     render() {
//         return (
//             <div>
//                 <h2>Add Transaction</h2>
//                 <form onSubmit={this.handleSubmit}>
//                     <div>
//                         <label>Type</label>
//                         <select name="type" value={this.state.type} onChange={this.handleChange}>
//                             <option value="credit">Credit</option>
//                             <option value="debit">Debit</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label>Amount</label>
//                         <input
//                             type="number"
//                             name="amount"
//                             value={this.state.amount}
//                             onChange={this.handleChange}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label>Description</label>
//                         <input
//                             type="text"
//                             name="description"
//                             value={this.state.description}
//                             onChange={this.handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label>Date</label>
//                         <input
//                             type="datetime-local"
//                             name="date"
//                             value={this.state.date}
//                             onChange={this.handleChange}
//                         />
//                     </div>
//                     <button type="submit">Add Transaction</button>
//                 </form>
//             </div>
//         );
//     }
// }

// export default AddTransaction;

import React, { Component } from 'react';
import { addTransaction } from './api'; // Import the addTransaction function

class AddTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'credit',
            amount: '',
            description: '',
            date: new Date().toISOString().slice(0, 19),
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { type, amount, description, date } = this.state;

        try {
            await addTransaction({ type, amount, description, date });
            this.setState({ amount: '', description: '' });
            this.props.onTransactionAdded();
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    render() {
        return (
            <div>
                <h2>Add Transaction</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Type</label>
                        <select name="type" value={this.state.type} onChange={this.handleChange}>
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                        </select>
                    </div>
                    <div>
                        <label>Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={this.state.amount}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Date</label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={this.state.date}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit">Add Transaction</button>
                </form>
            </div>
        );
    }
}

export default AddTransaction;

