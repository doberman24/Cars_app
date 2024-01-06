import './ViewData.css'
import GetData from "./GetData";
import ItemCar from './ItemCar';
import { properties } from '../config/config';

const ViewData = ({url = 'url', isAddCar = '', disButton ,delCar, editCar}) => {

    let nameTable = 'Перечень автомобилей';
    let tableContents = '';
    let data = '';

    if (isAddCar) {
        nameTable = 'Добавить автомобиль';
        data = isAddCar !== 'url' ? GetData(url) : 'url';
        tableContents = 
            <tr className='input-add-car'>
                {Object.keys(properties).map((key, cell) => {
                    if (key === 'id')
                        return null;
                    return (
                        <td key={cell}>
                            {cell === 1 ? 
                                <input onInput={disButton} name={key} type="text" placeholder='Введите марку' autoFocus/> : 
                                <input name={key} type="text" placeholder='...' />
                            }
                        </td>
                    )
                })}  
            </tr>
    } else {
        data = GetData(url);
        tableContents = data.map((item, i) => {
            return (
                <ItemCar 
                    key={item.id}
                    id={item.id}
                    className='main-view-properties'
                    properties={properties}
                    item={item}
                    count={i}
                    delCar={delCar}
                    editCar={editCar}
                />
            );
        });
    }
    // console.log(data);
    
    return (
        <>
            <h3 className='cars-head'>{nameTable}</h3>
            <div className="table-cars table-cars-create">
                <table className="view-cars">
                    <thead className='main-string'>
                        <tr>
                            {Object.values(properties).map((value, cell) => {
                                if (isAddCar && value === 'id')
                                    return null;
                                return (
                                <th key={cell} >
                                    {value === 'id' ? 
                                        <span>Номер</span> :
                                        <span>{value}</span>
                                    }
                                </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody className='main-body'>
                        {tableContents}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ViewData;