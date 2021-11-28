import TopicItem from "./TopicItem";
import classes from "./TopicsList.module.css";

const TopicsList = (props) => {
  let content =
    props.topics &&
    props.topics
      .filter((item) => item !== "Topic")
      .map((topic) => (
        <TopicItem
          key={topic}
          topic={topic}
          onClickHandler={props.onSelectTopic}
        />
      ));
  return (
    <div className="container">
      <div className={`text-center my-5`}>
        <h2 className={`${classes["main-heading"]}`}>DSA 450 Tracker</h2>
        <h4 className={`${classes["sub-heading"]}`}>
          Your Gateway to Crack Product Based
        </h4>
      </div>
      <div className={`${classes["topic-family"]} shadow rounded`}>
        {content}
      </div>
    </div>
  );
};

export default TopicsList;
