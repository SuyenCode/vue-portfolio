export type Language = {
	code: string
	name: string
}

export const defaultLanguage: Language = { code: 'NL', name: 'Nederlands' }

export const languages: Language[] = [
	defaultLanguage,
	{ code: 'FR', name: 'Français' },
	{ code: 'EN', name: 'English' },
]
