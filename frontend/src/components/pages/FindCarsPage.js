import './FormsCars.css';
import ViewData from "../ViewData";
import { connectServer, properties } from '../../config/config';
import { useState } from 'react';
import EditModal from '../EditModal';

const FindCarsPage = ({onNextPage}) => {
    const {host} = connectServer;
    const [url, setUrl] = useState('');
    let concatUrl = '';
    const findCarMove = (evt) => {
        evt.preventDefault();
        setUrl('');
        concatUrl = `${host}/find?`;
        Object.keys(properties).map((item, i) => {
            if (item === 'id') {
                return null;
            }
            concatUrl += evt.target[i].value && `${item}=${evt.target[i].value}&`;
            evt.target[i].value = '';
            return concatUrl;
        });
        setUrl(concatUrl);
    };
    const delCar = (id) => {
        setUrl(`${host}/delete?id=${id}`);
    }

    const [currentCar, setCurrentCar] = useState(properties);
    const [id, setId] = useState(0);
    const [activeModal, setActiveModal] = useState('');
    const editCar = (item) => {
        setId(item.id);
        setCurrentCar(item);
        setActiveModal('active');
    }

    return (
        <section className="main-page main-all">
            <EditModal 
                activeModal={activeModal} 
                setActiveModal={setActiveModal}
                head='Внесите изменения'
                currentCar={currentCar}
                setCurrentCar={setCurrentCar}
                setUrl={setUrl}
                id={id}
            />
            <form className='form-find' method='post' onSubmit={findCarMove}>
                <fieldset className='props auto-props'>
                    {Object.entries(properties).map(([key, value]) => {
                        if (value === 'id') {
                            return null;
                        };
                        return (
                            <label  key={key} className='one-property'>
                                <label className='property' htmlFor={key}>{value}</label>
                                <input 
                                    className='value-property' 
                                    id={key} 
                                    name={key} 
                                    type="text"
                                    placeholder={key === 'make' ? 'Введите марку' : `Введите ${value.toLowerCase()}`}
                                />
                            </label>
                            );
                        })}
                </fieldset>
                <fieldset className='props butt-props'>
                    <button className="find-car-move" type='submit'>Найти</button>
                    <button className="reset-find" type='reset'>Сброс</button>
                </fieldset>
            </form>
            <div className='background find-background'>
                <ViewData url={url || `${host}/find`} delCar={delCar} editCar={editCar}/>
            </div>
            <div className="move-view move-view-find">
                <button className='all-cars-but'
                        onClick={() => onNextPage('all-cars')}
                >
                    посмотреть все автомобили
                </button>
            </div>
        </section>
    );
}

export default FindCarsPage;