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
  console.log(questions)
  useEffect(() => {
    findQuestions();
  }, [findQuestions]);
  return (
    <table className={`table table-success ${classes["table-main"]}`}>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colSpan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  );
};

export default QuestionsList;
