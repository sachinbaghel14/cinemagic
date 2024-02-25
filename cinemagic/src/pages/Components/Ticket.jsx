import { useSelector } from "react-redux";
import styles from "./Ticket.module.css"
import { getSelectedSeat } from "../../store/slices/movieSlices";
import { Bookticket } from "../../connection";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";


export function Ticket(props) {
    const seats = useSelector(getSelectedSeat)
    const [showSpinner, setShowSpinner] = useState(false)
    const navigate = useNavigate()
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    function handleTicketClick() {
        setShowSpinner(true)
        Bookticket({ user: props.user.email, movie: props.movieName, time: props.item.time, date: props.item.date, theater: props.item.theater, city: props.item.city, seats: seats }, props.user).then((result) => {
            if (result !== 401) {
                setShowSpinner(false)
                Swal.fire({
                    icon: "success",
                    title: "Ticket Booked",
                    confirmButtonText: "<span style='color:black'> Ok </span>",
                    confirmButtonColor: "#fee505",

                }).then((result) => {
                    window.location.reload(false);
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
        <div>
            {showSpinner && <div className={styles.loadingSpinner}><LoadingSpinner title="Loading, Please wait..."></LoadingSpinner></div>}
            {!showSpinner && <div>
                <div className={styles.ticket}>
                    <div>
                        <h5>TICKETS</h5>
                    </div>
                    <hr className={styles.hrTicket} />
                    <div className={styles.midSection}>
                        <div className={styles.location}>
                            <span>{props.item.theater}</span>
                            <span> {props.item.city}</span>
                        </div>
                        <div className={styles.dateTime}>
                            <div className={styles.dayTime}>
                                <span>{weekday[props.item.day]}</span>
                                <span>{props.item.time}</span>
                            </div>
                            <div className={styles.date}>
                                <span>{props.item.date}</span>
                            </div>
                        </div>
                        <div>
                            <div className={styles.tableHeader}>
                                <th className={styles.tableRow}>Row</th>
                                <th className={styles.tableSeat}>Seat</th>
                                <th className={styles.tablePrice}>Price</th>
                            </div>
                            {seats.length > 0 && seats.map((seat) => {
                                return (
                                    <div className={styles.tableRow}>
                                        <td>{seat.row}</td>
                                        <td>{seat.seat_no}</td>
                                        <td>180</td>
                                    </div>
                                )
                            })}
                            <div className={styles.total}>
                                <th>Total - </th>
                                <td>Rs {seats.length * 180}</td>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.pay}>
                    <span onClick={handleTicketClick}>Confirm Ticket</span>
                </div>
            </div>}

        </div>

    )

}