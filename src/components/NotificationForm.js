import React, {useState} from 'react';
import '../css/NotificationForm.css';
import Navbar from "./Navbar";
import SendNotification from "../api/notifications";
import Papa from 'papaparse'; // Импортируем библиотеку для парсинга CSV

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
        const {name, value} = e.target;
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (sendType === 'csv' && !formData.csvFile) {
            setErrorMessage('Ошибка: загрузите корректный CSV файл перед отправкой');
            setIsModalOpen(true);
            return;
        }

        try {
            if (sendType === 'userId') {
                const result = await SendNotification(
                    formData.userId,
                    formData.title,
                    formData.url,
                    formData.message
                );

                console.log('Уведомление успешно отправлено:', result);
                setErrorMessage('Уведомление успешно отправлено!');
            } else if (sendType === 'csv') {

                // Парсим CSV файл
                Papa.parse(formData.csvFile, {
                    header: true, // Используем первую строку как заголовки
                    dynamicTyping: true, // Автоматически преобразуем типы данных
                    complete: async (results) => {
                        const notifications = results.data;

                        // Проверяем, что CSV файл содержит все необходимые поля
                        if (!notifications.every(n => n.Заголовок && n['Ссылка URL'] && n.Сообщение && n['User ID'])) {
                            setErrorMessage('Ошибка: CSV файл должен содержать поля "Заголовок", "Ссылка URL", "Сообщение", "User ID"');
                            setIsModalOpen(true);
                            return;
                        }

                        // Отправляем каждое уведомление через API
                        for (const notification of notifications) {
                            try {
                                await SendNotification(
                                    notification['User ID'],
                                    notification.Заголовок,
                                    notification['Ссылка URL'],
                                    notification.Сообщение
                                );
                            } catch (error) {
                                console.error('Ошибка при отправке уведомления:', error);
                                setErrorMessage('Ошибка при отправке уведомления из CSV файла');
                                setIsModalOpen(true);
                                return;
                            }
                        }

                        setErrorMessage('Все уведомления из CSV файла успешно отправлены!');
                        setIsModalOpen(true);
                    },
                    error: (error) => {
                        console.error('Ошибка при парсинге CSV файла:', error);
                        setErrorMessage('Ошибка при чтении CSV файла');
                        setIsModalOpen(true);
                    },
                });
            }

            setIsModalOpen(true);
        } catch (error) {
            console.error('Ошибка:', error);
            setErrorMessage('Ошибка при отправке уведомления');
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setErrorMessage('');
    };

    return (
        <div>
            <Navbar/>
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
