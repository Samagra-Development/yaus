import React, {useEffect} from "react";

import { useHistory } from "react-router-dom";

function Protect(props){
    let Cmp=props.Cmp
const history=useHistory();
    useEffect(()=>{
        if(!localStorage.getItem('user-info')){
          history.push('/register')
        }
      },[])
    
    return(
        <div>
            <Cmp/>

        </div>
    )
}

export default Protect