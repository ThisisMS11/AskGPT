import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import classes from "./newTopicButton.module.scss";
import { useNavigate } from "react-router-dom";

const NewQuestionButton = () => {

    const navigate = useNavigate();

    const handlenewpostclick = () => {
        navigate('/postq');
    }


    return (

        <div className={classes.button}>
            <button className={classes.newTopicButton} onClick={handlenewpostclick} ><FontAwesomeIcon icon={faPlus} className={classes.icon} />New Topic</button>

        </div>

    )
}

export default NewQuestionButton;