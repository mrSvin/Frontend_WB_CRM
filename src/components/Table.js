import React, { useEffect, useState } from 'react';
import '../css/Table.css';
import Navbar from "./Navbar";
import SendNotification from "../api/notifications"; // Импортируем функцию

const Table = () => {
    const [data, setData] = useState([]); // Состояние для хранения данных
    const [loading, setLoading] = useState(true); // Состояние для отображения загрузки
    const [error, setError] = useState(null); // Состояние для отображения ошибки

    // Функция для получения данных через API
    const fetchNotifications = async () => {
        try {
            const response = await fetch('http://localhost:8080/notifications');
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных');
            }
            const result = await response.json();

            // Проверяем, что данные не null и не пустой массив
            if (result === null || result.length === 0) {
                setData([]); // Устанавливаем пустой массив
            } else {
                setData(result); // Сохраняем данные в состоянии
            }
        } catch (error) {
            console.error('Ошибка:', error);
            setError(error.message); // Сохраняем ошибку
        } finally {
            setLoading(false); // Загрузка завершена
        }
    };

    // Вызов функции при монтировании компонента
    useEffect(() => {
        fetchNotifications();
    }, []);

    // Если данные загружаются, показываем индикатор загрузки
    if (loading) {
        return <div>Загрузка...</div>;
    }

    // Если произошла ошибка, показываем сообщение об ошибке
    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="table-container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Заголовок</th>
                        <th>Ссылка URL</th>
                        <th>Сообщение</th>
                        <th>Получатель User ID</th>
                        <th>Время отправки</th>
                        <th>Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.length === 0 ? ( // Проверяем, пуст ли массив данных
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>
                                Нет данных для отображения
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td >{item.title}</td>
                                <td>
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                        {item.url}
                                    </a>
                                </td>
                                <td>{item.message}</td>
                                <td>{item.user_id}</td>
                                <td>{new Date(item.created_at).toLocaleString()}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;