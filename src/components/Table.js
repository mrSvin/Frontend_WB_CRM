import React from 'react';
import '../css/Table.css';
import Navbar from "./Navbar";

const Table = () => {
    const data = [
        {
            id: 1,
            title: 'Уведомление 1',
            url: 'https://example.com',
            message: 'Сообщение 1',
            userId: 'user123',
            time: '2025-03-14 10:00:00',
            state: 'Получено',
        },
        {
            id: 2,
            title: 'Уведомление 2',
            url: 'https://example2.com',
            message: 'Оповещение — действие по извещению, уведомлению кого-либо; само сообщение или извещение. Оповещается путем уведомления, как правило, большое количество людей. Оповещение не характеризуется способом передачи и содержанием. Оповещение относится к информации, речи, прикрепленной к официальной или специальной сфере, деловой речи.Оповещение может происходить как с помощью устной речи, так и путем издания, публикации в печати; c использованием средств массовой коммуникации; как в речевой форме, так и путем иcпользования неречевых средств',
            userId: 'user456',
            time: '2025-03-14 11:00:00',
            state: 'Получено',
        },
        {
            id: 3,
            title: 'Уведомление 3',
            url: 'https://example3.com',
            message: 'Сообщение 3',
            userId: 'user789',
            time: '2025-03-14 12:00:00',
            state: 'Отправлено',
        },
    ];

    return (
        <div>
            <Navbar/>
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
                            <td><a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a></td>
                            <td>{item.message}</td>
                            <td>{item.userId}</td>
                            <td>{item.time}</td>
                            <td>{item.state}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
