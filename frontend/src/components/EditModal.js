import './Modal.css'
import { connectServer, properties } from '../config/config';

const EditModal = ({activeModal, setActiveModal, head, currentCar, setCurrentCar, setUrl, id}) => {

  const {host} = connectServer;  
  let concatUrl = `${host}/edit?`;
  const sendReqEdit = (evt) => {
      evt.preventDefault();
      Object.keys(properties).map((item, i) => {
          if (item === 'id') {
              concatUrl += `id=${id}&`
              return null;
          }
          concatUrl += evt.target[i].value && `${item}=${evt.target[i].value}&`;
          return concatUrl;
      });
      setUrl(concatUrl);
      setActiveModal('');
  }
  
  return (
    <section className={`edit-modal ${activeModal}`}>
      <section className='modal'>
        <h3 className="modal-head">{head}</h3>
        <div className="modal-body">
          <form className='form-edit' method='post' onSubmit={sendReqEdit}>
            <fieldset className='props auto-props'>
              {Object.entries(properties).map(([key, value], i) => {
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
                      onChange={e => {
                        setCurrentCar(e.target.value);
                      }}
                      value={currentCar[key]}
                    />
                  </label>
                );
              })}
            </fieldset>
            <fieldset className='props butt-props edit-butt-props'>
                <button className="edit-car-move" type='submit'>Изменить</button>
                <button onClick={() => setActiveModal('')} className="reset-edit" type='button'>Отменить</button>
            </fieldset>
          </form>
        </div>
      </section>
    </section>
  );
}

export default EditModal;