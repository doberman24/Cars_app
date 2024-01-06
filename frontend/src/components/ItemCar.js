import { useState } from "react";

const ItemCar = ({id, className, properties, item, count, delCar, editCar}) => {

    const [isHover, setIsHover] = useState(false);
    const addCorrectData = () => {
        setIsHover(true);
    }
    const moveCorrectData = () => {
        setIsHover(false);
    }

    const onDelCar = () => {
        delCar(id);
    }

    const onEditCar = () => {
        editCar(item);
    }


    return (
    <tr 
        onMouseOver={addCorrectData}
        onMouseOut={moveCorrectData}
        className={`${className} ${isHover ? 'correct' : ''}`} 
    >
        {Object.keys(properties).map((key, cell) => 
            <td key={cell}>
                {key === 'id' ? count + 1 : 
                item[key] ? item[key] : ''}
            </td>
        )}
        <td className='correct-buttons'>
            <span 
                className="del" 
                title="Удалить"
                onClick={onDelCar}
            >
                &#10006;
            </span>
            <span 
                className="edit" 
                title="Править"
                onClick={onEditCar}
            >
                &#128397;</span>
        </td>

    </tr>
    );
}

export default ItemCar;


// onMouseOver={addCorrectData} 
// onMouseOut={moveCorrectData}