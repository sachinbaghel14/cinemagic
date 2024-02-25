import styles from "./Tickets.module.css"
import { Header } from "../../shared/Header/Header"
import { Footer } from "../../shared/Footer/Footer"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { UserTickets } from "../../connection"
import { toast } from "react-toastify"
import { LoadingSpinner } from "../Components/LoadingSpinner"

export function Tickets() {
    const [tickets, setTickets] = useState([])
    const [showSpinner, setShowSpinner] = useState(false)
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        if (!location.state) {
            toast.warn("Please Login First", {
                position: toast.POSITION.BOTTOM_RIGHT,
                theme: "dark",
            })
            navigate("/")
        } else {
            setShowSpinner(true)
            UserTickets(location.state.access, location.state.id).then((result) => {
                if (result !== 401) {
                    setTickets(result)
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
        }

    }, [])
    function getDay(d){
        const date = new Date(d)
        return weekday[date.getDay()]
    }
    console.log(tickets)
    return (
        <div>
            <Header></Header>
            <div className={styles.container}>
            <h1>Your Tickets</h1>
            {showSpinner && <div className={styles.loadingSpinner}><LoadingSpinner title="Loading, Please wait..."></LoadingSpinner></div>}
            <div className={styles.tickets}>
            {!showSpinner && tickets && tickets.map(ticket=>
                <div className={styles.ticket}>
                    <div>
                        <h5>TICKETS</h5>
                    </div>
                    <hr className={styles.hrTicket} />
                    <div className={styles.midSection}>
                        <div className={styles.location}>
                            <span>{ticket.theater.name}</span>
                            <span> {ticket.city.name}</span>
                        </div>
                        <div className={styles.dateTime}>
                            <div className={styles.dayTime}>
                                <span>{getDay(ticket.date)}</span>
                                <span>{ticket.time}</span>
                            </div>
                            <div className={styles.date}>
                                <span>{ticket.date}</span>
                            </div>
                        </div>
                        <div className={styles.movieName}>
                            <span>{ticket.movie.name}</span>
                        </div>
                        <div>
                            <div className={styles.tableHeader}>
                                <th className={styles.tableRow}>Row</th>
                                <th className={styles.tableSeat}>Seat</th>
                                <th className={styles.tablePrice}>Price</th>
                            </div>
                            {ticket.seat_details.length > 0 && ticket.seat_details.map((seat) => {
                                return (
                                    <div className={styles.tableRow}>
                                        <td>{seat.row}</td>
                                        <td>{seat.seat_no}</td>
                                        <td>{seat.price}</td>
                                    </div>
                                )
                            })}
                            <div className={styles.total}>
                                <th>Total - </th>
                                <td>Rs {ticket.seat_details.length * 180}</td>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!showSpinner && tickets.length<1 && <h4>You don't have any booked tickets.</h4>}
            </div>

        </div>

            <Footer></Footer>
        </div>
    )
}