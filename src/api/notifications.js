const SendNotification = async (userId, title, url, message) => {
    const notificationData = {
        user_id: parseInt(userId, 10), // Преобразуем userId в число
        title,
        url,
        message,
    };

    // Отправка POST-запроса на сервер
    const response = await fetch('http://localhost:8080/notifications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData),
    });

    if (!response.ok) {
        throw new Error('Ошибка при отправке уведомления');
    }

    return response.json();
};

export default SendNotification
