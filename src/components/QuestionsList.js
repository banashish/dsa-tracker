import { useCallback, useEffect, useState } from "react";
import { DataBaseService } from "../services/Database";
import classes from "./QuestionsList.module.css";

const QuestionsList = (props) => {
  const [questions, setQuestion] = useState([]);
  const findQuestions = useCallback(() => {
    DataBaseService.getQuestionsByTopic(props.topic).then((res) => {
      setQuestion(res);
    });
  }, [props.topic]);
  const markQuestionAsDoneHandler = (id, index) => {
    DataBaseService.updateById(id, {...questions[index], done: true}).then((res) => {
        setQuestion(res);
    })
  }
  useEffect(() => {
    findQuestions();
  }, [findQuestions]);
  return (
    <table className={`table table-success ${classes["table-main"]}`}>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Question</th>
          <th scope="col">Completed</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((question,index) => (
          <tr key={question.id}>
            <th scope="row">{index+1}</th>
            <td className={classes.problem}>{question.problem}</td>
            <td>
              {!question.done && (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onClick={markQuestionAsDoneHandler.bind(null, question.id, index)}
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Mark as completed
                  </label>
                </div>
              )}
              {question.done && <p className={classes.completed}>&#9989; Completed</p>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuestionsList;
