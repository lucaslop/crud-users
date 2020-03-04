import React, { Component } from "react";
import { withFormik } from "formik";
import { compose, lifecycle } from "recompose";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import api from "../../services/api";

import "./styles.css";

class Users extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    values: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string
    }).isRequired,
    errors: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
  };

  deleteUser = async () => {
    const { id } = this.props.match.params;
    const { push } = this.props.history;

    try {
      await api.delete(`/users/${id}`);
      push("/");
    } catch (err) {
      alert(`Não foi possível excluir o produto. Erro: ${err}`);
    }
  };

  render() {
    const { handleSubmit, errors, handleChange, values } = this.props;
    const { id } = this.props.match.params;

    return (
      <div className="users-info">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="Insira o Nome"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            {!!errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            <input
              placeholder="Insira o Email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {!!errors.email && <span>{errors.email}</span>}
          </div>

          <div className="actions">
            <button type="submit">Salvar dados</button>
            {id ? (
              <button type="button" onClick={this.deleteUser}>
                Excluir Usúario
              </button>
            ) : null}
          </div>
        </form>
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

export default compose(
  lifecycle({
    async componentDidMount() {
      const { id } = this.props.match.params;

      if (id) {
        const user = await api.get(`/users/${id}`);

        this.setState({ ...user.data });
      }
    }
  }),

  withFormik({
    enableReinitialize: true,

    mapPropsToValues: ({ name, email }) => ({
      name: name || "",
      email: email || ""
    }),

    validateOnChange: false,
    validateOnBlur: false,

    validationSchema: Yup.object().shape({
      name: Yup.string().required("Campo obrigatório"),
      email: Yup.string().required("Campo obrigatório")
    }),

    handleSubmit: async (values, { props }) => {
      const { id } = props.match.params;
      console.log(id);
      console.log(values);

      try {
        await api.postOrPut("/users", id, values);

        props.history.push("/");
      } catch (error) {
        alert(`Não foi possível salvar os dados: ${error}`);
      }
    }
  })
)(Users);
