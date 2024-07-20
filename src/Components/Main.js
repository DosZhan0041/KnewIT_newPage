import { useEffect, useState } from "react"
import Rewiews from "./Rewiews"
import { BrowserRouter as Router} from 'react-router-dom';
import AppRoutes from "../Routes";


function Main() {
    const initialTime = { hour: 15, minutes: 22, seconds: 59 };
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => {
                let { hour, minutes, seconds } = prevTime;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hour > 10) {
                    hour--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    return initialTime;
                }

                return { hour, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main>

            <nav>
                <div class="nav-left">
                    <h2 className="start">28 июля старт:</h2>
                    <div className="number_main"><span className="numbers">04</span>:<span className="numbers">{time.hour.toString().padStart(2, '0')}</span>:
                        <span className="numbers">{time.minutes.toString().padStart(2, '0')}</span>:
                        <span className="numbers">{time.seconds.toString().padStart(2, '0')}</span></div>
                    <h3>скидка 20% при полной оплате, успейте записаться!</h3>
                    <p>Посети наш пробный урок, и узнай как стать программистом с нуля!</p>
                </div>
                <Router>
                    <AppRoutes />
                </Router>
            </nav>
            <aside>
                <div class="aside-left">
                    <h1>Knew IT</h1>
                    <h3>Knew IT - это первая школа программирования в Казахстане. За 11 лет мы обучили 10000 выпускников.</h3>
                    <h4>Наша школа обучает программистов для Kaspi, Qazqom, Samruk, Атамекен, Coca-cola и KCell.</h4>
                </div>
                <div class="aside-right">
                    <img src="../Assets/team.jpg" alt="" />
                </div>
            </aside>
            <Rewiews />
        </main>
    )
}


export default Main