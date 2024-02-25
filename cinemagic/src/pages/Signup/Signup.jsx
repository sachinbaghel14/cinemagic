import styles from "./Signup.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form } from "react-bootstrap"
import { useFormik } from "formik";
import * as Yup from "yup"
import logo from "../../assets/cinemagic-logo.png"
import { RegisterUser } from "../../connection";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../Components/LoadingSpinner";

const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('First Name is required')
        .min(3, 'First Name cannot be less than 3 characters')
        .max(15, 'First Name is too long!'),

    last_name: Yup.string()
        .required('Last Name is required')
        .min(3, 'Last Name cannot be less than 3 characters')
        .max(15, 'Last Name is too long!'),

    email: Yup.string()
        .email('Email type invalid')
        .required('Email is required'),

    phone_no: Yup.string()
        .required('Phone Number is required')
        .min(10, 'Phone Number cannot be less than 10 characters')
        .max(12, 'Phone Number is too long!'),

    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password cannot be less than 6 characters')
        .max(15, 'Password is too long!'),

    confirmpassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')

})
export function Signup() {
    const [user, setUser] = useState({ email: "", first_name: "", last_name: "", phone_no: "", password: "", confirmpassword: "" })
    const [showSpinner, setShowSpinner] = useState(false)
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: user,
        onSubmit: handleSignUp,
        validationSchema: SignupSchema,

    });

    function handleSignUp(values) {
        setShowSpinner(true)
        RegisterUser(values).then(result => {
            if (result === 201) {
                setShowSpinner(false)
                toast.success("Signup Successful, Please Signin", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    theme: "dark",
                })
                navigate("/");
            } else{
                setShowSpinner(false)
                toast.warning("Account Already exists", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    theme: "dark",
                })
            }

        })
    }

    return (
        <div className={styles.container}>
            {showSpinner && <div className={styles.loadingSpinner}><LoadingSpinner title="Signing up, Please wait..."></LoadingSpinner></div>}
            {!showSpinner && <div className={styles.loginContainer}>
                <div className={styles.loginTitle}>
                    <div className={styles.loginTitle}>
                        <img className={styles.logo} src={logo} alt="icon"></img>
                    </div>

                </div>
                <hr></hr>
                <Form noValidate className="loginform" onSubmit={formik.handleSubmit}>
                    <div className={`mb-3 ${styles.name}`}>
                        <Form.Group controlId="validationFormik01">
                            <Form.Label className={`${styles.formLabel}`}>
                                First Name
                            </Form.Label>
                            <Form.Control
                                name="first_name"
                                type="text"
                                value={formik.values.first_name}
                                className={`form-control ${styles.formInput}`}
                                placeholder="First name"
                                onChange={formik.handleChange}
                                isValid={formik.touched.first_name && !formik.errors.first_name}
                                isInvalid={!!formik.errors.first_name}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.first_name}</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationFormik02">
                            <Form.Label className={`${styles.formLabel}`}>
                                Last Name
                            </Form.Label>
                            <Form.Control
                                name="last_name"
                                type="text"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                className={`form-control ${styles.formInput}`}
                                placeholder="Last name"
                                isValid={formik.touched.last_name && !formik.errors.last_name}
                                isInvalid={!!formik.errors.last_name}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.last_name}</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <Form.Group className="mb-3" controlId="validationCustomUsername">
                        <Form.Label className={styles.formLabel}>
                            Email address
                        </Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className={`form-control ${styles.formInput}`}
                            placeholder="Your email"
                            isValid={formik.touched.email && !formik.errors.email}
                            isInvalid={!!formik.errors.email}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="validationCustomPhoneNo">
                        <Form.Label className={styles.formLabel}>
                            Phone Number
                        </Form.Label>
                        <Form.Control
                            name="phone_no"
                            type="tel"
                            value={formik.values.phone_no}
                            onChange={formik.handleChange}
                            className={`form-control ${styles.formInput}`}
                            placeholder="Your phone number"
                            isValid={formik.touched.phone_no && !formik.errors.phone_no}
                            isInvalid={!!formik.errors.phone_no}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.phone_no}</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className={styles.formLabel}>
                            Password
                        </Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            className={`form-control ${styles.formInput}`}
                            placeholder="Your password"
                            isValid={formik.touched.password && !formik.errors.password}
                            isInvalid={!!formik.errors.password}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className={styles.formLabel}>
                            Confirm password
                        </Form.Label>
                        <Form.Control
                            name="confirmpassword"
                            type="password"
                            // onInput={(event) => {
                            //     setUser({ ...user, confirmpassword: event.target.value })
                            // }}
                            value={formik.values.confirmpassword}
                            onChange={formik.handleChange}
                            className={`form-control ${styles.formInput}`}
                            id="confirmpassword"
                            placeholder="Confirm Your password"
                            isValid={formik.touched.confirmpassword && !formik.errors.confirmpassword}
                            isInvalid={!!formik.errors.confirmpassword}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.confirmpassword}</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <button type="submit" className={`btn ${styles.loginBtn}`}>Sign up</button>
                </Form>
                <div className={styles.createAccount}>
                    <h6>Already have an account?</h6>
                    <a type="button" className={styles.signupBtn} onClick={() => (navigate("/"))}>&nbsp;Sign in</a>
                </div>
            </div>}
        </div>

    )
}