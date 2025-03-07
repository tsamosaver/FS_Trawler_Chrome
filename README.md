# FS Film Trawler Extension

Language versions:
- [English](#english)
- [Deutsch](#deutsch)
- [Русский](#русский)

---

# <a name="english"></a>English

This Chrome extension helps you search and download frames from FS films.

## Prerequisites

Before using this extension, you need to set up Firefox with the following add-ons for downloading frames:

1. Install [DownThemAll!](https://addons.mozilla.org/en-US/firefox/addon/downthemall/)
2. Install [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
3. Install script from [FS_NoLimit](https://github.com/tsamosaver/FS_NoLimit) to remove download limits

## Setup Instructions

1. **Firefox Setup**:
   - Install Firefox if you haven't already
   - Install the DownThemAll! and Tampermonkey add-ons
   - Install the script from [FS_NoLimit](https://github.com/tsamosaver/FS_NoLimit) to remove download limits
   - Log in to your FS account in Firefox

2. **Chrome Extension**:
   - Install this extension in Chrome
   - Log in to your FS account in Chrome

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
5. Click "Export Links" to generate an HTML file with download links
6. Open the HTML file in Firefox
7. Use DownThemAll! to download all frames:
   - Right-click and choose DownThemAll!
   - Set "Network" parameter to 1
   - Configure download mask as *text*\\*name*.*ext* to save each film in separate folder
   - Start downloading

## Important Notes

- You must be logged in to FamilySearch in both Chrome and Firefox
- After logging in to Firefox, it's recommended to sign out from all other devices and browsers
- FS session automatically expires after 24 hours
- In DownThemAll! settings, it's recommended to set concurrent downloads to 1 to avoid "429 Too Many Requests" errors
- The extension supports English, German, and Russian interfaces
- Frame downloads must be done through Firefox with DownThemAll!

---

# <a name="deutsch"></a>Deutsch

Diese Chrome-Erweiterung hilft Ihnen bei der Suche und dem Download von Bildern aus FS-Filmen.

## Voraussetzungen

Bevor Sie diese Erweiterung nutzen können, müssen Sie Firefox mit den folgenden Add-ons für das Herunterladen von Bildern einrichten:

1. Installieren Sie [DownThemAll!](https://addons.mozilla.org/de/firefox/addon/downthemall/)
2. Installieren Sie [Tampermonkey](https://addons.mozilla.org/de/firefox/addon/tampermonkey/)
3. Installieren Sie das Skript von [FS_NoLimit](https://github.com/tsamosaver/FS_NoLimit), um Download-Beschränkungen aufzuheben

## Installationsanleitung

1. **Firefox-Einrichtung**:
   - Installieren Sie Firefox, falls noch nicht geschehen
   - Installieren Sie die Add-ons DownThemAll! und Tampermonkey
   - Installieren Sie das obige Skript zu Tampermonkey
   - Melden Sie sich bei Ihrem FamilySearch-Konto in Firefox an

2. **Chrome-Erweiterung**:
   - Installieren Sie diese Erweiterung in Chrome
   - Melden Sie sich bei Ihrem FS-Konto in Chrome an

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
5. Klicken Sie auf "Links exportieren", um eine HTML-Datei mit Download-Links zu erstellen
6. Öffnen Sie die HTML-Datei in Firefox
7. Verwenden Sie DownThemAll! zum Herunterladen aller Bilder:
   - Rechtsklick und wählen Sie DownThemAll!
   - Setzen Sie den "Netzwerk"-Parameter auf 1
   - Konfigurieren Sie die Download-Maske als *text*\\*name*.*ext*, um jeden Film in einem separaten Ordner zu speichern
   - Starten Sie den Download

## Wichtige Hinweise

- Sie müssen sowohl in Chrome als auch in Firefox bei FS angemeldet sein
- Nach der Anmeldung in Firefox wird empfohlen, sich von allen anderen Geräten und Browsern abzumelden
- Die FS-Sitzung läuft automatisch nach 24 Stunden ab
- In den DownThemAll!-Einstellungen wird empfohlen, parallele Downloads auf 1 zu setzen, um "429 Too Many Requests"-Fehler zu vermeiden
- Die Erweiterung unterstützt Englisch, Deutsch und Russisch
- Bilder müssen über Firefox mit DownThemAll! heruntergeladen werden

---

# <a name="русский"></a>Русский

## Предварительные требования

Перед использованием этого расширения необходимо настроить Firefox со следующими дополнениями для загрузки кадров:

1. Установить [DownThemAll!](https://addons.mozilla.org/ru/firefox/addon/downthemall/)
2. Установить [Tampermonkey](https://addons.mozilla.org/ru/firefox/addon/tampermonkey/)
3. Установить скрипт [FS_NoLimit](https://github.com/tsamosaver/FS_NoLimit) для снятия ограничений на скачивание

## Инструкции по установке

1. **Настройка Firefox**:
   - Установите Firefox, если он еще не установлен
   - Установите дополнения DownThemAll! и Tampermonkey
   - Добавьте скрипт выше в Tampermonkey
   - Войдите в свою учетную запись FS в Firefox

2. **Расширение Chrome**:
   - Установите это расширение в Chrome
   - Войдите в свою учетную запись FS в Chrome

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
5. Нажмите "Экспорт ссылок" для создания html файла со ссылками
6. Откройте html файл в Firefox
7. Используйте DownThemAll! для загрузки всех кадров:
   - Щелкните правой кнопкой мыши и выберите DownThemAll!
   - Установите параметр "сеть" = 1
   - Настройте маску загрузки *text*\\*name*.*ext* для скачивания каждой пленки в отдельную папку
   - Начните скачивание

## Важные замечания

- Необходимо быть авторизованным в FS как в Chrome, так и в Firefox
- После входа в Firefox рекомендуется выйти из учетной записи на всех других устройствах и браузерах
- Сессия FS автоматически завершается через 24 часа
- В настройках DownThemAll! рекомендуется установить количество параллельных закачек равным 1, чтобы избежать ошибки "429 Too Many Requests"
- Расширение поддерживает английский, немецкий и русский интерфейс
- Загрузка кадров должна выполняться через Firefox с помощью DownThemAll!
