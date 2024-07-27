import React, { Component } from 'react';
import { addTransaction } from './api';
import { Form, Button, Container } from 'react-bootstrap';
import { IoIosSave } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

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
            <Container className="mt-4">
                <h2 className="mb-4 mt-5">New Transaction</h2> {/* Heading with margin-bottom for spacing */}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formType" className="form-group-flex">
                        <Form.Label style={{ fontWeight: 600 }}>Transaction Type:</Form.Label>
                        <Form.Control
                            as="select"
                            name="type"
                            value={this.state.type}
                            onChange={this.handleChange}
                        >
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formAmount" className="form-group-flex">
                        <Form.Label style={{ fontWeight: 600 }}>Amount:</Form.Label>
                        <Form.Control
                            type="number"
                            name="amount"
                            value={this.state.amount}
                            onChange={this.handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription" className="form-group-flex">
                        <Form.Label style={{ fontWeight: 600 }}>Description:</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDate" className="form-group-flex">
                        <Form.Label style={{ fontWeight: 600 }}>Date:</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={this.state.date.slice(0, 10)} 
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                        <Button variant="primary" type="submit">
                        <IoIosSave /> SAVE
                        </Button>
                        <Button variant="secondary" onClick={this.props.closeModal} >
                        <MdOutlineCancel />CANCEL
                        </Button>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default AddTransaction;
