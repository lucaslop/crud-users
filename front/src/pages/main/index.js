import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import api from "../../services/api";

import "./styles.css";

class Main extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    users: []
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async () => {
    const response = await api.get(`/users`);

    this.setState({ users: response.data });
  };

  addUsers = () => {
    this.props.history.push("/users/create");
  };

  render() {
    const { users } = this.state;

    return (
      <div className="users-list">
        {users.map(user => (
          <article key={user.id}>
            <strong> {user.name}</strong>
            <p> {user.email}</p>
            <Link to={`/users/edit/${user.id}`}>Editar</Link>
          </article>
        ))}
        <button
          type="button"
          className="add-button"
          onClick={() => this.addUsers()}
        >
          Adicionar
        </button>
      </div>
    );
  }
}

export default Main;
