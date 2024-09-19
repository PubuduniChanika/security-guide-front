import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await UserService.login(email, password);
            if (userData.token){
                localStorage.setItem("token", userData.token);
                localStorage.setItem("role", userData.role);
                navigate('/profile');
                window.location.reload(); // Refresh the page to get the updated user data from the server
                
            }else{
                setError(userData.message)
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            setTimeout(() =>{
                setError("");
            }, 5000);
        }
    }
    return(
        <div className="auth-container"> 
            <h1>Login</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" value={email} onChange = {(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" value={password} onChange = {(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>

            </form>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    )

}

export default LoginPage;