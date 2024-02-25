import styles from './Header.module.css'
import logo from '../../assets/cinemagic-logo.png'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import profileImg from "../../assets/profile.jpg"
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../pages/Components/LoadingSpinner";

export function Header() {

    const navigate = useNavigate()
    const [navState, setNavState] = useState("0")
    const [user, setUser] = useState()
    const [showSpinner, setShowSpinner] = useState(false)

    const HandleSearch = async () =>  {
        const { value: selectedValue } = await Swal.fire({
            background: "transparent",
            position: "top",
            color: "white",
            html:
                '<div class=search>'+
                '<select id="selectField" class="form-select filter-select">' +
                '<option value="title">Name</option>' +
                '<option value="genre">Genre</option>' +
                '<option value="rating">Rating</option>' +
                '<option value="language">Language</option>' +
                '</select>' +
                '<input type="text" id="inputField" class="form-control search-bar" placeholder="Search for Movies">'+
                '</div>'
            ,
            confirmButtonText: "<span style='color:black'> Search </span>",
            confirmButtonColor: "#fee505",
            preConfirm: () => {
                const search = Swal.getPopup().querySelector('#inputField').value;
                const filter = Swal.getPopup().querySelector('#selectField').value;
                return { filter, search };
            },
        })
        if (selectedValue) {
            navigate("/search", {
                state: selectedValue
            })
            // SearchMovie(selectedValue).then(result => {
            //     console.log(result)
            //     if (result !== 401) {
            //         navigate("/search", {
            //             state: result
            //         })
            //     } else {
            //         setShowSpinner(false)
            //         toast.warn("Session Expired, Please Login", {
            //             position: toast.POSITION.BOTTOM_RIGHT,
            //             theme: "dark",
            //         })
            //         localStorage.removeItem("userDetails")
            //         navigate("/")
            //     }
            // })
            // Handle the selected values as needed
          }
        // Swal.fire({
        //     input: "text",
        //     background: "transparent",
        //     position: "top",
        //     color: "white",
        //     inputAttributes: {
        //         autocapitalize: "off",
        //         placeholder: "Search for Movies",
        //         background: "transparent",

        //     },
        //     // showCancelButton: true,
        //     confirmButtonText: "<span style='color:black'> Search </span>",
        //     confirmButtonColor: "#fee505",
        //     showLoaderOnConfirm: true,
        //     preConfirm: async (login) => {
        //         try {
        //             const githubUrl = `
        //           https://api.github.com/users/${login}
        //         `;
        //             const response = await fetch(githubUrl);
        //             if (!response.ok) {
        //                 return Swal.showValidationMessage(`
        //             ${JSON.stringify(await response.json())}
        //           `);
        //             }
        //             return response.json();
        //         } catch (error) {
        //             Swal.showValidationMessage(`
        //           Request failed: ${error}
        //         `);
        //         }
        //     },
        //     allowOutsideClick: () => !Swal.isLoading()
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         Swal.fire({
        //             title: `${result.value.login}'s avatar`,
        //             imageUrl: result.value.avatar_url
        //         });
        //     }
        // });
    }

    function HandleSideNav() {
        if (navState === "0") {
            setNavState("250px")
        } else {
            setNavState("0")
        }

    }

    function handleSignOut() {
        setShowSpinner(true)
        localStorage.removeItem("userDetails")
        setShowSpinner(false)
        navigate("/")
        toast.success("Sign Out Successful", {
            position: toast.POSITION.BOTTOM_RIGHT,
            theme: "dark",
        })
    }
    useEffect(() => {
        const userDetails = localStorage.getItem('userDetails')
        if (userDetails) {
            setUser(JSON.parse(userDetails))
        }

    }, [])


    return (
        <div>
            {showSpinner && <div className={styles.loadingSpinner}><LoadingSpinner title="Signing up, Please wait..."></LoadingSpinner></div>}
            <nav className={`navbar navbar-expand-lg navbar-light ${styles.headerTop}`}>
                {/* logo */}
                <a href="/" className="navbar-brand"><img className={styles.logo} src={logo} alt="icon"></img></a>




                <div className={styles.rightHeader}>
                    {/* Search*/}
                    <form class="d-flex" role="search">

                        <div className={styles.searchIcon} >
                            <span class={`btn ${styles.searchBtn}`} onClick={HandleSearch}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg></span>
                        </div>

                    </form>

                    {/* Home */}
                    <div>
                        <span onClick={() => navigate("/home")} className={styles.rightHeaderItems}>HOME</span>
                    </div>

                    {/* Movie */}
                    <div className={styles.rightHeaderItems}>
                        <spna>MOVIE</spna>
                    </div>

                    {/* Menu */}
                    <div className={styles.menu}>
                        <span onClick={HandleSideNav}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-grid-3x3-gap-fill" viewBox="0 0 16 16">
                                <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                            </svg>
                        </span>
                    </div>
                </div>
            </nav>
            <div class={styles.sidenav} style={{ width: navState }}>
                <div className={styles.profile}>
                    <div className={styles.imgDiv}>
                        <img className={styles.profileImg} src={profileImg}></img>
                    </div>
                    <div className={styles.imgTitle}>
                        {user && <span>{user.first_name} {user.last_name}</span>}
                    </div>
                </div>
                <hr className={styles.hrLight}></hr>
                <a href="" onClick={() => {
                    navigate("/profile", {
                        state: user
                    })
                }}>Profile</a>
                <a href="" onClick={() => {
                    navigate("/tickets", {
                        state: user
                    })
                }}>Your Tickets</a>
                <a href="#">About Us</a>
                <a href="#">Contact Us</a>
                <a href="#">Privacy Policy</a>
                <a href="" onClick={handleSignOut}>Sign Out</a>
            </div>
        </div>
    )
}