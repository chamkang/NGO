class Translator {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.loadTranslations();
        this.initializeLanguageToggle();
    }

    async loadTranslations() {
        try {
            const response = await fetch('js/translations.json');
            this.translations = await response.json();
            
            // Get saved language preference or default to English
            const savedLanguage = localStorage.getItem('preferred-language') || 'en';
            this.setLanguage(savedLanguage);
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }

    setLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('preferred-language', language);
        this.translatePage();
        this.updateLanguageToggle();
    }

    translatePage() {
        // Translate regular text content
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Translate placeholders
        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const translation = this.getTranslation(key);
            if (translation) {
                element.placeholder = translation;
            }
        });

        // Translate input values
        const valueElements = document.querySelectorAll('[data-translate-value]');
        valueElements.forEach(element => {
            const key = element.getAttribute('data-translate-value');
            const translation = this.getTranslation(key);
            if (translation) {
                element.value = translation;
            }
        });

        // Update page title if it exists
        const titleElement = document.querySelector('[data-translate-title]');
        if (titleElement) {
            const titleKey = titleElement.getAttribute('data-translate-title');
            const titleTranslation = this.getTranslation(titleKey);
            if (titleTranslation) {
                document.title = titleTranslation + ' - LES AMIS SOLIDAIRES DE GATINEAU';
            }
        }
    }

    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                return null;
            }
        }
        
        return translation;
    }

    initializeLanguageToggle() {
        // Create language toggle button
        const navList = document.querySelector('.navbar-nav');
        if (navList) {
            const languageToggle = document.createElement('li');
            languageToggle.className = 'nav-item';
            languageToggle.innerHTML = `
                <button id="language-toggle" class="nav-link btn btn-outline-light btn-sm ml-2" style="border: none; background: transparent;">
                    ${this.currentLanguage === 'en' ? 'FR' : 'EN'}
                </button>
            `;
            navList.appendChild(languageToggle);

            // Add click event listener
            const toggleButton = document.getElementById('language-toggle');
            if (toggleButton) {
                toggleButton.addEventListener('click', () => {
                    const newLanguage = this.currentLanguage === 'en' ? 'fr' : 'en';
                    this.setLanguage(newLanguage);
                });
            }
        }
    }

    updateLanguageToggle() {
        const toggleButton = document.getElementById('language-toggle');
        if (toggleButton) {
            toggleButton.textContent = this.currentLanguage === 'en' ? 'FR' : 'EN';
        }
    }
}

// Initialize translator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.translator = new Translator();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Translator;
}
