import "../Styles/register.css"
import Img from "../Assets/result.svg"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cadastro({ logado = false }) {

  const handleRegister = (values) => {
    Axios.post("http://127.0.0.1:5000//register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      toast.info(`${response.data.msg}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      window.location.href = "/dashboard"; 
    });
  };

  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email("invalid email")
      .required("Email is mandatory"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is mandatory"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "The passwords are different")
      .required("Password confirmation is mandatory"),
  });


  return (
    <div className="body">
      <div className="left-cadastro">
        <img src={Img} alt="Pessoas olhando gráficos" className="chart" />
      </div>
      <div className="right-cadastro">
        <div className="card-cadastro">
          <div className="user-links">
            <div className="user-link-home">
              {!logado && <Link to="/login">Home</Link>}
            </div>

            <div className="user-link-cad">
              {!logado && <Link to="/register">Register</Link>}
            </div>
          </div>
          <h1>Register</h1>
          <Formik
            initialValues={{}}
            onSubmit={handleRegister}
            validationSchema={validationsRegister}
          >
            <Form className="login-form">
              <div className="form-group">
                <label form="email">Email</label>

                <Field name="email" type='email' className="form-field" placeholder="Email" />

                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                />
              </div>

              {/*Outro campo*/}

              <div className="form-group">
                <label form="email">Password</label>
                <Field name="password" type='password' className="form-field" placeholder="password" />

                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>

              {/*Confirmação*/}

              <div className="form-group">
                <label form="email">Confirm password</label>
                <Field name="confirmation" type='password' className="form-field" placeholder="confirm password" />

                <ErrorMessage
                  component="span"
                  name="confirmation"
                  className="form-error"
                />
              </div>
              <button className="button" type="submit">
                Submit form
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <ToastContainer position='top-right' />
    </div>
  );
}

export default Cadastro;