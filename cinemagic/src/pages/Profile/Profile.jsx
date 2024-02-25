import { Footer } from "../../shared/Footer/Footer"
import { Header } from "../../shared/Header/Header"
import styles from "./Profile.module.css"
import { Form } from "react-bootstrap"
import { useFormik } from "formik";
import * as Yup from "yup"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserUpdate } from "../../connection";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { LoadingSpinner } from "../Components/LoadingSpinner";

const accountSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('First name is required')
        .min(3, 'First name cannot be less than 3 characters')
        .max(15, 'First name is too long!'),

    last_name: Yup.string()
        .required('Last name is required')
        .min(3, 'Last name cannot be less than 3 characters')
        .max(15, 'Last name is too long!'),

    email: Yup.string()
        .email('email type invalid')
        .required('Email is required'),

    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password cannot be less than 6 characters')
        .max(15, 'Password is too long!'),

    confirmpassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')

})



export function Profile() {
    useEffect(() => {
        if (!location.state) {
            toast.warn("Please Login First", {
                position: toast.POSITION.BOTTOM_RIGHT,
                theme: "dark",
            })
            navigate("/")
        }
    }, [])
    const location = useLocation()
    const navigate = useNavigate()
    const [showSpinner, setShowSpinner] = useState(false)
    const [user, setUser] = useState({ first_name: location.state.first_name, last_name: location.state.last_name, email: location.state.email, phone_no: location.state.phone_no, password: "", confirmpassword: "" })

    const formik = useFormik({
        initialValues: user,
        onSubmit: handleUpdate,
        validationSchema: accountSchema,

    });


    function handleUpdate(values) {
        setShowSpinner(true)
        UserUpdate(location.state.access, values, location.state.id).then((result) => {
            if (result !== 401) {
                setShowSpinner(false)
                Swal.fire({
                    icon: "success",
                    title: "Profile Updated Successfully",
                    confirmButtonText: "<span style='color:black'> Ok </span>",
                    confirmButtonColor: "#fee505",

                }).then((result) => {
                    localStorage.removeItem("userDetails")
                    setShowSpinner(false)
                    toast.warn("Please Login First", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        theme: "dark",
                    })
                    navigate("/")
                });

            } else {
                setShowSpinner(false)
                toast.warn("Session Expired, Please Login", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    theme: "dark",
                })
                localStorage.removeItem("userDetails")
                navigate("/")
            }
        })
    }
    return (
        <div className={styles.profile}>
            <Header></Header>
            {showSpinner && <div className={styles.loadingSpinner}><LoadingSpinner title="Loading, Please wait..."></LoadingSpinner></div>}
            {!showSpinner && <div className={styles.profileDetails}>

                <Form noValidate className="loginform" onSubmit={formik.handleSubmit}>
                    <h1 className={styles.mvHeading}>Profile</h1>
                    <div className={`mb-3 ${styles.formContainer}`}>
                        <Form.Group className="mb-3" controlId="validationFormik01">
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
                        <Form.Group className="mb-3" controlId="validationFormik02">
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

                    <div className={`mb-3 ${styles.formContainer}`}>
                        <Form.Group className="mb-3" controlId="validationCustomUsername">
                            <Form.Label className={styles.formLabel}>
                                Email Address
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
                        <Form.Group className="mb-3" controlId="validationCustomUsername">
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
                    </div>
                    <div className={`mb-3 ${styles.formContainer}`}>
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
                                Confirm Password
                            </Form.Label>
                            <Form.Control
                                name="confirmpassword"
                                type="password"

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
                    </div>
                    <button type="submit" className={`btn ${styles.signout}`}>Update profile</button>
                </Form>
            </div>}

            <Footer></Footer>
        </div>
    )
}