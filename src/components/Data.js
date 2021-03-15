import React, { Component } from 'react';
import '../css/Data.css';

class Data extends Component {
  render() {
    const { users, handleEdit } = this.props;

    return (
      <div className="user-data-block">
        {users.map((item, key) => {
          if (key === 0) {
            return (
              <div>

              </div>);
          } else {
            return (
              <div className="item-data">
                <div className="left-block">
                  <p><span>Name: </span>{item.name}</p>
                  <p><span>Address: </span>{item.address}</p>
                  <p><span>Mobile Number: </span>{item.mobNum}</p>
                  <p><span>College: </span>{item.college}</p>
                </div>

                <div className="right-block">
                  <button onClick={() => handleEdit(key)}>Edit</button>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default Data;