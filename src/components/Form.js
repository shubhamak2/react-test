import React, { Component } from 'react';
import Data from './Data';
import '../css/Form.css';

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formState: {
        id: "",
        name: '',
        address: '',
        mobNum: "",
        college: '',
        mode: "submit",
      },
      users: [
        {
          id: 0,
          name: '',
          address: '',
          mobNum: "",
          college: '',
        }
      ],
      errormessage: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "mobNum") {
      const mobNum = value;
      let errormessage = '';

      if (!/^[6-9]\d{9}$/.test(mobNum)) {
        errormessage = <strong>Please enter a valid 10 digit number.</strong>;
      }

      this.setState({
        formState: {
          ...this.state.formState,
          [name]: value,
        },
        errormessage
      });
    } else {
      this.setState({
        formState: {
          ...this.state.formState,
          [name]: value
        }
      });
    }
  }

  handleReset() {
    this.setState({
      formState: {
        id: "",
        name: "",
        address: "",
        mobNum: "",
        college: "",
        mode: "submit"
      }
    });
  }

  handleSubmit(event) {
    const { users, formState } = this.state;
    event.preventDefault();

    const name = event.target.name.value;
    const address = event.target.address.value;
    const mobNum = event.target.mobNum.value;
    const college = event.target.college.value;

    if (formState.mode === "submit") {
      this.setState({
        users: [
          ...this.state.users,
          {
            name,
            address,
            mobNum,
            college,
            id: this.state.users[this.state.users.length - 1].id + 1
          }
        ]
      });
    } else if (formState.mode === "edit") {
      const index = users.find((user) => user.id === formState.id).id;

      users[index] = {
        name,
        address,
        mobNum,
        college,
        id: users[index].id
      }

      this.setState({
        users: [...users]
      });
    }

    this.handleReset();
  }

  handleEdit(key) {
    const { users } = this.state;

    this.setState({
      formState: { ...this.state.users[key], mode: "edit" },
      users
    });
  }

  render() {
    const { formState, users, errormessage } = this.state;

    return (
      <div>
        <form className="submit-form" onSubmit={this.handleSubmit}>
          <div className="form-inline">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" value={formState.name} onChange={this.handleChange} required />
          </div>

          <div className="form-inline">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" placeholder="Enter your address" value={formState.address} onChange={this.handleChange} required />
          </div>

          <div className="form-inline">
            <label htmlFor="mobNum">Mobile Number:</label>
            <input type="numeric" id="mobNum" name="mobNum" placeholder="Enter your mobile number" value={formState.mobNum} onChange={this.handleChange} required />
            {errormessage ? <span className="error">{errormessage}</span> : ''}
          </div>

          <div className="form-inline">
            <label htmlFor="college">College:</label>
            <input type="text" id="college" name="college" placeholder="Enter your college name" value={formState.college} onChange={this.handleChange} required />
          </div>

          <div className="form-button">
            <input type="submit" value={formState.mode} />
          </div>
        </form>
        <hr />
        {(users.length - 1) ? (
          <div>
            <h3 style={{ textAlign: 'center' }}>Filled Details:</h3>
            <Data users={users} handleEdit={this.handleEdit} />
          </div>)
          : ''}
      </div>
    );
  }
}

export default Form;