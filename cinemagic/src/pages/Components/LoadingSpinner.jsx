import { SyncLoader} from "react-spinners";
import styles from "./LoadinSpinner.module.css"


export function LoadingSpinner(props) {
    return (
        <div className={styles.LoadingSpinner}>
            <SyncLoader color="#FEE505" size={30}></SyncLoader>
            <p>{props.title}</p>
        </div>
    )
}