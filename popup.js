document.addEventListener('DOMContentLoaded', function() {
    // Get system language and check if it's supported
    function getSystemLanguage() {
        const systemLang = navigator.language.split('-')[0]; // Get base language code
        return translations.hasOwnProperty(systemLang) ? systemLang : 'en';
    }

    let currentLang = localStorage.getItem('language') || getSystemLanguage();
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.value = currentLang;

    // Translation helper function
    function t(key, ...args) {
        let text = translations[currentLang];
        key.split('.').forEach(k => text = text[k]);
        return args.reduce((str, arg, i) => str.replace(`{${i}}`, arg), text);
    }

    // Update all translations on the page
    function updatePageTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = t(key);
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = t(key);
        });
    }

    // Language change handler
    languageSelect.addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('language', currentLang);
        updatePageTranslations();
    });

    // Initial translation
    updatePageTranslations();

    const startButton = document.getElementById('startButton');
    const exportButton = document.getElementById('exportButton');
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    let allLinks = [];
    let isProcessing = false;
    let shouldStop = false;

    function setButtonToStart() {
        startButton.setAttribute('data-i18n', 'startSearch');
        startButton.textContent = t('startSearch');
        startButton.style.backgroundColor = '#2c5282';
    }

    function setButtonToStop() {
        startButton.setAttribute('data-i18n', 'stopSearch');
        startButton.textContent = t('stopSearch');
        startButton.style.backgroundColor = '#e53e3e';
    }

    startButton.addEventListener('click', async () => {
        if (isProcessing) {
            shouldStop = true;
            return;
        }

        const catalogNumber = document.getElementById('catalogNumber').value.trim();
        const filmNumberInput = document.getElementById('filmNumber').value.trim();
        const filmNumbers = filmNumberInput ? filmNumberInput.split(',').map(f => f.trim()).filter(f => f) : [];

        if (!catalogNumber && filmNumbers.length === 0) {
            alert(t('enterCatalogOrFilm'));
            return;
        }

        isProcessing = true;
        shouldStop = false;
        allLinks = [];
        results.innerHTML = '';
        loading.style.display = 'block';
        exportButton.style.display = 'none';
        setButtonToStop();

        try {
            if (catalogNumber && filmNumbers.length === 0) {
                const films = await getCatalogFilms(catalogNumber);
                let totalFrames = 0;
                let processedFilms = 0;
                
                results.innerHTML = `
                    <div id="progressStats">
                        <p>${t('foundFilmsInCatalog', films.length, catalogNumber)}</p>
                        <p id="processProgress">${t('processed', 0, films.length, 0)}</p>
                        <p id="framesFound">${t('totalFramesFound', 0)}</p>
                    </div>
                    <div id="filmsList"></div>
                `;
                
                const progressElement = document.getElementById('processProgress');
                const framesElement = document.getElementById('framesFound');
                const filmsListElement = document.getElementById('filmsList');
                
                for (const filmNo of films) {
                    if (shouldStop) {
                        break;
                    }

                    const paddedFilmNo = filmNo.padStart(9, '0');
                    const links = await getFilmLinks(paddedFilmNo);
                    allLinks = allLinks.concat(links.map(link => ({
                        ...link,
                        filmNo: filmNo
                    })));
                    
                    processedFilms++;
                    totalFrames += links.length;
                    const progress = Math.round((processedFilms / films.length) * 100);
                    
                    progressElement.textContent = t('processed', processedFilms, films.length, progress);
                    framesElement.textContent = t('totalFramesFound', totalFrames);
                    
                    filmsListElement.insertAdjacentHTML('beforeend', createFilmElement(filmNo, links.length));
                }
            } else if (filmNumbers.length > 0) {
                let totalFrames = 0;
                let processedFilms = 0;
                
                results.innerHTML = `
                    <div id="progressStats">
                        <p id="processProgress">${t('processed', 0, filmNumbers.length, 0)}</p>
                        <p id="framesFound">${t('totalFramesFound', 0)}</p>
                    </div>
                    <div id="filmsList"></div>
                `;
                
                const progressElement = document.getElementById('processProgress');
                const framesElement = document.getElementById('framesFound');
                const filmsListElement = document.getElementById('filmsList');
                
                for (const filmNo of filmNumbers) {
                    if (shouldStop) {
                        break;
                    }

                    const paddedFilmNo = filmNo.padStart(9, '0');
                    try {
                        const links = await getFilmLinks(paddedFilmNo);
                        allLinks = allLinks.concat(links.map(link => ({
                            ...link,
                            filmNo: filmNo
                        })));
                        
                        processedFilms++;
                        totalFrames += links.length;
                        const progress = Math.round((processedFilms / filmNumbers.length) * 100);
                        
                        progressElement.textContent = t('processed', processedFilms, filmNumbers.length, progress);
                        framesElement.textContent = t('totalFramesFound', totalFrames);
                        
                        filmsListElement.insertAdjacentHTML('beforeend', createFilmElement(filmNo, links.length));
                    } catch (error) {
                        console.error(`Error processing film ${filmNo}:`, error);
                        filmsListElement.insertAdjacentHTML('beforeend', `
                            <div class="film-stats error">
                                <div class="film-row">
                                    <span style="color: red;">${t('film')} ${filmNo}: ${t('errors.fetchFilm')}</span>
                                </div>
                            </div>
                        `);
                    }
                }
            }

            if (allLinks.length > 0) {
                exportButton.style.display = 'block';
            }
        } catch (error) {
            results.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        } finally {
            loading.style.display = 'none';
            isProcessing = false;
            shouldStop = false;
            setButtonToStart();
        }
    });

    exportButton.addEventListener('click', () => {
        const selectedFilms = document.querySelectorAll('.film-stats input[type="checkbox"]:checked');
        let exportHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>FamilySearch Links</title></head><body>';
        
        console.log('Total links before filtering:', allLinks.length);
        console.log('Selected films count:', selectedFilms.length);

        selectedFilms.forEach(checkbox => {
            const filmNo = checkbox.id.replace('film_', '');
            const filterInput = document.getElementById(`filter_${filmNo}`);
            const frameRanges = filterInput.value.trim();
            
            console.log(`Processing film ${filmNo}, ranges: ${frameRanges}`);
            
            // Get all links for this film at once
            const filmLinks = allLinks.filter(link => link.filmNo === filmNo);
            console.log(`Found ${filmLinks.length} links for film before range filter ${filmNo}`);
            
            // Reset parsed ranges for new filter
            this.parsedRanges = null;
            
            // Then apply frame range filter if needed
            const filteredLinks = frameRanges 
                ? filmLinks.filter(link => isFrameInRanges(link.name.split('.')[0], frameRanges))
                : filmLinks;
            
            console.log(`Found ${filteredLinks.length} links for film after range filter ${filmNo}`);

            if (filteredLinks.length > 0) {
                // Add film section header
                exportHtml += `<h2>Film ${filmNo}</h2>`;
                
                // Add links with HTML format
                filteredLinks.forEach(link => {
                    const frameName = link.name.split('.')[0];
                    exportHtml += `<a href="${link.url}" download="${frameName}.jpg">${filmNo}</a><br>`;
                });
                exportHtml += '<br>';
            }
        });
        
        exportHtml += '</body></html>';
        console.log('Final export HTML length:', exportHtml.length);
        
        if (exportHtml.length === 0) {
            alert('No links to export. Please check your selection and filters.');
            return;
        }

        const blob = new Blob([exportHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'familysearch_links.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Helper function to check if a frame number is within specified ranges
    function isFrameInRanges(frameNumber, rangesStr) {
        if (!rangesStr || rangesStr === '') return true;
        
        // Extract frame number after underscore and remove leading zeros
        const parts = frameNumber.split('_');
        if (parts.length !== 2) return false;
        
        const frameNum = parts[1].replace(/^0+/, '');
        const num = parseInt(frameNum);
        if (isNaN(num)) return false;

        // Parse ranges only once per filter operation
        const cacheKey = `ranges_${rangesStr}`;
        if (!window.rangesCache) {
            window.rangesCache = {};
        }
        if (!window.rangesCache[cacheKey]) {
            window.rangesCache[cacheKey] = parseRanges(rangesStr);
        }

        // Check if number is within any range using binary search
        return isNumberInRanges(num, window.rangesCache[cacheKey]);
    }

    // Parse ranges string into sorted array of range objects
    function parseRanges(rangesStr) {
        const ranges = [];
        
        rangesStr.split(',').forEach(r => {
            const range = r.trim();
            if (range.includes('-')) {
                const [start, end] = range.split('-').map(n => parseInt(n));
                if (!isNaN(start) && !isNaN(end)) {
                    ranges.push({ start, end });
                }
            } else {
                const num = parseInt(range);
                if (!isNaN(num)) {
                    ranges.push({ start: num, end: num });
                }
            }
        });

        // Sort ranges by start value for binary search
        return ranges.sort((a, b) => a.start - b.start);
    }

    // Check if number is in ranges using binary search
    function isNumberInRanges(num, ranges) {
        let left = 0;
        let right = ranges.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const range = ranges[mid];

            if (num >= range.start && num <= range.end) {
                return true;
            }

            if (num < range.start) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return false;
    }

    async function getCatalogFilms(catalogNumber) {
        const response = await fetch(`https://www.familysearch.org/service/search/catalog/item/${catalogNumber}`);
        if (!response.ok) {
            throw new Error('Failed to fetch catalog data');
        }
        const data = await response.json();
        console.log('Raw response:', data); // Debug log
        
        if (!data.source || !data.source.film_note) {
            throw new Error('Invalid catalog data format');
        }
        
        // Get unique film numbers
        const uniqueFilms = [...new Set(
            data.source.film_note
                .filter(note => note.digital_film_no)
                .map(note => note.digital_film_no)
        )];
        
        console.log('Total films before deduplication:', data.source.film_note.filter(note => note.digital_film_no).length);
        console.log('Unique films after deduplication:', uniqueFilms.length);
        
        if (uniqueFilms.length === 0) {
            throw new Error(`No films found in this catalog. Found ${data.source.film_note.length} film notes in response.`);
        }
        
        return uniqueFilms;
    }

    async function getFilmLinks(filmNumber) {
        const response = await fetch(`https://www.familysearch.org/das/v2/dgs:${filmNumber}/children`);
        if (!response.ok) {
            throw new Error('Failed to fetch film data');
        }
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const childrenData = xmlDoc.getElementsByTagName('childrenData')[0];
        const baseUrl = childrenData.getAttribute('baseUrl');
        const children = xmlDoc.getElementsByTagName('children');

        return Array.from(children).map(child => {
            const apid = child.getAttribute('apid');
            const name = child.getAttribute('name');
            return {
                name: name,
                url: baseUrl + apid + '/dist.jpg'
            };
        });
    }

    function displayLinks(links, filmNumber) {
        const statsHtml = createFilmElement(filmNumber, links.length);
        results.innerHTML = statsHtml;
    }

    function createFilmElement(filmNo, framesCount) {
        return `
            <div class="film-stats">
                <div class="film-row">
                    <input type="checkbox" id="film_${filmNo}" checked>
                    <label for="film_${filmNo}">${t('film')} ${filmNo}: ${t('framesFound', framesCount)}</label>
                    <input type="text" 
                        id="filter_${filmNo}" 
                        class="frame-filter"
                        value="1-${framesCount}"
                        placeholder="e.g., 1-100,150,200-300">
                    <div class="tooltip">
                        <span class="icon">&#x1F6C8;</span>
                        <span class="tooltip-text">${t('tooltipText')}</span>
                    </div>
                </div>
            </div>`;
    }
}); 