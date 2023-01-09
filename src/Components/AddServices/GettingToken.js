import React , {useState,useEffect} from 'react'
import { AsyncStorage } from 'AsyncStorage';

const GettingToken = () => {
    const [token,setToken]= useState();
    const GetToken= async ()=>{
        try{
          let token = await AsyncStorage.getItem('token');
          let parsed = JSON.parse(token);
          if(parsed !== null){
            setToken(parsed);
          }
        }catch{
            return null;
        }
      }
      useEffect(() => {
        GetToken()
      }, [])
  return token
}

export default GettingToken