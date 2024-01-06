import { useState } from "react";
import MainPage from "./components/pages/MainPage";
import AllCarsPage from './components/pages/AllCarsPage';
import FindCarsPage from './components/pages/FindCarsPage';
import AddCarPage from './components/pages/AddCarPage';

function App() {

  const [page, setPage] = useState('start-page');

  const clickChoice = (type) => {
    setPage(type);
  }

  const getPage = (route) => {
    switch (route) {
      case 'start-page':
        return <MainPage onNextPage={clickChoice}/>;
      case 'all-cars':
        return <AllCarsPage onNextPage={clickChoice}/>;
      case 'find-cars':
        return <FindCarsPage onNextPage={clickChoice}/>;
      case 'add-car':
        return <AddCarPage onNextPage={clickChoice}/>;
      default:
        return null;
    }
  }

  return getPage(page);
}

export default App;
