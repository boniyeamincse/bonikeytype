import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'default' | 'dracula' | 'light' | 'carbon';
export type CaretStyle = 'line' | 'block' | 'underline' | 'hidden';

interface Settings {
    theme: Theme;
    fontSize: number;
    caretStyle: CaretStyle;
    quickRestart: boolean;
    blindMode: boolean;
}

interface SettingsContextType extends Settings {
    setTheme: (theme: Theme) => void;
    setFontSize: (size: number) => void;
    setCaretStyle: (style: CaretStyle) => void;
    setQuickRestart: (value: boolean) => void;
    setBlindMode: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>(() => {
        const saved = localStorage.getItem('bonitypes-settings');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse settings", e);
            }
        }
        return {
            theme: (localStorage.getItem('theme') as Theme) || 'default',
            fontSize: 32,
            caretStyle: 'line',
            quickRestart: true,
            blindMode: false
        };
    });

    const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
        setSettings(prev => {
            const next = { ...prev, [key]: value };
            localStorage.setItem('bonitypes-settings', JSON.stringify(next));
            return next;
        });
    };

    const setTheme = (theme: Theme) => updateSetting('theme', theme);
    const setFontSize = (fontSize: number) => updateSetting('fontSize', fontSize);
    const setCaretStyle = (caretStyle: CaretStyle) => updateSetting('caretStyle', caretStyle);
    const setQuickRestart = (quickRestart: boolean) => updateSetting('quickRestart', quickRestart);
    const setBlindMode = (blindMode: boolean) => updateSetting('blindMode', blindMode);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', settings.theme === 'default' ? '' : settings.theme);
    }, [settings.theme]);

    return (
        <SettingsContext.Provider value={{
            ...settings,
            setTheme,
            setFontSize,
            setCaretStyle,
            setQuickRestart,
            setBlindMode
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('useSettings must be used within SettingsProvider');
    return context;
};

// Alias for backwards compatibility
export const useTheme = useSettings;
