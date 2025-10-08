"use client";

import { useEffect, useState } from "react";

export default function LanguageToggle() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    // Load Google Translate script
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);

      // Initialize Google Translate
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en', // Your base site language
            includedLanguages: 'en,no', // English and Norwegian
            autoDisplay: false,
          },
          'google_translate_element'
        );
      };
    }

    // Create the hidden translate element
    if (!document.getElementById('google_translate_element')) {
      const div = document.createElement('div');
      div.id = 'google_translate_element';
      div.style.display = 'none';
      document.body.appendChild(div);
    }

    // Check current language state
    if (document.body.classList.contains('translated-ltr')) {
      setLang('no');
    }

    // Listen for translation changes to keep state in sync
    const observer = new MutationObserver(() => {
      const isTranslated = document.body.classList.contains('translated-ltr') || 
                          document.body.classList.contains('translated-rtl');
      
      if (isTranslated && lang === 'en') {
        setLang('no');
      } else if (!isTranslated && lang === 'no') {
        setLang('en');
      }
    });

    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => observer.disconnect();
  }, [lang]);

  const changeLanguage = (langCode) => {
    // Wait a moment for Google Translate to be ready
    setTimeout(() => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        // Find the correct option
        const option = Array.from(select.options).find(
          opt => opt.value.includes(langCode)
        );
        if (option) {
          select.value = option.value;
          select.dispatchEvent(new Event("change"));
        }
      } else {
        // If no select found, try to reinitialize Google Translate
        console.log('Google Translate select not found, reinitializing...');
        initializeGoogleTranslate();
      }
    }, 100);
  };

  const handleToggle = () => {
    const newLang = lang === "en" ? "no" : "en";
    setLang(newLang);
    changeLanguage(newLang);
  };

  const initializeGoogleTranslate = () => {
    // Remove existing translate element
    const existingElement = document.getElementById('google_translate_element');
    if (existingElement) {
      existingElement.remove();
    }

    // Create new translate element
    const div = document.createElement('div');
    div.id = 'google_translate_element';
    div.style.display = 'none';
    document.body.appendChild(div);

    // Reinitialize Google Translate
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,no',
          autoDisplay: false,
        },
        'google_translate_element'
      );
    }
  };

  return (
    <div className="language-toggle-container-navbar">
      <div className="language-toggle">
        <img 
          src="/download.png" 
          alt="Norwegian flag" 
          className={`language-flag ${lang === 'no' ? 'active' : ''}`}
        />
        <button
          className={`toggle-slider ${lang === 'en' ? 'english' : 'norwegian'}`}
          onClick={handleToggle}
        >
          <span className="toggle-handle"></span>
        </button>
        <img 
          src="/download (1).png" 
          alt="English flag" 
          className={`language-flag ${lang === 'en' ? 'active' : ''}`}
        />
      </div>
    </div>
  );
}