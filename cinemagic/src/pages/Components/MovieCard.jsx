import { useEffect, useState } from "react"
import styles from "./MovieCard.module.css"
import { Rating } from "./Rating"
import { Movies } from "../../connection"
import { useNavigate } from "react-router-dom"


export function MovieCard(props) {
    const navigate = useNavigate()
    function redirectToMovie(){
        navigate("/movie", {
            state: props.item
        })
    }
    return (
        <div className={styles.movie}>
            <img onClick={redirectToMovie} src={props.item.card_img} className={`card-img-top ${styles.productImg}`} alt="..."></img>
            <div className={styles.productDetails}>
                <div onClick={redirectToMovie} className={styles.name}>{props.item.title}</div>
                <div className={styles.mD}>
                    <div className={styles.PRdiv}>
                        <div><span className={styles.price}>{props.item.type_rating}</span></div>
                        <div className={styles.RCdiv}>
                            <Rating rating={props.item.star_rating} size={"12"} ></Rating>
                        </div>
                    </div>
                    <div>
                        <div className={styles.duration}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch carousel-icon" viewBox="0 0 16 16">
                            <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
                            <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3" />
                        </svg><span className={styles.price}>&nbsp;{props.item.duration}</span></div>
                    </div>
                </div>
            </div>
        </div>

    )
}