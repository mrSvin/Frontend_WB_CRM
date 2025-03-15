import React, { useEffect, useState } from 'react';
import '../css/Table.css';
import Navbar from "./Navbar";

const Table = () => {
    const [data, setData] = useState([]); // Состояние для хранения данных

    const fetchNotifications = async () => {
        try {
            const response = await fetch('http://localhost:8080/notifications');
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных');
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

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
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
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
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;