import React, { useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { useParams } from 'react-router-dom';


function Front() {

    const {title} = useParams();
    const capitalizedItemName = title.charAt(0).toUpperCase() + title.slice(1);

    const [data, setdata] = useState({
        name: '',
        phone: '',
        city: '',
        interest: {capitalizedItemName},
        details: ''
    })

    const [showForm, setShowForm] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://669a61ab9ba098ed61ff6f28.mockapi.io/knewit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data })
            });

            if (response.ok) {
                alert('Заявка успешно отправлена!');
                setShowForm(false);
            } else {
                alert('Произошла ошибка при отправке заявки.');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке заявки.');
        }
    };
    return (
        <div className='course'>
            <div class="nav-right">
                <div className='course_header'>
                    <p>{capitalizedItemName}</p>
                    <img src={`../Assets/${title}.png`} alt="" />
                </div>
                <button class="wh_button">Учебный план</button>
                <button class="bl_button" onClick={() => { setShowForm(true) }}>Оставить заявку</button>
            </div>
            <div className={`modal ${showForm ? `` : `disable`}`}>
                <div className='background' onClick={() => { setShowForm(false) }}></div>
                <form onSubmit={handleSubmit} className="form">
                    <IoIosClose onClick={() => { setShowForm(false) }} className="icon_remove" />
                    <h1>Оставить заявку</h1>
                    <p>Заполни эту форму, чтобы пройти бесплатный урок!</p>
                    <h3>Начните изучать кодинг уже сегодня!</h3>
                    <div className="form_input">
                        <input type="text" placeholder="Имя" value={data.name} name="name" onChange={handleChange}></input>
                        <input type="number" placeholder="Телефон" autoComplete="off" value={data.phone} name="phone" onChange={handleChange}></input>
                        <input type="text" placeholder="Город" autoComplete="off" value={data.city} name="city" onChange={handleChange}></input>
                        {/* <select placeholder="Что вас интересует?" name="interest" value={data.interest} onChange={handleChange}>
                        <option value='Frontend'>Frontend</option>
                        <option value='Python'>Python</option>
                        <option value='Analyse'>Анализ данных</option>
                        <option value='С++'>С++</option>
                        <option value='Java'>Java</option>
                        <option value='Child'>Детские курсы</option>
                        <option value='Start'>Курсы для новичков</option>
                    </select> */}
                        <input type="text" placeholder="Подробнее" autoComplete="off" value={data.details} name="details" onChange={handleChange}></input>
                    </div>
                    <button type="submit">Отправить заявку</button>
                </form>
            </div>
        </div>
    )
}

export default Front