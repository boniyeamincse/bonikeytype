import React from 'react';
import { useSettings } from '../store/SettingsContext';
import type { Theme, CaretStyle } from '../store/SettingsContext';
import { Settings as SettingsIcon, Type, MousePointer2, Zap, Palette, Monitor } from 'lucide-react';

const SettingsPage: React.FC = () => {
    const {
        theme, setTheme,
        fontSize, setFontSize,
        caretStyle, setCaretStyle,
        quickRestart, setQuickRestart,
        blindMode, setBlindMode
    } = useSettings();

    const themes: { name: string; id: Theme; colors: string[] }[] = [
        { name: 'serika dark', id: 'default', colors: ['#323437', '#e2b714', '#d1d0c5'] },
        { name: 'dracula', id: 'dracula', colors: ['#282a36', '#bd93f9', '#f8f8f2'] },
        { name: 'carbon', id: 'carbon', colors: ['#161616', '#f66e0d', '#eeeeee'] },
        { name: 'light', id: 'light', colors: ['#ffffff', '#000000', '#444444'] },
    ];

    const caretStyles: { name: string; id: CaretStyle }[] = [
        { name: 'line', id: 'line' },
        { name: 'block', id: 'block' },
        { name: 'underline', id: 'underline' },
        { name: 'hidden', id: 'hidden' },
    ];

    const fontSizes = [16, 24, 32, 40, 48];

    return (
        <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in duration-700">
            <header className="flex items-center gap-4 mb-12">
                <SettingsIcon size={32} style={{ color: 'var(--main-color)' }} />
                <h1 className="text-3xl font-bold tracking-tight">settings</h1>
            </header>

            <div className="space-y-16">
                {/* Behavior Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6 opacity-50">
                        <Zap size={20} />
                        <h2 className="text-lg font-bold uppercase tracking-widest">behavior</h2>
                    </div>
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-black/5 transition-colors">
                            <div>
                                <div className="font-bold">quick restart</div>
                                <div className="text-sm opacity-50">press tab to quickly restart the test</div>
                            </div>
                            <button
                                onClick={() => setQuickRestart(!quickRestart)}
                                className={`w-12 h-6 rounded-full transition-all relative ${quickRestart ? 'bg-main' : 'bg-sub/20'}`}
                                style={{ backgroundColor: quickRestart ? 'var(--main-color)' : 'var(--sub-color)', opacity: quickRestart ? 1 : 0.3 }}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-bg rounded-full transition-all ${quickRestart ? 'right-1' : 'left-1'}`} style={{ backgroundColor: 'var(--bg-color)' }} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-black/5 transition-colors">
                            <div>
                                <div className="font-bold">blind mode</div>
                                <div className="text-sm opacity-50">no error highlighting while typing</div>
                            </div>
                            <button
                                onClick={() => setBlindMode(!blindMode)}
                                className={`w-12 h-6 rounded-full transition-all relative ${blindMode ? 'bg-main' : 'bg-sub/20'}`}
                                style={{ backgroundColor: blindMode ? 'var(--main-color)' : 'var(--sub-color)', opacity: blindMode ? 1 : 0.3 }}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-bg rounded-full transition-all ${blindMode ? 'right-1' : 'left-1'}`} style={{ backgroundColor: 'var(--bg-color)' }} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Appearance Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6 opacity-50">
                        <Monitor size={20} />
                        <h2 className="text-lg font-bold uppercase tracking-widest">appearance</h2>
                    </div>
                    <div className="grid gap-8">
                        <div className="p-4 rounded-xl bg-black/5 border border-white/5">
                            <div className="flex items-center gap-2 mb-4">
                                <Type size={18} />
                                <span className="font-bold">font size</span>
                            </div>
                            <div className="flex gap-2">
                                {fontSizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setFontSize(size)}
                                        className={`px-4 py-2 rounded-lg font-mono transition-all ${fontSize === size ? 'bg-main text-bg' : 'hover:bg-white/5 opacity-50'}`}
                                        style={{
                                            backgroundColor: fontSize === size ? 'var(--main-color)' : 'transparent',
                                            color: fontSize === size ? 'var(--bg-color)' : 'var(--text-color)'
                                        }}
                                    >
                                        {size}px
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-black/5 border border-white/5">
                            <div className="flex items-center gap-2 mb-4">
                                <MousePointer2 size={18} />
                                <span className="font-bold">caret style</span>
                            </div>
                            <div className="flex gap-2">
                                {caretStyles.map(style => (
                                    <button
                                        key={style.id}
                                        onClick={() => setCaretStyle(style.id)}
                                        className={`px-4 py-2 rounded-lg capitalize transition-all ${caretStyle === style.id ? 'bg-main text-bg' : 'hover:bg-white/5 opacity-50'}`}
                                        style={{
                                            backgroundColor: caretStyle === style.id ? 'var(--main-color)' : 'transparent',
                                            color: caretStyle === style.id ? 'var(--bg-color)' : 'var(--text-color)'
                                        }}
                                    >
                                        {style.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Theme Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6 opacity-50">
                        <Palette size={20} />
                        <h2 className="text-lg font-bold uppercase tracking-widest">theme</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {themes.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id)}
                                className={`p-4 rounded-xl border-2 transition-all text-left ${theme === t.id ? 'border-main' : 'border-transparent bg-black/5 hover:bg-black/10'}`}
                                style={{ borderColor: theme === t.id ? 'var(--main-color)' : 'transparent' }}
                            >
                                <div className="font-bold mb-3">{t.name}</div>
                                <div className="flex gap-1">
                                    {t.colors.map((c, i) => (
                                        <div key={i} className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: c }} />
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            <footer className="mt-20 pt-8 border-t border-white/5 text-center opacity-30 text-xs uppercase tracking-widest font-bold">
                bonitypes v1.0.0
            </footer>
        </div>
    );
};

export default SettingsPage;
