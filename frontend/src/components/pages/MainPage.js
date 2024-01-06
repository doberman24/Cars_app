import './MainPage.css'
import GetData from "../GetData";
import { connectServer } from '../../config/config';


const MainPage = ({onNextPage}) => {
    const {host} = connectServer
    const data = GetData(host);
    return (
        <section className="main-page">
            <div className='main-head'>{data}</div>
            <div className="move-view">
                <button 
                    className='all-cars-but' 
                    onClick={() => onNextPage('all-cars')}
                >
                    посмотреть все автомобили
                </button>
                <button 
                    className='find-cars-but'
                    onClick={() => onNextPage('find-cars')}
                >
                    найти автомобиль
                </button>
                <button 
                    className='add-car-but' 
                    onClick={() => onNextPage('add-car')}
                >
                    добавить автомобиль
                </button>
            </div>
        </section>
    );
   
}

export default MainPage; 