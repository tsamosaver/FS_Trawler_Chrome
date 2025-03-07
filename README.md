# FamilySearch Film Browser Extension

Language versions:
- [English](#english)
- [Deutsch](#deutsch)
- [Русский](#русский)

---

# <a name="english"></a>English

This Chrome extension helps you search and download frames from FamilySearch films.

## Prerequisites

Before using this extension, you need to set up Firefox with the following add-ons for downloading frames:

1. Install [DownThemAll!](https://addons.mozilla.org/en-US/firefox/addon/downthemall/)
2. Install [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
3. Add the following script to Tampermonkey to remove download limits:

```javascript
// ==UserScript==
// @name         Modify SERVER_DATA
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Change parameters in SERVER_DATA.initialDefaultEx
// @match        *://familysearch.org/*
// @match        *://www.familysearch.org/*
// @match        *://beta.familysearch.org/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function modifyData() {
        if (window.SERVER_DATA && window.SERVER_DATA.initialDefaultEx) {
            let data = window.SERVER_DATA.initialDefaultEx;

            // Изменяем нужные параметры
            data.apps["search-react"].features.llsDetailsAttach = true;
            data.apps["search-react"].features.proxyCatalogDetails = true;
            data.apps["search-react"].features.removeImageDownloadThrottle = true;
            data.apps["search-react"].features.showDevFeaturesEx = true;

            console.log("Tampermonkey: SERVER_DATA modified", data);
        }
    }

    // Создаем Proxy для SERVER_DATA
    const handler = {
        set(target, property, value) {
            target[property] = value;
            if (property === 'initialDefaultEx') {
                modifyData();
            }
            return true;
        }
    };

    // Используем Proxy для слежения за SERVER_DATA
    const proxy = new Proxy(window.SERVER_DATA || {}, handler);
    Object.defineProperty(window, 'SERVER_DATA', {
        get() {
            return proxy;
        },
        set(value) {
            Object.assign(proxy, value);
        },
        configurable: true
    });

    // Если объект уже существует
    if (window.SERVER_DATA && window.SERVER_DATA.initialDefaultEx) {
        modifyData();
    }

    // Добавляем логирование при загрузке страницы
    document.addEventListener('DOMContentLoaded', () => {
        console.log("Tampermonkey: Скрипт загружен и работает");
    });
})();

```

## Setup Instructions

1. **Firefox Setup**:
   - Install Firefox if you haven't already
   - Install the DownThemAll! and Tampermonkey add-ons
   - Add the script above to Tampermonkey
   - Log in to your FamilySearch account in Firefox

2. **Chrome Extension**:
   - Install this extension in Chrome
   - Log in to your FamilySearch account in Chrome

## How to Use

1. Enter either a catalog number or a film number in the respective field
2. Click "Start Search"
3. Wait for the search to complete
4. For each film, you can:
   - Select which frames to export using the input field
   - Use the following formats for frame numbers:
     * Single numbers: 1,2,3
     * Ranges: 1-100
     * Combined: 1-50,75,80-90
5. Click "Export Links" to generate a text file with download links
6. Open the text file in Firefox
7. Use DownThemAll! to download all frames:
   - Select all links (Ctrl+A)
   - Right-click and choose DownThemAll!
   - Configure download settings and start downloading

## Important Notes

- You must be logged in to FamilySearch in both Chrome and Firefox
- The extension supports English, German, and Russian interfaces
- Frame downloads must be done through Firefox with DownThemAll!

---

# <a name="deutsch"></a>Deutsch

Diese Chrome-Erweiterung hilft Ihnen bei der Suche und dem Download von Bildern aus FamilySearch-Filmen.

## Voraussetzungen

Bevor Sie diese Erweiterung nutzen können, müssen Sie Firefox mit den folgenden Add-ons für das Herunterladen von Bildern einrichten:

1. Installieren Sie [DownThemAll!](https://addons.mozilla.org/de/firefox/addon/downthemall/)
2. Installieren Sie [Tampermonkey](https://addons.mozilla.org/de/firefox/addon/tampermonkey/)
3. Fügen Sie das folgende Skript zu Tampermonkey hinzu, um Download-Beschränkungen aufzuheben:

```javascript
// ==UserScript==
// @name         Modify SERVER_DATA
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Change parameters in SERVER_DATA.initialDefaultEx
// @match        *://familysearch.org/*
// @match        *://www.familysearch.org/*
// @match        *://beta.familysearch.org/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function modifyData() {
        if (window.SERVER_DATA && window.SERVER_DATA.initialDefaultEx) {
            let data = window.SERVER_DATA.initialDefaultEx;

            // Изменяем нужные параметры
            data.apps["search-react"].features.llsDetailsAttach = true;
            data.apps["search-react"].features.proxyCatalogDetails = true;
            data.apps["search-react"].features.removeImageDownloadThrottle = true;
            data.apps["search-react"].features.showDevFeaturesEx = true;

            console.log("Tampermonkey: SERVER_DATA modified", data);
        }
    }

    // Создаем Proxy для SERVER_DATA
    const handler = {
        set(target, property, value) {
            target[property] = value;
            if (property === 'initialDefaultEx') {
                modifyData();
            }
            return true;
        }
    };

    // Используем Proxy для слежения за SERVER_DATA
    const proxy = new Proxy(window.SERVER_DATA || {}, handler);
    Object.defineProperty(window, 'SERVER_DATA', {
        get() {
            return proxy;
        },
        set(value) {
            Object.assign(proxy, value);
        },
        configurable: true
    });

    // Если объект уже существует
    if (window.SERVER_DATA && window.SERVER_DATA.initialDefaultEx) {
        modifyData();
    }

    // Добавляем логирование при загрузке страницы
    document.addEventListener('DOMContentLoaded', () => {
        console.log("Tampermonkey: Скрипт загружен и работает");
    });
})();

```

## Installationsanleitung

1. **Firefox-Einrichtung**:
   - Installieren Sie Firefox, falls noch nicht geschehen
   - Installieren Sie die Add-ons DownThemAll! und Tampermonkey
   - Fügen Sie das obige Skript zu Tampermonkey hinzu
   - Melden Sie sich bei Ihrem FamilySearch-Konto in Firefox an

2. **Chrome-Erweiterung**:
   - Installieren Sie diese Erweiterung in Chrome
   - Melden Sie sich bei Ihrem FamilySearch-Konto in Chrome an

## Verwendung

1. Geben Sie entweder eine Katalognummer oder eine Filmnummer in das entsprechende Feld ein
2. Klicken Sie auf "Suche starten"
3. Warten Sie, bis die Suche abgeschlossen ist
4. Für jeden Film können Sie:
   - Wählen Sie die zu exportierenden Bilder über das Eingabefeld aus
   - Verwenden Sie die folgenden Formate für Bildnummern:
     * Einzelne Nummern: 1,2,3
     * Bereiche: 1-100
     * Kombiniert: 1-50,75,80-90
5. Klicken Sie auf "Links exportieren", um eine Textdatei mit Download-Links zu erstellen
6. Öffnen Sie die Textdatei in Firefox
7. Verwenden Sie DownThemAll! zum Herunterladen aller Bilder:
   - Wählen Sie alle Links aus (Strg+A)
   - Rechtsklick und wählen Sie DownThemAll!
   - Konfigurieren Sie die Download-Einstellungen und starten Sie den Download

## Wichtige Hinweise

- Sie müssen sowohl in Chrome als auch in Firefox bei FamilySearch angemeldet sein
- Die Erweiterung unterstützt Englisch, Deutsch und Russisch
- Bilder müssen über Firefox mit DownThemAll! heruntergeladen werden

---

# <a name="русский"></a>Русский

## Предварительные требования

Перед использованием этого расширения необходимо настроить Firefox со следующими дополнениями для загрузки кадров:

1. Установить [DownThemAll!](https://addons.mozilla.org/ru/firefox/addon/downthemall/)
2. Установить [Tampermonkey](https://addons.mozilla.org/ru/firefox/addon/tampermonkey/)
3. Добавить следующий скрипт в Tampermonkey для снятия ограничений на скачивание:

```javascript
// ==UserScript==
// @name         Modify SERVER_DATA
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Change parameters in SERVER_DATA.initialDefaultEx
// @match        *://familysearch.org/*
// @match        *://www.familysearch.org/*
// @match        *://beta.familysearch.org/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function modifyData() {
        if (window.SERVER_DATA && window.SERVER_DATA.initialDefaultEx) {
            let data = window.SERVER_DATA.initialDefaultEx;

            // Изменяем нужные параметры
            data.apps["search-react"].features.llsDetailsAttach = true;
            data.apps["search-react"].features.proxyCatalogDetails = true;
            data.apps["search-react"].features.removeImageDownloadThrottle = true;
            data.apps["search-react"].features.showDevFeaturesEx = true;

            console.log("Tampermonkey: SERVER_DATA modified", data);
        }
    }

    // Создаем Proxy для SERVER_DATA
    const handler = {
        set(target, property, value) {
            target[property] = value;
            if (property === 'initialDefaultEx') {
                modifyData();
            }
            return true;
        }
    };

    // Используем Proxy для слежения за SERVER_DATA
    const proxy = new Proxy(window.SERVER_DATA || {}, handler);
    Object.defineProperty(window, 'SERVER_DATA', {
        get() {
            return proxy;
        },
        set(value) {
            Object.assign(proxy, value);
        },
        configurable: true
    });

    // Если объект уже существует
    if (window.SERVER_DATA && window.SERVER_DATA.initialDefaultEx) {
        modifyData();
    }

    // Добавляем логирование при загрузке страницы
    document.addEventListener('DOMContentLoaded', () => {
        console.log("Tampermonkey: Скрипт загружен и работает");
    });
})();

```

## Инструкции по установке

1. **Настройка Firefox**:
   - Установите Firefox, если он еще не установлен
   - Установите дополнения DownThemAll! и Tampermonkey
   - Добавьте скрипт выше в Tampermonkey
   - Войдите в свою учетную запись FamilySearch в Firefox

2. **Расширение Chrome**:
   - Установите это расширение в Chrome
   - Войдите в свою учетную запись FamilySearch в Chrome

## Как использовать

1. Введите номер каталога или номер пленки в соответствующее поле
2. Нажмите "Начать поиск"
3. Дождитесь завершения поиска
4. Для каждой пленки вы можете:
   - Выбрать кадры для экспорта, используя поле ввода
   - Использовать следующие форматы для номеров кадров:
     * Отдельные номера: 1,2,3
     * Диапазоны: 1-100
     * Комбинированно: 1-50,75,80-90
5. Нажмите "Экспорт ссылок" для создания текстового файла со ссылками
6. Откройте текстовый файл в Firefox
7. Используйте DownThemAll! для загрузки всех кадров:
   - Выделите все ссылки (Ctrl+A)
   - Щелкните правой кнопкой мыши и выберите DownThemAll!
   - Настройте параметры загрузки и начните скачивание

## Важные замечания

- Необходимо быть авторизованным в FamilySearch как в Chrome, так и в Firefox
- Расширение поддерживает английский, немецкий и русский интерфейс
- Загрузка кадров должна выполняться через Firefox с помощью DownThemAll! 
