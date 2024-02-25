import { useDispatch, useSelector } from "react-redux"
import styles from "./TheaterSeat.module.css"
import { addselectedSeats, getSelectedSeat } from "../../store/slices/movieSlices"

export function TheaterSeat(props) {
    const dispatch = useDispatch()
    const seats = useSelector(getSelectedSeat)
    
    function handleclick(values) {
        var arr = []
        if (seats.length > 0) {
            seats.map((seat)=>arr.push(seat))
            const seatAreadyExistsIndex = arr.findIndex(
                (i) => i.id === props.id+props.count
            )
            if (seatAreadyExistsIndex != -1) {
                arr.splice(seatAreadyExistsIndex, 1)
                dispatch(addselectedSeats(arr))
            } else {
                arr.push({ row: props.id, seat_no: props.count, id:props.id+props.count,price:180 })
                dispatch(addselectedSeats(arr))
            }

        } else {
            arr.push({ row: props.id, seat_no: props.count,id:props.id+props.count, price:180 })
            dispatch(addselectedSeats(arr))
        }
        // arr.push({ row: props.id, seat_no: props.count })
        // dispatch(addselectedSeats(arr))
        // props.setseats({row:props.id,seat_no:props.count})
    }
    return (
        <div >
            {
                props.available && <div className={styles.theaterSeat}><input type="checkbox" onClick={handleclick} value={props.id + props.count} id={`s${props.id + props.count}`} className={styles.availableSeat}></input>
                    <label className={styles.seatLabel} htmlFor={`s${props.id + props.count}`}>{props.count}</label></div>
            }
            {!props.available && <div className={styles.soldSeat}>{props.count}</div>}

        </div>

    )
}