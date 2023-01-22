import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import classes from "./newTopicButton.module.scss";
import { Navigate } from "react-router";
//import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const NewQuestionButton = () => {
    const userId = "userid";
    const navigate = useNavigate();
    const navighandler = () => {
          navigate(`/panel/${userId}`);
 }
  return (
    <div className={classes.button}>
          <button className={classes.newTopicButton} onClick={navighandler}>
        <FontAwesomeIcon icon={faPlus} className={classes.icon} />
        NEW QUERY
      </button>
    </div>
  );
};

export default NewQuestionButton;
