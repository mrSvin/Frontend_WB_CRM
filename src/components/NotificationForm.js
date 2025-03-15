import React, { useState } from 'react';
import '../css/NotificationForm.css';
import Navbar from "./Navbar";

const NotificationForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        message: '',
        userId: '',
        csvFile: null,
    });

    const [sendType, setSendType] = useState('userId');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        const fileName = file.name.toLowerCase();

        // Проверяем, оканчивается ли имя файла на ".csv"
        if (!fileName.endsWith('.csv')) {
            setFormData({
                ...formData,
                csvFile: null, // сбрасываем файл
            });
            setErrorMessage('Ошибка: выберите файл с расширением .csv');
            setIsModalOpen(true); // открываем модалку с ошибкой
            return;
        }

        // Если все ок, обновляем csvFile
        setFormData({
            ...formData,
            csvFile: file,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (sendType === 'csv' && !formData.csvFile) {
            setErrorMessage('Ошибка: загрузите корректный CSV файл перед отправкой');
            setIsModalOpen(true);
            return;
        }

        if (sendType === 'userId') {
            console.log('Отправка по User ID:', formData.userId);
        } else if (sendType === 'csv') {
            console.log('Отправка по CSV:', formData.csvFile);
        }

        console.log('Form Data Submitted:', formData);
        setErrorMessage('Уведомление успешно отправлено!');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setErrorMessage('');
    };

    return (
        <div>
            <Navbar />
            <div className="notification-form-container-wrapper">
                <div className="notification-form-container">
                    <h2>Создание уведомления</h2>
                    <form onSubmit={handleSubmit} className="notification-form">
                        <div className="form-group">
                            <label htmlFor="title">Заголовок</label>
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
                            <label htmlFor="url">Ссылка URL</label>
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
                            <label htmlFor="message">Сообщение</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group radio-wrap">
                            <label>Тип отправки</label>
                            <div className="radio-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="sendType"
                                        value="userId"
                                        checked={sendType === 'userId'}
                                        onChange={() => setSendType('userId')}
                                    />
                                    User ID
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="sendType"
                                        value="csv"
                                        checked={sendType === 'csv'}
                                        onChange={() => setSendType('csv')}
                                    />
                                    CSV
                                </label>
                            </div>
                        </div>

                        {sendType === 'userId' && (
                            <div className="form-group">
                                <label htmlFor="userId">User ID</label>
                                <input
                                    type="text"
                                    id="userId"
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        {sendType === 'csv' && (
                            <div className="form-group">
                                <label htmlFor="csvFile">Загрузить CSV файл</label>
                                <input
                                    type="file"
                                    id="csvFile"
                                    name="csvFile"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    required
                                />
                                {formData.csvFile && (
                                    <p>Файл выбран: {formData.csvFile.name}</p>
                                )}
                            </div>
                        )}

                        <button type="submit" className="submit-button">
                            Отправить
                        </button>
                    </form>

                    {isModalOpen && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h3>{errorMessage}</h3>
                                <button onClick={closeModal} className="modal-button">OK</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationForm;
