import { useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../../shared/Footer/Footer"
import { Header } from "../../shared/Header/Header"
import styles from "./Movie.module.css"
import { Rating } from "../Components/Rating";
import { TheaterSeat } from "../Components/TheaterSeat";
import { Ticket } from "../Components/Ticket";
import { useEffect, useState } from "react";
import { BookedSeat, getCity, getTheater } from "../../connection";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../Components/LoadingSpinner";


export function Movie() {
    let bookedseats = []
    const [showSpinner, setShowSpinner] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const d = new Date();
    const nd = new Date()
    const [rowSeats, setRowSeats] = useState([])
    let i = 0
    const [cities, setCities] = useState([])
    const [theaters, setTheaters] = useState([])
    const [ticket, setTicket] = useState({ date: d.getDate() + " " + d.toLocaleString("en-US", { month: "long" }) + " " + d.getFullYear(), day: d.getDay(), time: "09:00 AM", theater: 'PVR', city: 'Delhi', totalSeat: 0 })
    const [seats, setSeats] = useState([])
    const userDetails = localStorage.getItem('userDetails')
    function handleDateClick(values) {
        nd.setDate(values.target.value)
        setTicket(state => ({ ...state, date: nd.getDate() + " " + nd.toLocaleString("en-US", { month: "long" }) + " " + nd.getFullYear(), day: nd.getDay() }))
        // getSeat()
    }

    function handleTimeClick(values) {
        setTicket(state => ({ ...state, time: values.target.value }))
    }

    function handleCityChange(values) {
        setTicket(state => ({ ...state, city: values.target.value }))
        getTheater(JSON.parse(userDetails), values.target.value).then(result => {
            if (result !== 401) {
                setShowSpinner(false)
                setTheaters(result)
                setTicket(state => ({ ...state, theater: result[0].name, totalSeat: result[0].seating_capacity }))
                setRowSeats([])
                // total = result[0].seating_capacity
                // getSeat()
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
    function handleTheaterChange(event) {
        const index = theaters.findIndex(
            (i) => i.name === event.target.value
        )
        setTicket(state => ({ ...state, theater: event.target.value, totalSeat: theaters[index].seating_capacity }))
        setRowSeats([])
        // total = theaters[index].seating_capacity
        // getSeat()
    }

    useEffect(() => {
        if (userDetails) {
            setShowSpinner(true)
            getCity(JSON.parse(userDetails)).then(result => {
                if (result !== 401) {
                    setShowSpinner(false)
                    setCities(result)
                    return (result)
                } else {
                    setShowSpinner(false)
                    toast.warn("Session Expired, Please Login", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        theme: "dark",
                    })
                    localStorage.removeItem("userDetails")
                    navigate("/")
                }
            }).then(result => {
                result && getTheater(JSON.parse(userDetails), result[0].name).then(result => {
                    if (result !== 401) {
                        setShowSpinner(false)
                        setTheaters(result)
                        setTicket(state => ({ ...state, theater: result[0].name, totalSeat: result[0].seating_capacity }))
                        setRowSeats([])
                        // total = result[0].seating_capacity
                        // getSeat()
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
    useEffect(() => {
        // Call your function here
        if (ticket !== null) {
            getSeat(ticket);
        }
    }, [ticket]);
    function getSeat(ticket) {
        setShowSpinner(true)
        BookedSeat(ticket, location.state.movie_id, JSON.parse(userDetails)).then((result) => {
            result.map((r) => {
                r.seat_details.map((seat) => {
                    bookedseats.push(seat)
                })
            })

            const noOfRows = ticket.totalSeat / 7
            let seats = {
                left: {},
                right: {}
            }
            let sec = 'left'
            for (let l = 1; l <= noOfRows; l++) {
                let rows_char = String.fromCharCode('@'.charCodeAt(0) + l)
                if (!seats[sec][rows_char]) {
                    seats[sec][rows_char] = [];
                }
                for (let i = 1; i <= 7; i++) {
                    const available = !bookedseats.find(item => item.row === rows_char && item.seat_no === i)
                    seats[sec][rows_char].push({
                        seat: i,
                        available: available
                    })
                }
                if ((noOfRows / 2) === l) {
                    sec = 'right'
                }
            }
            setRowSeats(seats)
            //console.log(seats)
            // seats.left.map((seat)=>{
            //     console.log(seat)
            // })
            setShowSpinner(false)
        })





    }

    // ticket && getSeat()

    return (
        <div className={styles.movie}>
            <img className={styles.backgroundImg} src={location.state.coursel_img} alt="movie-background" />
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.movieDetails}>
                    <div className={styles.location}>
                        <select onChange={handleCityChange} className={styles.citySelect} required="" id="movie-city">
                            {cities && cities.map((city) => <option value={city.name}>{city.name} &nbsp;</option>)}
                        </select>
                        <select onChange={handleTheaterChange} className={styles.theaterSelect} required="" id="movie-theater">
                            {theaters && theaters.map((theater) => <option value={theater.name}>{theater.name}    &nbsp;</option>)}
                        </select>

                    </div>
                    <div className={styles.bdgS}>
                        <input onClick={handleDateClick} value={d.getDate()} type="radio" name={`day`} id={`day1`} className={styles.sizeInput} defaultChecked></input>
                        <label className={styles.sizeLabel} htmlFor={`day1`}>{d.getDate()} {weekday[d.getDay()]}</label>
                        <div style={{ display: "none" }}>{nd.setDate(d.getDate() + 1)}</div>

                        <input onClick={handleDateClick} value={nd.getDate()} type="radio" name={`day`} id={`day2`} className={styles.sizeInput}></input>
                        <label className={styles.sizeLabel} htmlFor={`day2`}>{nd.getDate()} {weekday[nd.getDay()]}</label>
                        <div style={{ display: "none" }}>{nd.setDate(d.getDate() + 2)}</div>

                        <input onClick={handleDateClick} value={nd.getDate()} type="radio" name={`day`} id={`day3`} className={styles.sizeInput}></input>
                        <label className={styles.sizeLabel} htmlFor={`day3`} >{nd.getDate()} {weekday[nd.getDay()]}</label>
                        <div style={{ display: "none" }}>{nd.setDate(d.getDate() + 3)}</div>

                        <input onClick={handleDateClick} value={nd.getDate()} type="radio" name={`day`} id={`day4`} className={styles.sizeInput}></input>
                        <label className={styles.sizeLabel} htmlFor={`day4`}>{nd.getDate()} {weekday[nd.getDay()]}</label>
                        <div style={{ display: "none" }}>{nd.setDate(d.getDate() + 4)}</div>

                        <input onClick={handleDateClick} value={nd.getDate()} type="radio" name={`day`} id={`day5`} className={styles.sizeInput}></input>
                        <label className={styles.sizeLabel} htmlFor={`day5`}>{nd.getDate()} {weekday[nd.getDay()]}</label>
                    </div>
                    <div className={styles.timeSelect}>
                        <h6>Time</h6>
                        <div className={styles.bdgS}>
                            <input onClick={handleTimeClick} value="09:00 AM" type="radio" name={`time`} id={`time1`} className={styles.sizeInput} defaultChecked></input>
                            <label className={styles.timeLabel} htmlFor={`time1`}>09:00 AM</label>

                            <input onClick={handleTimeClick} value="11:45 AM" type="radio" name={`time`} id={`time2`} className={styles.sizeInput}></input>
                            <label className={styles.timeLabel} htmlFor={`time2`}>11:45 AM</label>

                            <input onClick={handleTimeClick} value="02:30 PM" type="radio" name={`time`} id={`time3`} className={styles.sizeInput}></input>
                            <label className={styles.timeLabel} htmlFor={`time3`} >02:30 PM</label>

                            <input onClick={handleTimeClick} value="05:15 PM" type="radio" name={`time`} id={`time4`} className={styles.sizeInput}></input>
                            <label className={styles.timeLabel} htmlFor={`time4`}>05:15 PM</label>

                            <input onClick={handleTimeClick} value="07:45 PM" type="radio" name={`time`} id={`time5`} className={styles.sizeInput}></input>
                            <label className={styles.timeLabel} htmlFor={`time5`}>07:45 PM</label>
                        </div>
                        <div className={styles.movieCard}>
                            <div className={styles.name}>{location.state.title}</div>
                            <img src={location.state.card_img} className={`card-img-top ${styles.productImg}`} alt="..."></img>
                            <div className={styles.cateRatingDiv}>
                                <div>
                                    {location.state.category}
                                </div>
                                <span className='svg-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch carousel-icon" viewBox="0 0 16 16">
                                        <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
                                        <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3" />
                                    </svg>&nbsp;{location.state.duration}
                                </span>
                            </div>
                            <div className={styles.ratingType}>
                                <Rating rating={location.state.star_rating} size={"12"} ></Rating>
                                <span className="type-rating">{location.state.type_rating}</span>
                            </div>
                            <div>
                                <p className={styles.description}>{location.state.description}</p>
                            </div>

                        </div>
                    </div>
                </div>
                {showSpinner && <div className={styles.loadingSpinner}><LoadingSpinner title="Loading, Please wait..."></LoadingSpinner></div>}
                {!showSpinner && <div className={styles.theater}>
                    <div className={styles.screen}>
                        <div className={styles.box}>
                            <h5>Screen</h5>
                        </div>
                    </div>
                    <div className={styles.seatingLayout}>
                        <div className={styles.leftSeatingLayout}>
                            {rowSeats.left && Object.keys(rowSeats.left).map(key => {
                                return (
                                    <div className={styles.seatingRowDiv}>
                                        <div><h6 style={{ margin: "0" }}>{key}</h6></div>
                                        {
                                            rowSeats.left[key].map((obj, index) => (<TheaterSeat available={obj.available} count={obj.seat} id={key} setSeats={setSeats}></TheaterSeat>))
                                        }
                                    </div>

                                )

                            })}
                        </div>
                        <div className={styles.rightSeatingLayout}>
                        {rowSeats.right && Object.keys(rowSeats.right).map(key => {
                               return (
                                   <div className={styles.seatingRowDiv}>
                                       <div><h6 style={{ margin: "0" }}>{key}</h6></div>
                                       {
                                           rowSeats.right[key].map((obj, index) => (<TheaterSeat available={obj.available} count={obj.seat} id={key} setSeats={setSeats}></TheaterSeat>))
                                       }
                                   </div>

                               )

                           })}
                        </div>
                    </div>
                    <div className={styles.sampleSeating}>
                        <div>
                            <div className={styles.availableSeat}></div>
                            <h6>Available</h6>
                        </div>
                        <div>
                            <div className={styles.soldSeat}></div>
                            <h6>Sold</h6>
                        </div>
                        <div>
                            <div className={styles.selectedSeat}></div>
                            <h6>Selected</h6>
                        </div>

                    </div>
                </div>}

                <div className={styles.ticket}>
                    <Ticket item={ticket} user={JSON.parse(userDetails)} movieName={location.state.title}></Ticket>
                </div>
            </div>
            <Footer></Footer>

        </div>
    )
}