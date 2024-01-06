import './AddCarPage.css'
import ViewData from '../ViewData';
import { connectServer, properties } from '../../config/config';
import { useState } from 'react';
import CreateModal from '../CreateModal';

const AddCarPage = ({ onNextPage }) => {
    const [activeModal, setActiveModal] = useState('');
    const [activeButton, setActiveButton] = useState(true);
    
    const {host} = connectServer;
    const [url, setUrl] = useState('url');
    let concatUrl = '';
    const createCar = (evt) => {
        evt.preventDefault();
        setUrl('');
        concatUrl = `${host}/create?`;
        Object.keys(properties).map((item, i) => {
            if (item === 'id')
                return null;
            concatUrl += evt.target[i - 1].value && `${item}=${evt.target[i - 1].value}&`
            evt.target[i - 1].value = '';
            return concatUrl;
        });    
        setUrl(concatUrl);
        setActiveModal('active');
    }

    const closeCreateModal = () => {
        setActiveModal('');
        setUrl('url');
        setActiveButton(true);
    }

    const disButton = (evt) => {
        if (evt.target.value)
            setActiveButton(false);
        else
            setActiveButton(true);
    }

    return (
        <section className="main-page main-create">
            <CreateModal 
                activeModal={activeModal} 
                closeModal={closeCreateModal}
                head='Добавление автомобиля'
                content='Данные удачно добавлены'
            />
            <form className='form-create' method='post' onSubmit={createCar}>
                <div className='background'>
                    <ViewData url={url} isAddCar={url} disButton={disButton}/>
                </div>
                <button className='create-button' type='submit' disabled={activeButton}>Добавить в базу</button>
            </form>
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

export default AddCarPage;