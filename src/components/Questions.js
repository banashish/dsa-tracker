import classes from "./Questions.module.css";
import QuestionsList from "./QuestionsList";

const Questions = (props) => {
  const onClickHandler = () => {
    props.onSelectTopic(null);
  }
  return (
    <div className="container">
      <div className={`text-center my-5`}>
        <h2 className={`${classes["main-heading"]}`}>&#10024; {`${props.selectedTopic} Problems`}</h2>
        <h4 className={`${classes["sub-heading"]}`}>
          <span onClick={onClickHandler} className={classes.back}>Topics</span>
          &nbsp; &rsaquo; &nbsp;
          <span className="badge bg-dark">{props.selectedTopic}</span>
        </h4>
      </div>
      <div className={`${classes["topic-family"]} shadow rounded`}>
        <QuestionsList topic={props.selectedTopic}/>
      </div>
    </div>
  );
};

export default Questions;
