import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import classes from "./newTopicButton.module.scss";
const NewQuestionButton = () => {
    return (

        <div className={classes.button}>
            <button className={classes.newTopicButton}><FontAwesomeIcon icon={faPlus} className={classes.icon} />New Topic</button>

        </div>

    )
}

export default NewQuestionButton;