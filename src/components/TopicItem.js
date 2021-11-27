import { useCallback, useEffect, useState } from "react";
import { DataBaseService } from "../services/Database";
import classes from "./TopicItem.module.css";

const TopicItem = (props) => {
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const findNumber = useCallback(() => {
    DataBaseService.getCountByTopic(props.topic).then((res) => {
      setNumberOfQuestion(res);
    });
  }, [props.topic]);

  useEffect(() => {
    findNumber();
  }, [findNumber]);

  const onClickHandler = () => {
    props.onClickHandler(props.topic)
  }

  return (
    <div className={`${classes["topic-item-container"]} rounded shadow-sm row g-0`} onClick={onClickHandler}>
      <div className={`col-3 ${classes['icon-container']}`}>
          <span className={`m-2`}>
            <i className={`bi bi-patch-question ${classes['icon-modify']}`}></i>
          </span>
      </div>
      <div className="col-9">
        <div className={classes['item-content']}>
          <p className={`${classes['item-heading']}`}>{props.topic}</p>
          <span className={`badge rounded-circle bg-success ${classes['item-number']}`}>
              {numberOfQuestion}
            </span>
        </div>
      </div>
    </div>
  );
};

export default TopicItem;
