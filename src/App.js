import Home from "./components/Home";
import QuestionsContextProvider from "./store/QuestionsContextProvider";

function App() {
  return <QuestionsContextProvider>
    <Home />
  </QuestionsContextProvider>
}

export default App;
