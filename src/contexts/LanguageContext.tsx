import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh' | 'hi' | 'ar';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home', es: 'Inicio', fr: 'Accueil', de: 'Startseite', 
    ja: 'ホーム', zh: '首页', hi: 'होम', ar: 'الرئيسية'
  },
  'nav.dashboard': {
    en: 'Dashboard', es: 'Panel', fr: 'Tableau de bord', de: 'Dashboard',
    ja: 'ダッシュボード', zh: '仪表板', hi: 'डैशबोर्ड', ar: 'لوحة التحكم'
  },
  'nav.settings': {
    en: 'Settings', es: 'Configuración', fr: 'Paramètres', de: 'Einstellungen',
    ja: '設定', zh: '设置', hi: 'सेटिंग्स', ar: 'الإعدادات'
  },
  'nav.analytics': {
    en: 'Analytics', es: 'Análisis', fr: 'Analytique', de: 'Analytik',
    ja: '分析', zh: '分析', hi: 'विश्लेषण', ar: 'التحليلات'
  },
  'nav.signOut': {
    en: 'Sign Out', es: 'Cerrar sesión', fr: 'Déconnexion', de: 'Abmelden',
    ja: 'サインアウト', zh: '退出', hi: 'साइन आउट', ar: 'تسجيل الخروج'
  },
  
  // Hero Section
  'hero.title': {
    en: 'Elevate Your Mind', es: 'Eleva Tu Mente', fr: 'Élevez Votre Esprit',
    de: 'Erhebe Deinen Geist', ja: '心を高める', zh: '提升你的心智',
    hi: 'अपने मन को ऊंचा करें', ar: 'ارفع عقلك'
  },
  'hero.subtitle': {
    en: 'With Neural Intelligence', es: 'Con Inteligencia Neural',
    fr: 'Avec l\'Intelligence Neurale', de: 'Mit Neuronaler Intelligenz',
    ja: 'ニューラルインテリジェンスで', zh: '借助神经智能',
    hi: 'न्यूरल इंटेलिजेंस के साथ', ar: 'مع الذكاء العصبي'
  },
  'hero.description': {
    en: 'Experience the future of cognitive enhancement.',
    es: 'Experimenta el futuro de la mejora cognitiva.',
    fr: 'Découvrez le futur de l\'amélioration cognitive.',
    de: 'Erlebe die Zukunft der kognitiven Verbesserung.',
    ja: '認知機能強化の未来を体験してください。',
    zh: '体验认知增强的未来。',
    hi: 'संज्ञानात्मक वृद्धि के भविष्य का अनुभव करें।',
    ar: 'اختبر مستقبل التعزيز المعرفي.'
  },
  'hero.getStarted': {
    en: 'Get Started', es: 'Comenzar', fr: 'Commencer', de: 'Loslegen',
    ja: '始める', zh: '开始', hi: 'शुरू करें', ar: 'ابدأ'
  },
  'hero.liveDemo': {
    en: 'Live Demo', es: 'Demo en Vivo', fr: 'Démo en Direct', de: 'Live-Demo',
    ja: 'ライブデモ', zh: '现场演示', hi: 'लाइव डेमो', ar: 'عرض مباشر'
  },
  'hero.voiceAI': {
    en: 'Try Voice AI', es: 'Probar IA de Voz', fr: 'Essayer l\'IA Vocale',
    de: 'Sprach-KI testen', ja: '音声AIを試す', zh: '试用语音AI',
    hi: 'वॉइस AI आज़माएं', ar: 'جرب الذكاء الصوتي'
  },
  
  // Dashboard
  'dashboard.welcome': {
    en: 'Welcome back', es: 'Bienvenido de nuevo', fr: 'Bienvenue',
    de: 'Willkommen zurück', ja: 'おかえりなさい', zh: '欢迎回来',
    hi: 'वापसी पर स्वागत है', ar: 'مرحباً بعودتك'
  },
  'dashboard.focusScore': {
    en: 'Focus Score', es: 'Puntuación de Enfoque', fr: 'Score de Concentration',
    de: 'Fokus-Punktzahl', ja: 'フォーカススコア', zh: '专注分数',
    hi: 'फोकस स्कोर', ar: 'درجة التركيز'
  },
  'dashboard.productivity': {
    en: 'Productivity', es: 'Productividad', fr: 'Productivité',
    de: 'Produktivität', ja: '生産性', zh: '生产力',
    hi: 'उत्पादकता', ar: 'الإنتاجية'
  },
  'dashboard.energy': {
    en: 'Energy Level', es: 'Nivel de Energía', fr: 'Niveau d\'Énergie',
    de: 'Energieniveau', ja: 'エネルギーレベル', zh: '能量水平',
    hi: 'ऊर्जा स्तर', ar: 'مستوى الطاقة'
  },
  'dashboard.stress': {
    en: 'Stress Level', es: 'Nivel de Estrés', fr: 'Niveau de Stress',
    de: 'Stressniveau', ja: 'ストレスレベル', zh: '压力水平',
    hi: 'तनाव स्तर', ar: 'مستوى التوتر'
  },
  'dashboard.goals': {
    en: 'Active Goals', es: 'Objetivos Activos', fr: 'Objectifs Actifs',
    de: 'Aktive Ziele', ja: 'アクティブな目標', zh: '活跃目标',
    hi: 'सक्रिय लक्ष्य', ar: 'الأهداف النشطة'
  },
  
  // Settings
  'settings.title': {
    en: 'Settings', es: 'Configuración', fr: 'Paramètres', de: 'Einstellungen',
    ja: '設定', zh: '设置', hi: 'सेटिंग्स', ar: 'الإعدادات'
  },
  'settings.profile': {
    en: 'Profile', es: 'Perfil', fr: 'Profil', de: 'Profil',
    ja: 'プロフィール', zh: '个人资料', hi: 'प्रोफ़ाइल', ar: 'الملف الشخصي'
  },
  'settings.appearance': {
    en: 'Appearance', es: 'Apariencia', fr: 'Apparence', de: 'Erscheinungsbild',
    ja: '外観', zh: '外观', hi: 'उपस्थिति', ar: 'المظهر'
  },
  'settings.notifications': {
    en: 'Notifications', es: 'Notificaciones', fr: 'Notifications',
    de: 'Benachrichtigungen', ja: '通知', zh: '通知',
    hi: 'सूचनाएं', ar: 'الإشعارات'
  },
  'settings.privacy': {
    en: 'Privacy', es: 'Privacidad', fr: 'Confidentialité', de: 'Datenschutz',
    ja: 'プライバシー', zh: '隐私', hi: 'गोपनीयता', ar: 'الخصوصية'
  },
  'settings.language': {
    en: 'Language', es: 'Idioma', fr: 'Langue', de: 'Sprache',
    ja: '言語', zh: '语言', hi: 'भाषा', ar: 'اللغة'
  },
  'settings.save': {
    en: 'Save Changes', es: 'Guardar Cambios', fr: 'Enregistrer',
    de: 'Änderungen Speichern', ja: '変更を保存', zh: '保存更改',
    hi: 'परिवर्तन सहेजें', ar: 'حفظ التغييرات'
  },
  
  // Chat
  'chat.placeholder': {
    en: 'Type a message...', es: 'Escribe un mensaje...',
    fr: 'Tapez un message...', de: 'Nachricht eingeben...',
    ja: 'メッセージを入力...', zh: '输入消息...',
    hi: 'संदेश लिखें...', ar: 'اكتب رسالة...'
  },
  'chat.send': {
    en: 'Send', es: 'Enviar', fr: 'Envoyer', de: 'Senden',
    ja: '送信', zh: '发送', hi: 'भेजें', ar: 'إرسال'
  },
  'chat.voiceInput': {
    en: 'Voice Input', es: 'Entrada de Voz', fr: 'Entrée Vocale',
    de: 'Spracheingabe', ja: '音声入力', zh: '语音输入',
    hi: 'वॉइस इनपुट', ar: 'إدخال صوتي'
  },
  
  // Common
  'common.loading': {
    en: 'Loading...', es: 'Cargando...', fr: 'Chargement...',
    de: 'Laden...', ja: '読み込み中...', zh: '加载中...',
    hi: 'लोड हो रहा है...', ar: 'جارٍ التحميل...'
  },
  'common.error': {
    en: 'Error', es: 'Error', fr: 'Erreur', de: 'Fehler',
    ja: 'エラー', zh: '错误', hi: 'त्रुटि', ar: 'خطأ'
  },
  'common.success': {
    en: 'Success', es: 'Éxito', fr: 'Succès', de: 'Erfolg',
    ja: '成功', zh: '成功', hi: 'सफलता', ar: 'نجاح'
  },
};

const languageNames: { [key in Language]: string } = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  zh: '中文',
  hi: 'हिन्दी',
  ar: 'العربية',
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: typeof languageNames;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    if (saved && saved in languageNames) return saved as Language;
    
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang in languageNames) return browserLang as Language;
    
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: languageNames }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
