import React, {useState} from 'react'
import {axiosWithAuth} from '../utils/axioswithAuth'
import { useHistory } from "react-router-dom";

const initialValues = {
    credentials: {
        username: '',
        password: ''
    }
  } 


 const LoginPage = () => {
    let history = useHistory();
    const [values, setValues] = useState(initialValues.credentials);
    console.log(values)
    const handleChanges = (event) => {
    
        setValues({...values,[event.target.name] : event.target.value });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        
        axiosWithAuth()
          .post('/api/login', values)
          .then(res => {
            window.localStorage.setItem('token', res.data.payload);
            // navigate the user to /protected (whatever landing page)
            history.push('/bubblepage');
          })
          .catch(err => console.log(err));
   
      };

    return (
        <div className="login">
            <h1>Login</h1>
            <div className="form">
                <input type="text" name="username" value={values.username} onChange={handleChanges} placeholder="Username"  />
                <input type="password" name ="password" value={values.password} onChange={handleChanges} placeholder="Password"  />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default LoginPage;