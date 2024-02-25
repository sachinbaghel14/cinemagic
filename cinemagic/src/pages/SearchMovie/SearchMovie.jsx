import styles from "./SearchMovie.module.css"
import { toast } from "react-toastify"
import { Footer } from "../../shared/Footer/Footer"
import { Header } from "../../shared/Header/Header"
import HomeCarousel from "../Components/Carousel"
import { MovieCard } from "../Components/MovieCard"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Search, getMoviesData } from "../../connection"
import { LoadingSpinner } from "../Components/LoadingSpinner"

export function SearchMovie() {
    const navigate = useNavigate();
    const [showSpinner, setShowSpinner] = useState(false)
    const [movies, setMovies] = useState([])
    const location = useLocation()

    useEffect(() => {
        setShowSpinner(true)
        Search(location.state).then(result => {
            console.log(result)
            if (result !== 401) {
                console.log(result)
                setMovies(result)
                setShowSpinner(false)
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
    }, [location.state])
    return (
        <div className={styles.home}>
            <Header></Header>
            {showSpinner && <div className={styles.loadingSpinner}><LoadingSpinner title="Loading, Please wait..."></LoadingSpinner></div>}
            {!showSpinner &&
                <div>
                    <h1 className={styles.mvHeading}>Results </h1>
                    <div className={styles.movieContainer}>
                        {movies && movies.map((movie) => <MovieCard item={movie}></MovieCard>)}
                        {movies.length==0 && <h2>No movies found</h2>}
                    </div>
                </div>
                
            }
            <Footer></Footer>
        </div>
    )
}