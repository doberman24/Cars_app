import { useEffect, useState } from 'react';

function GetData(url) {

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(
      result => {
        setData(result);
      },
      error => {
        console.log(error);
      }
    )
  }, [url]);

  return data;
}

export default GetData;
