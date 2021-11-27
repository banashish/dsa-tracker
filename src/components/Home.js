import React, { useContext, useState } from "react";
import QuestionsContext from "../store/questions-context";
import Questions from "./Questions";
import TopicsList from "./TopicsList";

const Home = () => {
  const { topics } = useContext(QuestionsContext);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const selectTopicHandler = (topic) => {
    setSelectedTopic(topic);
  };
  return (
    <React.Fragment>
      {!selectedTopic && (
        <TopicsList topics={topics} onSelectTopic={selectTopicHandler} />
      )}
      {selectedTopic && <Questions selectedTopic={selectedTopic} onSelectTopic={selectTopicHandler} />}
    </React.Fragment>
  );
};

export default Home;
