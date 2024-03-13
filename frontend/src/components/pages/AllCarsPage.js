import ViewData from '../ViewData';
import { connectServer, properties } from '../../config/config';
import { useState } from 'react';
import EditModal from '../EditModal';

const AllCarsPage = ({onNextPage}) => {
    const {host} = connectServer;
    const [url, setUrl] = useState(`${host}/show`);
    const [currentCar, setCurrentCar] = useState(properties);
    const [id, setId] = useState(0);

    const delCar = (id) => {
        setUrl(`${host}/delete?id=${id}`);
    }

    const [activeModal, setActiveModal] = useState('');
    const editCar = (item) => {
        setId(item.id);
        setCurrentCar(item);
        setActiveModal('active');
    }

    return (
        <section className="main-page main-all">
            <div className='main-bg'></div>
            <EditModal 
                activeModal={activeModal} 
                setActiveModal={setActiveModal}
                head='Внесите изменения'
                currentCar={currentCar}
                setCurrentCar={setCurrentCar}
                setUrl={setUrl}
                id={id}
            />
            <div className='background'>
                <ViewData url={url} delCar={delCar} editCar={editCar}/>
            </div>
            <div className="move-view">
                <button className="all-cars-but"
                        onClick={() => onNextPage('start-page')} 
                >
                    На главную
                </button>
                <button className='find-cars-but'
                        onClick={() => onNextPage('find-cars')}
                >
                    найти автомобиль
                </button>
            </div>
        </section>
    );
}

export default AllCarsPage;