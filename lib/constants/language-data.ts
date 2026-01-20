/**
 * Centralized language data with native script representations
 * Used across Movies, Live TV, and Radio sections
 */

export interface LanguageInfo {
	/** Language name in English */
	name: string;
	/** Native name of the language */
	nativeName: string;
	/** First letter(s) in native script - used for compact icons (Movies/Live TV) */
	nativeScript: string;
	/** Full native greeting/text - used for Radio cards */
	nativeGreeting: string;
	/** Primary color for gradients */
	primaryColor: string;
	/** Secondary color for gradients */
	secondaryColor: string;
	/** Accent color */
	accentColor: string;
}

/**
 * Comprehensive language data for Indian and international languages
 * Native script letters are the first letter(s) of the language name in its own script
 */
export const LANGUAGE_DATA: Record<string, LanguageInfo> = {
	// Indian Languages
	tamil: {
		name: "Tamil",
		nativeName: "தமிழ்",
		nativeScript: "த",
		nativeGreeting: "வணக்கம்",
		primaryColor: "#DC2626",
		secondaryColor: "#EF4444",
		accentColor: "#F87171",
	},
	telugu: {
		name: "Telugu",
		nativeName: "తెలుగు",
		nativeScript: "తె",
		nativeGreeting: "నమస్కారం",
		primaryColor: "#2563EB",
		secondaryColor: "#3B82F6",
		accentColor: "#60A5FA",
	},
	hindi: {
		name: "Hindi",
		nativeName: "हिन्दी",
		nativeScript: "हि",
		nativeGreeting: "नमस्ते",
		primaryColor: "#16A34A",
		secondaryColor: "#22C55E",
		accentColor: "#4ADE80",
	},
	kannada: {
		name: "Kannada",
		nativeName: "ಕನ್ನಡ",
		nativeScript: "ಕ",
		nativeGreeting: "ನಮಸ್ಕಾರ",
		primaryColor: "#CA8A04",
		secondaryColor: "#EAB308",
		accentColor: "#FACC15",
	},
	malayalam: {
		name: "Malayalam",
		nativeName: "മലയാളം",
		nativeScript: "മ",
		nativeGreeting: "നമസ്കാരം",
		primaryColor: "#0891B2",
		secondaryColor: "#06B6D4",
		accentColor: "#22D3EE",
	},
	bengali: {
		name: "Bengali",
		nativeName: "বাংলা",
		nativeScript: "বা",
		nativeGreeting: "নমস্কার",
		primaryColor: "#EA580C",
		secondaryColor: "#F97316",
		accentColor: "#FB923C",
	},
	marathi: {
		name: "Marathi",
		nativeName: "मराठी",
		nativeScript: "म",
		nativeGreeting: "नमस्कार",
		primaryColor: "#DB2777",
		secondaryColor: "#EC4899",
		accentColor: "#F472B6",
	},
	gujarati: {
		name: "Gujarati",
		nativeName: "ગુજરાતી",
		nativeScript: "ગુ",
		nativeGreeting: "નમસ્તે",
		primaryColor: "#7C3AED",
		secondaryColor: "#8B5CF6",
		accentColor: "#A78BFA",
	},
	punjabi: {
		name: "Punjabi",
		nativeName: "ਪੰਜਾਬੀ",
		nativeScript: "ਪੰ",
		nativeGreeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
		primaryColor: "#C2410C",
		secondaryColor: "#EA580C",
		accentColor: "#F97316",
	},
	odia: {
		name: "Odia",
		nativeName: "ଓଡ଼ିଆ",
		nativeScript: "ଓ",
		nativeGreeting: "ନମସ୍କାର",
		primaryColor: "#B91C1C",
		secondaryColor: "#DC2626",
		accentColor: "#EF4444",
	},
	assamese: {
		name: "Assamese",
		nativeName: "অসমীয়া",
		nativeScript: "অ",
		nativeGreeting: "নমস্কাৰ",
		primaryColor: "#059669",
		secondaryColor: "#10B981",
		accentColor: "#34D399",
	},
	bhojpuri: {
		name: "Bhojpuri",
		nativeName: "भोजपुरी",
		nativeScript: "भो",
		nativeGreeting: "प्रणाम",
		primaryColor: "#B45309",
		secondaryColor: "#D97706",
		accentColor: "#F59E0B",
	},
	urdu: {
		name: "Urdu",
		nativeName: "اردو",
		nativeScript: "ا",
		nativeGreeting: "السلام علیکم",
		primaryColor: "#7C3AED",
		secondaryColor: "#8B5CF6",
		accentColor: "#A78BFA",
	},
	english: {
		name: "English",
		nativeName: "English",
		nativeScript: "E",
		nativeGreeting: "Hello",
		primaryColor: "#6366F1",
		secondaryColor: "#818CF8",
		accentColor: "#A5B4FC",
	},
	// Additional Indian Languages
	sanskrit: {
		name: "Sanskrit",
		nativeName: "संस्कृतम्",
		nativeScript: "सं",
		nativeGreeting: "नमस्ते",
		primaryColor: "#9333EA",
		secondaryColor: "#A855F7",
		accentColor: "#C084FC",
	},
	konkani: {
		name: "Konkani",
		nativeName: "कोंकणी",
		nativeScript: "को",
		nativeGreeting: "नमस्कार",
		primaryColor: "#0EA5E9",
		secondaryColor: "#38BDF8",
		accentColor: "#7DD3FC",
	},
	manipuri: {
		name: "Manipuri",
		nativeName: "মৈতৈলোন্",
		nativeScript: "মৈ",
		nativeGreeting: "খুরুমজরি",
		primaryColor: "#14B8A6",
		secondaryColor: "#2DD4BF",
		accentColor: "#5EEAD4",
	},
	kashmiri: {
		name: "Kashmiri",
		nativeName: "कॉशुर",
		nativeScript: "कॉ",
		nativeGreeting: "आदाब",
		primaryColor: "#F43F5E",
		secondaryColor: "#FB7185",
		accentColor: "#FDA4AF",
	},
	sindhi: {
		name: "Sindhi",
		nativeName: "سنڌي",
		nativeScript: "س",
		nativeGreeting: "سلام",
		primaryColor: "#84CC16",
		secondaryColor: "#A3E635",
		accentColor: "#BEF264",
	},
	nepali: {
		name: "Nepali",
		nativeName: "नेपाली",
		nativeScript: "ने",
		nativeGreeting: "नमस्ते",
		primaryColor: "#DC2626",
		secondaryColor: "#EF4444",
		accentColor: "#F87171",
	},
	maithili: {
		name: "Maithili",
		nativeName: "मैथिली",
		nativeScript: "मै",
		nativeGreeting: "प्रणाम",
		primaryColor: "#0D9488",
		secondaryColor: "#14B8A6",
		accentColor: "#2DD4BF",
	},
	dogri: {
		name: "Dogri",
		nativeName: "डोगरी",
		nativeScript: "डो",
		nativeGreeting: "नमस्ते",
		primaryColor: "#65A30D",
		secondaryColor: "#84CC16",
		accentColor: "#A3E635",
	},
	bodo: {
		name: "Bodo",
		nativeName: "बड़ो",
		nativeScript: "बो",
		nativeGreeting: "सुस्वागतम",
		primaryColor: "#0891B2",
		secondaryColor: "#06B6D4",
		accentColor: "#22D3EE",
	},
	santali: {
		name: "Santali",
		nativeName: "ᱥᱟᱱᱛᱟᱲᱤ",
		nativeScript: "ᱥᱟ",
		nativeGreeting: "ᱡᱚᱦᱟᱨ",
		primaryColor: "#E11D48",
		secondaryColor: "#F43F5E",
		accentColor: "#FB7185",
	},
	// International Languages
	spanish: {
		name: "Spanish",
		nativeName: "Español",
		nativeScript: "Es",
		nativeGreeting: "Hola",
		primaryColor: "#DC2626",
		secondaryColor: "#F59E0B",
		accentColor: "#FBBF24",
	},
	french: {
		name: "French",
		nativeName: "Français",
		nativeScript: "Fr",
		nativeGreeting: "Bonjour",
		primaryColor: "#2563EB",
		secondaryColor: "#FFFFFF",
		accentColor: "#EF4444",
	},
	german: {
		name: "German",
		nativeName: "Deutsch",
		nativeScript: "De",
		nativeGreeting: "Hallo",
		primaryColor: "#1F2937",
		secondaryColor: "#DC2626",
		accentColor: "#FBBF24",
	},
	portuguese: {
		name: "Portuguese",
		nativeName: "Português",
		nativeScript: "Pt",
		nativeGreeting: "Olá",
		primaryColor: "#16A34A",
		secondaryColor: "#DC2626",
		accentColor: "#FBBF24",
	},
	russian: {
		name: "Russian",
		nativeName: "Русский",
		nativeScript: "Ру",
		nativeGreeting: "Привет",
		primaryColor: "#FFFFFF",
		secondaryColor: "#2563EB",
		accentColor: "#DC2626",
	},
	japanese: {
		name: "Japanese",
		nativeName: "日本語",
		nativeScript: "日",
		nativeGreeting: "こんにちは",
		primaryColor: "#FFFFFF",
		secondaryColor: "#DC2626",
		accentColor: "#EF4444",
	},
	chinese: {
		name: "Chinese",
		nativeName: "中文",
		nativeScript: "中",
		nativeGreeting: "你好",
		primaryColor: "#DC2626",
		secondaryColor: "#FBBF24",
		accentColor: "#EF4444",
	},
	korean: {
		name: "Korean",
		nativeName: "한국어",
		nativeScript: "한",
		nativeGreeting: "안녕하세요",
		primaryColor: "#FFFFFF",
		secondaryColor: "#2563EB",
		accentColor: "#DC2626",
	},
	arabic: {
		name: "Arabic",
		nativeName: "العربية",
		nativeScript: "ع",
		nativeGreeting: "مرحبا",
		primaryColor: "#16A34A",
		secondaryColor: "#FFFFFF",
		accentColor: "#DC2626",
	},
	italian: {
		name: "Italian",
		nativeName: "Italiano",
		nativeScript: "It",
		nativeGreeting: "Ciao",
		primaryColor: "#16A34A",
		secondaryColor: "#FFFFFF",
		accentColor: "#DC2626",
	},
	thai: {
		name: "Thai",
		nativeName: "ภาษาไทย",
		nativeScript: "ไท",
		nativeGreeting: "สวัสดี",
		primaryColor: "#DC2626",
		secondaryColor: "#FFFFFF",
		accentColor: "#2563EB",
	},
	vietnamese: {
		name: "Vietnamese",
		nativeName: "Tiếng Việt",
		nativeScript: "Vi",
		nativeGreeting: "Xin chào",
		primaryColor: "#DC2626",
		secondaryColor: "#FBBF24",
		accentColor: "#EF4444",
	},
	turkish: {
		name: "Turkish",
		nativeName: "Türkçe",
		nativeScript: "Tü",
		nativeGreeting: "Merhaba",
		primaryColor: "#DC2626",
		secondaryColor: "#FFFFFF",
		accentColor: "#EF4444",
	},
	persian: {
		name: "Persian",
		nativeName: "فارسی",
		nativeScript: "فا",
		nativeGreeting: "سلام",
		primaryColor: "#16A34A",
		secondaryColor: "#FFFFFF",
		accentColor: "#DC2626",
	},
	indonesian: {
		name: "Indonesian",
		nativeName: "Bahasa Indonesia",
		nativeScript: "Id",
		nativeGreeting: "Halo",
		primaryColor: "#DC2626",
		secondaryColor: "#FFFFFF",
		accentColor: "#EF4444",
	},
	dutch: {
		name: "Dutch",
		nativeName: "Nederlands",
		nativeScript: "Nl",
		nativeGreeting: "Hallo",
		primaryColor: "#DC2626",
		secondaryColor: "#FFFFFF",
		accentColor: "#2563EB",
	},
	polish: {
		name: "Polish",
		nativeName: "Polski",
		nativeScript: "Pl",
		nativeGreeting: "Cześć",
		primaryColor: "#FFFFFF",
		secondaryColor: "#DC2626",
		accentColor: "#EF4444",
	},
	greek: {
		name: "Greek",
		nativeName: "Ελληνικά",
		nativeScript: "Ελ",
		nativeGreeting: "Γεια σου",
		primaryColor: "#2563EB",
		secondaryColor: "#FFFFFF",
		accentColor: "#3B82F6",
	},
	swedish: {
		name: "Swedish",
		nativeName: "Svenska",
		nativeScript: "Sv",
		nativeGreeting: "Hej",
		primaryColor: "#2563EB",
		secondaryColor: "#FBBF24",
		accentColor: "#3B82F6",
	},
	hebrew: {
		name: "Hebrew",
		nativeName: "עברית",
		nativeScript: "עב",
		nativeGreeting: "שלום",
		primaryColor: "#2563EB",
		secondaryColor: "#FFFFFF",
		accentColor: "#3B82F6",
	},
};

/**
 * Get language info by language name (case-insensitive)
 * Falls back to a generated entry for unknown languages
 */
export function getLanguageInfo(languageName: string): LanguageInfo {
	const key = languageName.toLowerCase().trim();

	if (LANGUAGE_DATA[key]) {
		return LANGUAGE_DATA[key];
	}

	// Generate fallback for unknown languages
	const hash = generateColorHash(languageName);
	return {
		name: languageName,
		nativeName: languageName,
		nativeScript: languageName.substring(0, 2).toUpperCase(),
		nativeGreeting: languageName,
		primaryColor: `hsl(${hash}, 70%, 45%)`,
		secondaryColor: `hsl(${(hash + 30) % 360}, 65%, 55%)`,
		accentColor: `hsl(${(hash + 60) % 360}, 60%, 60%)`,
	};
}

/**
 * Generate a consistent color hash from a string
 */
function generateColorHash(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return Math.abs(hash % 360);
}

/**
 * Get native script letter for a language
 * Used for compact display in Movies/Live TV cards
 */
export function getNativeScript(languageName: string): string {
	return getLanguageInfo(languageName).nativeScript;
}

/**
 * Get full native name for a language
 * Used for Radio cards with full text
 */
export function getNativeFullName(languageName: string): string {
	return getLanguageInfo(languageName).nativeName;
}

/**
 * Get native greeting for a language
 */
export function getNativeGreeting(languageName: string): string {
	return getLanguageInfo(languageName).nativeGreeting;
}
