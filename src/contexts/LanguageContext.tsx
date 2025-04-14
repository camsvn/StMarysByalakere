"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define available languages
export type Language = "en" | "ml" | "es";

// Define translations interface
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Create initial translations
const translations: Translations = {
  // Common UI elements
  navHome: {
    en: "Home",
    ml: "ഹോം",
    es: "Inicio",
  },
  navAbout: {
    en: "About Us",
    ml: "ഞങ്ങളെക്കുറിച്ച്",
    es: "Sobre Nosotros",
  },
  navMass: {
    en: "Mass & Services",
    ml: "കുർബാന & സേവനങ്ങൾ",
    es: "Misa y Servicios",
  },
  navEvents: {
    en: "Events",
    ml: "ഇവന്റുകൾ",
    es: "Eventos",
  },
  navMinistries: {
    en: "Pious Associations",
    ml: "മിനിസ്ട്രികൾ",
    es: "Ministerios",
  },
  navGallery: {
    en: "Gallery",
    ml: "ഗാലറി",
    es: "Galería",
  },
  navContact: {
    en: "Contact",
    ml: "ബന്ധപ്പെടുക",
    es: "Contacto",
  },
  navLogin: {
    en: "Login",
    ml: "ലോഗിൻ",
    es: "Iniciar Sesión",
  },
  navDonate: {
    en: "Donate",
    ml: "സംഭാവന ചെയ്യുക",
    es: "Donar",
  },
  // Home page
  heroTitle: {
    en: "Welcome to St. Mary's",
    ml: "സെന്റ് മേരീസിലേക്ക് സ്വാഗതം",
    es: "Bienvenido a Santa María",
  },
  heroSubtitle: {
    en: "A loving Malabar Catholic community of faith, hope, and charity",
    ml: "വിശ്വാസത്തിന്റെയും പ്രതീക്ഷയുടെയും സ്നേഹത്തിന്റെയും മലബാർ കത്തോലിക്ക സമൂഹം",
    es: "Una comunidad católica Malabar de fe, esperanza y caridad",
  },
  // Button texts
  learnMore: {
    en: "Learn More",
    ml: "കൂടുതലറിയുക",
    es: "Más Información",
  },
  joinUs: {
    en: "Join Us",
    ml: "ഞങ്ങളോടൊപ്പം ചേരുക",
    es: "Únete a Nosotros",
  },
  // Languages
  english: {
    en: "English",
    ml: "ഇംഗ്ലീഷ്",
    es: "Inglés",
  },
  malayalam: {
    en: "Malayalam",
    ml: "മലയാളം",
    es: "Malayalam",
  },
  spanish: {
    en: "Spanish",
    ml: "സ്പാനിഷ്",
    es: "Español",
  },
  // Login form
  email: {
    en: "Email",
    ml: "ഇമെയിൽ",
    es: "Correo Electrónico",
  },
  password: {
    en: "Password",
    ml: "പാസ്‌വേഡ്",
    es: "Contraseña",
  },
  login: {
    en: "Login",
    ml: "ലോഗിൻ",
    es: "Iniciar Sesión",
  },
  register: {
    en: "Register",
    ml: "രജിസ്റ്റർ",
    es: "Registrarse",
  },
  // Donation
  donateTitle: {
    en: "Support Our Church",
    ml: "ഞങ്ങളുടെ പള്ളിയെ പിന്തുണയ്ക്കുക",
    es: "Apoya Nuestra Iglesia",
  },
  donateSubtitle: {
    en: "Your generous contribution helps our ministry and community outreach",
    ml: "നിങ്ങളുടെ ഉദാരമായ സംഭാവന ഞങ്ങളുടെ മിനിസ്ട്രിക്കും സമൂഹ പ്രവർത്തനങ്ങൾക്കും സഹായിക്കുന്നു",
    es: "Su generosa contribución ayuda a nuestro ministerio y alcance comunitario",
  },
  donateButton: {
    en: "Donate Now",
    ml: "ഇപ്പോൾ സംഭാവന ചെയ്യുക",
    es: "Donar Ahora",
  },
  // Amount labels
  customAmount: {
    en: "Custom Amount",
    ml: "ഇഷ്ടമുള്ള തുക",
    es: "Cantidad Personalizada",
  },
  // Our Prayer
  ourPrayer: {
    en: "Ente ammayum rajniyumaya parishudha mariyame, angayude nereyulla ente snehathinte adayalamaayi enneyum ente kannu, ente chevi, ente naavu, ente hrudayam, ente vyakthithwam enniva muzhuvanaayum angekku innu njan samarppikkunnu. njaan angayude swanthamaakayaal ente amme, angayude swanthamennathupole enne samrakshikkukayum nayikkukayum cheyyaname. Aammen",
    ml: "എന്റെ അമ്മയും രാജ്ഞിയുമായ പരിശുദ്ധ മറിയമേ, അങ്ങയുടെ നേരെയുള്ള എന്റെ സ്നേഹത്തിന്റെ അടയാളമായി എന്നെയും എന്റെ കണ്ണ്, എന്റെ ചെവി, എന്റെ നാവു, എന്റെ ഹൃദയം, എന്റെ വ്യക്തിത്വം എന്നിവ മുഴുവനായും അങ്ങേക്ക് ഇന്ന് ഞാൻ സമർപ്പിക്കുന്നു. ഞാൻ അങ്ങയുടെ സ്വന്തമാകയാൽ എന്റെ അമ്മെ, അങ്ങയുടെ സ്വന്തമെന്നതുപോലെ എന്നെ സംരക്ഷിക്കുകയും നയിക്കുകയും ചെയ്യണമേ. ആമ്മേൻ",
    // es: "Una comunidad católica Malabar de fe, esperanza y caridad",
  },
};

// Context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: { code: Language; name: string }[];
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to get language from localStorage or default to English
  const [language, setLanguageState] = useState<Language>("en");

  // On mount, try to get language from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language") as Language;
      if (storedLanguage) {
        setLanguageState(storedLanguage);
      }
    }
  }, []);

  // Available languages
  const availableLanguages = [
    { code: "en" as Language, name: "English" },
    { code: "ml" as Language, name: "Malayalam" },
    // { code: "es" as Language, name: "Spanish" },
  ];

  // Update localStorage when language changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

  // Set language function
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language] || translations[key]["en"] || key;
  };

  // Context value
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
