// Подключаем ProgressManager
// <script src="../progress.js"></script> должен быть в HTML

// Инициализация Telegram WebApp для полноэкранного режима
function initTelegramWebApp() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        
        try {
            // Расширяем WebApp на весь экран
            tg.expand();
            
            // Запрашиваем полноэкранный режим если доступен
            if (tg.requestFullscreen) {
                tg.requestFullscreen();
            }
            
            // Устанавливаем цвета темы для соответствия приложению
            tg.setHeaderColor('#000000');
            tg.setBackgroundColor('#000000');
            
            // Отключаем подтверждение закрытия для предотвращения сообщения "изменения могут не сохраниться"
            if (tg.enableClosingConfirmation) {
                // Не включаем подтверждение закрытия
            }
            
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

// Определяем базовый путь к картинкам (теперь относительно текущего домена)
let baseImgUrl = window.location.origin + "/";

// Пример: document.getElementById('main-img').src = baseImgUrl + '1_page_photo.jpeg';

// Принудительная загрузка изображений для iPhone Safari
function forceLoadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Создаем новый Image объект для принудительной загрузки
        const newImg = new Image();
        newImg.onload = function() {
            img.src = this.src;
            img.style.opacity = '1';
        };
        newImg.onerror = function() {
            console.error('Failed to load image:', this.src);
            // Попробуем загрузить через fetch
            fetch(this.src)
                .then(response => response.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    img.src = url;
                    img.style.opacity = '1';
                })
                .catch(err => {
                    console.error('Fetch also failed:', err);
                });
        };
        newImg.src = img.src;
    });
}

// Предзагрузка изображений для быстрой загрузки
function preloadImages() {
    const images = ['../6_page_photo.jpeg'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Инициализация при загрузке страницы
window.addEventListener('load', function() {
    console.log('=== ЗАГРУЗКА 5-Й СТРАНИЦЫ ===');
    console.log('URL:', window.location.href);
    console.log('ProgressManager доступен:', !!window.progressManager);
    console.log('User ID:', window.progressManager ? window.progressManager.userId : 'неизвестен');
    
    // Блокируем свайпы для закрытия приложения
    preventAppClose();
    // Инициализируем Telegram WebApp
    initTelegramWebApp();
    
    // Загружаем изображения
    preloadImages();
    setTimeout(forceLoadImages, 100);
    
    // Принудительно сохраняем текущую страницу
    if (window.progressManager) {
        console.log('ProgressManager доступен, сохраняем страницу 5...');
        try {
            window.progressManager.savePage(5);
            console.log('Сохранение страницы 5 завершено');
        } catch (error) {
            console.error('Ошибка при сохранении страницы 5:', error);
        }
    } else {
        console.error('ProgressManager недоступен на 5-й странице!');
    }
});

// Функция перехода на следующую страницу
function goToNextPage() {
    const container = document.querySelector('.container');
    
    // Добавляем анимацию "ветра"
    container.classList.add('wind-transition');
    
    // Ждём окончания анимации и переходим
    setTimeout(() => {
        // Переходим на следующую страницу через ProgressManager
        if (window.progressManager) {
            window.progressManager.goToNextPage();
        } else {
            // Fallback если ProgressManager не загружен
            const currentUrl = window.location.href;
            const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get('user_id');
            const newUrl = baseUrl + '/../page_6/index.html' + (userId ? `?user_id=${userId}` : '');
            
            console.log('Navigating to:', newUrl);
            window.location.href = newUrl;
        }
    }, 500);
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
        // Теперь у нас есть scroll-buffer, поэтому проверяем только если мы выше него
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

// Обработчик кнопки "А дальше что?"
document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.querySelector('.lets-go');
    if (nextBtn) {
        nextBtn.addEventListener('click', goToNextPage);
    }
}); 