import './Modal.css';

const CreateModal = ({activeModal, closeModal, head, content}) => {

    return (
        <section className={`all-modal ${activeModal}`}>
            <section className='modal'>
                <h3 className="modal-head">{head}</h3>
                <div className="modal-body">
                    <p>{content}</p>
                    <button className='add-ok' onClick={closeModal}>ОК</button>
                </div>
            </section>
        </section>
    );
}

export default CreateModal;