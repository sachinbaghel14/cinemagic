import { toast } from "react-toastify"
import { Footer } from "../../shared/Footer/Footer"
import { Header } from "../../shared/Header/Header"
import HomeCarousel from "../Components/Carousel"
import { MovieCard } from "../Components/MovieCard"
import styles from "./Home.module.css"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getMoviesData } from "../../connection"
import { LoadingSpinner } from "../Components/LoadingSpinner"


export function Home() {
    const navigate = useNavigate();
    const [showSpinner, setShowSpinner] = useState(false)
    const [movies, setMovies] = useState([])
    useEffect(() => {
        const userDetails = localStorage.getItem('userDetails')
        if (userDetails) {
            setShowSpinner(true)
            getMoviesData(JSON.parse(userDetails)).then(result => {
                if (result !== 401) {
                    setShowSpinner(false)
                    setMovies(result)
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
        } else {
            setShowSpinner(false)
            toast.warn("Please Login First", {
                position: toast.POSITION.BOTTOM_RIGHT,
                theme: "dark",
            })
            navigate("/")
        }
    }, [])

    return (
        <div className={styles.home}>
            <Header></Header>
            {showSpinner && <div className={styles.loadingSpinner}><LoadingSpinner title="Loading, Please wait..."></LoadingSpinner></div>}
            {!showSpinner &&
                <div>
                    <HomeCarousel items={movies}></HomeCarousel>
                    <div>
                        <h1 className={styles.mvHeading}> Trending</h1>
                        <div className={styles.movieContainer}>
                            {movies && movies.map((movie) =><MovieCard item={movie}></MovieCard>)}
                        </div>
                    </div>
                    <div>
                        <h1 className={styles.mvHeading}>Comming Soon</h1>
                        <div className={styles.movieContainer}>
                            {movies && movies.map((movie) =><MovieCard item={movie}></MovieCard>)}
                        </div>
                    </div>
                </div>
            }
            <Footer></Footer>
        </div>
    )
}