import "../Styles/login.css"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import Img from "../Assets/result.svg"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ logado = false }) {
  const handleLogin = (values) => {
    Axios.post("http://127.0.0.1:5000//login", {
      email: values.email,
      password: values.password,
    }).then((response) => {

      const resp = response.data;

      if (resp === 'Login Successful!') {
        localStorage.setItem('@user', JSON.stringify(response.config.data));
        window.location.href = "/dashboard"; 
      } else {
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
      }

    });
  };


  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("invalid email")
      .required("Email is mandatory"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is mandatory"),
  });


  return (
    <div className="body">
      <div className="left-login">
        <img src={Img} alt="Pessoas olhando gráficos" className="chart" />

      </div>

      <div className="right-login">
        <div className="card-login">
          <div className="user-links">
            <div className="user-link-home">
              {!logado && <Link to="/">Home</Link>}
            </div>

            <div className="user-link-cad">
              {!logado && <Link to="/register">Register</Link>}
            </div>
          </div>
          <h1>LOGIN</h1>
          <Formik
            initialValues={{}}
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
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
                <Field name="password" type='password' className="form-field" placeholder="Password" />

                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>

              <button className="button" type="submit">
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <ToastContainer position='top-right' />
    </div>
  );
}

export default Login;