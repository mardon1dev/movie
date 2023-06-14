import { useEffect, useState, createContext } from "react";
import axios from 'axios';

export const WatchContext = createContext();

export const WatchProvider = ({children}) => {

    const [ data, setData ] = useState(null);

    const [input, setInput] = useState();

    const options = {
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/v2/search/basic',
        params: {
          country: 'us',
          services: 'netflix,prime.buy,hulu.addon.hbo,peacock.free',
          output_language: 'en',
          show_type: 'movie',
          genre: '12',
          show_original_language: 'en',
          keyword: 'family'
        },
        headers: {
          'X-RapidAPI-Key': '7aabe2c94cmsh667a633f957c82dp136b53jsn53721ea38cb3',
          'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
      };

      const getData = async() =>{
        const response = await axios.request(options);
        setData(response.data.result);
      }

    useEffect(()=>{
        getData()
    }, []);

    return (
        <WatchContext.Provider value={{data,input}}>
            {children}
        </WatchContext.Provider>
    )   
    
    }
