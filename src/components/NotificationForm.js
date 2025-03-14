import React, {useState} from 'react';
import '../css/NotificationForm.css';

const NotificationForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        message: '',
        userId: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Отправка данных
        console.log('Form Data Submitted:', formData);
        setIsModalOpen(true); // Открытие модалки
    };

    const closeModal = () => {
        setIsModalOpen(false); // Закрытие модалки
    };


    return (
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
                    <button type="submit" className="submit-button">
                        Отправить
                    </button>
                </form>

                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Уведомление отправлено!</h3>
                            <button onClick={closeModal} className="modal-button">OK</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default NotificationForm;