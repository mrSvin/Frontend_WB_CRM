import React, { useState } from 'react';
import '../css/NotificationForm.css';

const NotificationForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        message: '',
        userId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь нужно добавить логику отправки данных
        console.log('Form Data Submitted:', formData);
        alert('Уведомление отправлено!');
    };

    return (
        <div className="notification-form-container">
            <h2>Отправка уведомления</h2>
            <form onSubmit={handleSubmit} className="notification-form">
                <div className="form-group">
                    <label htmlFor="title">Заголовок:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="url">Ссылка URL:</label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Сообщение:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="userId">User ID:</label>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    Отправить
                </button>
            </form>
        </div>
    );
};

export default NotificationForm;