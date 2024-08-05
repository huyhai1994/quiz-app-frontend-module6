import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Master from "./pages/admin/Master";
import Category from "./pages/category/Category";

function App() {
    return (<Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/admin" element={<Master/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="*" element={<h1>Page not found</h1>}/>
    </Routes>);
}

export default App;
