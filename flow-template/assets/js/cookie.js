/**
 * Cookie Banner Script
 * Управление отображением и согласием на использование cookies
 */

(function() {
    'use strict';

    // Проверка, было ли уже дано согласие
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Установка cookie
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Показать баннер cookie
    function showCookieBanner() {
        var cookieBanner = document.getElementById('cookie-banner');
        if (cookieBanner) {
            cookieBanner.style.display = 'block';
            // Плавное появление
            setTimeout(function() {
                cookieBanner.style.opacity = '1';
                cookieBanner.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // Скрыть баннер cookie
    function hideCookieBanner() {
        var cookieBanner = document.getElementById('cookie-banner');
        if (cookieBanner) {
            cookieBanner.style.opacity = '0';
            cookieBanner.style.transform = 'translateY(20px)';
            setTimeout(function() {
                cookieBanner.style.display = 'none';
            }, 300);
        }
    }

    // Обработка принятия cookies
    function acceptCookies() {
        setCookie('cookieConsent', 'accepted', 365); // Храним согласие 1 год
        hideCookieBanner();
        
        // Здесь можно добавить код для инициализации аналитики, рекламы и т.д.
        // Например: initGoogleAnalytics();
    }

    // Обработка настроек cookies (опционально)
    function openCookiePreferences() {
        // Здесь можно открыть модальное окно с настройками cookies
        alert('Настройки cookies. Здесь можно добавить детальные настройки.');
    }

    // Инициализация при загрузке страницы
    function initCookieBanner() {
        // Проверяем, было ли уже дано согласие
        var consent = getCookie('cookieConsent');
        
        if (!consent) {
            // Показываем баннер через небольшую задержку для лучшего UX
            setTimeout(function() {
                showCookieBanner();
            }, 1000);
        }

        // Обработчики событий
        var acceptBtn = document.getElementById('accept-cookies');
        var prefBtn = document.getElementById('cookie-preferences');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', acceptCookies);
        } else {
            console.warn('Кнопка accept-cookies не найдена');
        }

        if (prefBtn) {
            prefBtn.addEventListener('click', openCookiePreferences);
        } else {
            console.warn('Кнопка cookie-preferences не найдена');
        }
    }

    // Запуск при загрузке DOM
    function startCookieBanner() {
        // Ждём полной загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initCookieBanner);
        } else {
            // DOM уже загружен, запускаем сразу
            setTimeout(initCookieBanner, 100);
        }
    }

    // Запускаем скрипт
    startCookieBanner();

})();

