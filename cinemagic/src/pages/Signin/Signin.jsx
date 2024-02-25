import { useEffect, useState } from "react"
import styles from "./Signin.module.css"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import { Form } from "react-bootstrap"
import logo from "../../assets/cinemagic-logo.png"
import { toast } from "react-toastify";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { LoginUser } from "../../connection";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('email type invalid')
        .required('Email is required'),

    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password cannot be less than 6 characters')
        .max(15, 'Password is too long!'),

})

export function Signin() {
    const [user, setUser] = useState({ email: "", password: "" })
    const [showSpinner, setShowSpinner] = useState(false)
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: user,
        onSubmit: handleLogin,
        validationSchema: LoginSchema,

    });

    useEffect(() => {
        const userDetails = localStorage.getItem('userDetails')
        if(userDetails){
            navigate("/home")
        }
    },[])

    function handleLogin(values) {
        setShowSpinner(true)
        LoginUser(values).then(result => {
            if(result!=400){
                setShowSpinner(false)
                toast.success("Signin Successful", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    theme: "dark",
                })
                localStorage.setItem('userDetails', JSON.stringify(result));
                navigate('/home')

            }else{
                setShowSpinner(false)
                toast.error("Invalid Email or Password", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    theme: "dark",
                })
            }
        })
    }


    return (
        <div>
            <div className={styles.container}>
                {/* 1 row is divided in 12 columns. */}
                {showSpinner && <div className={styles.loadingSpinner}><LoadingSpinner title="Signing up, Please wait..."></LoadingSpinner></div>}
                {!showSpinner && <div className={styles.loginContainer}>
                    <div className={styles.loginTitle}>
                        <img className={styles.logo} src={logo} alt="icon"></img>
                    </div>
                    <hr></hr>
                    <Form noValidate className="loginform" onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="validationCustomUsername">
                            <Form.Label className={styles.formLabel}>
                                Email address
                            </Form.Label>
                            <Form.Control
                                value={formik.values.email}
                                type="email"
                                name="email"
                                className={`form-control ${styles.formInput}`}
                                placeholder="Your email"
                                onChange={formik.handleChange}
                                isValid={formik.touched.email && !formik.errors.email}
                                isInvalid={!!formik.errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="validationCustomPassword">
                            <Form.Label className={styles.formLabel}>
                                Password
                            </Form.Label>
                            <Form.Control
                                value={formik.values.password}
                                type="password"
                                name="password"
                                className={`form-control ${styles.formInput}`}
                                placeholder="Your password"
                                onChange={formik.handleChange}
                                isValid={formik.touched.password && !formik.errors.password}
                                isInvalid={!!formik.errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <div class="mb-3 d-flex flex-wrap justify-content-between">
                            <div class="form-check mb-2">
                                <input class={`form-check-input ${styles.rememberCheck}`} type="checkbox" id="si-remember"></input>
                                <label class="form-check-label" for="si-remember">Remember me</label>
                            </div><a class={`fs-sm ${styles.forget}`} href="#">Forgot password?</a>
                        </div>
                        <button type="submit" className={`btn ${styles.loginBtn}`}>Sign in</button>
                    </Form>
                    <div className={styles.createAccount}><h6>You don't have an account?</h6>
                        <a type="button" className={styles.signupBtn} onClick={() => (navigate("/signup"))}>&nbsp;SignUp</a></div>

                </div>}

            </div>
        </div>
    )
}