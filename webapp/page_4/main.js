// Инициализация Telegram WebApp для полноэкранного режима
function initTelegramWebApp() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        
        try {
            // Расширяем WebApp на весь экран
            tg.expand();
            
            // Запрашиваем полноэкранный режим если доступен
            tg.requestFullscreen();
            
            // Устанавливаем цвета темы для соответствия приложению
            tg.setHeaderColor('#000000');
            tg.setBackgroundColor('#000000');
            
            // Устанавливаем основную кнопку если нужно
            if (tg.MainButton) {
                tg.MainButton.hide();
            }
            
            console.log('Telegram WebApp инициализирован успешно в полноэкранном режиме');
        } catch (error) {
            console.error('Ошибка инициализации Telegram WebApp:', error);
        }
    } else {
        console.log('Telegram WebApp недоступен - запуск в режиме браузера');
    }
}

// Функция для предотвращения закрытия приложения свайпами
function preventAppClose() {
    let startY = 0;
    let startX = 0;
    let isDragging = false;
    
    // Блокируем touchstart
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
        isDragging = false;
    }, { passive: false });
    
    // Блокируем touchmove
    document.addEventListener('touchmove', function(e) {
        const currentY = e.touches[0].clientY;
        const currentX = e.touches[0].clientX;
        const deltaY = currentY - startY;
        const deltaX = Math.abs(currentX - startX);
        
        // Если пользователь находится в верхней части страницы и свайпает вниз
        if (window.scrollY <= -200 && deltaY > 0) {
            // Блокируем свайп вниз для закрытия приложения
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Если свайп больше горизонтального, то это не закрытие приложения
        if (Math.abs(deltaY) > deltaX) {
            isDragging = true;
        }
    }, { passive: false });
    
    // Блокируем touchend
    document.addEventListener('touchend', function(e) {
        if (isDragging && window.scrollY <= 0) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, { passive: false });
    
    // Дополнительная защита от overscroll
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    document.addEventListener('gesturechange', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    document.addEventListener('gestureend', function(e) {
        e.preventDefault();
    }, { passive: false });
}

// Инициализация при загрузке страницы
window.addEventListener('load', async function() {
    // Инициализируем Telegram WebApp
    if (window.progressManager) {
        console.log('WebApp инициализирован через ProgressManager');
    } else {
        initTelegramWebApp();
    }
    
    // Блокируем свайпы для закрытия приложения
    preventAppClose();
    
    // Сохраняем текущую страницу
    if (window.progressManager) {
        window.progressManager.savePage(4);
    }
});

