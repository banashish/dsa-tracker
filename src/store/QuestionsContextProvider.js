import {useEffect, useReducer} from "react";
import { DataBaseService } from "../services/Database";
import QuestionsContext from "./questions-context";
import fileRead from "../services/ExcelToJSON";
import file from "../assets/FINAL450.xlsx";

const seedData = async () => {
    const res = await fetch(file);
    const blob = await res.blob();
    const data = await fileRead(blob);
    const modifiedData = data.map((item) => ({
      topic: item.Topic,
      problem: item.Problem,
      done: false,
    }));
    await DataBaseService.addInBulk(modifiedData);
};

const defaultState = {
    topics: []
}

const reducer = (state, action) => {
    if(action.type === "SET_CATEGORIES") {
        return {
            ...state,
            topics: action.topics
        }
    }
    return defaultState
}


const QuestionsContextProvider = props => {
    const [state, dispatch ] = useReducer(reducer, {})

    useEffect(() => {
        DataBaseService.init().then(async () => {
          const count = await DataBaseService.getCountForAll();
          if (!count) {
            await seedData();
          }
          const topics = await DataBaseService.getAllTopics();
          dispatch({
              type: "SET_CATEGORIES",
              topics: topics
          })
        });
    
        return () => {};
      }, []);

    const questionContext = {
        topics: state.topics
    }
    return <QuestionsContext.Provider value={questionContext}>
        {props.children}
    </QuestionsContext.Provider>
}

export default QuestionsContextProvider;