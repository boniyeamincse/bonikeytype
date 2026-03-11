import React, { useState } from 'react';
import { useSettings } from '../store/SettingsContext';
import type { Theme, CaretStyle, Difficulty, QuickRestartKey } from '../store/SettingsContext';
import {
    Settings as SettingsIcon,
    Zap,
    Palette,
    Monitor,
    Info
} from 'lucide-react';

const SettingsPage: React.FC = () => {
    const {
        theme, setTheme,
        fontSize, setFontSize,
        caretStyle, setCaretStyle,
        quickRestart, setQuickRestart,
        blindMode, setBlindMode,
        difficulty, setDifficulty
    } = useSettings();

    const [activeCategory, setActiveCategory] = useState('behavior');

    const categories = [
        { id: 'behavior', icon: <Zap size={18} />, label: 'behavior' },
        { id: 'appearance', icon: <Monitor size={18} />, label: 'appearance' },
        { id: 'theme', icon: <Palette size={18} />, label: 'theme' },
    ];

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

    const difficulties: { id: Difficulty; label: string; desc: string }[] = [
        { id: 'normal', label: 'normal', desc: 'the classic typing experience' },
        { id: 'expert', label: 'expert', desc: 'fail if you submit an incorrect word' },
        { id: 'master', label: 'master', desc: 'fail immediately on any mistype' },
    ];

    const restartKeys: { id: QuickRestartKey; label: string }[] = [
        { id: 'off', label: 'off' },
        { id: 'tab', label: 'tab' },
        { id: 'esc', label: 'esc' },
        { id: 'enter', label: 'enter' },
    ];

    const renderSettingGroup = (title: string, icon: React.ReactNode, children: React.ReactNode) => (
        <div className="space-y-6">
            <div className="flex items-center gap-3 opacity-30 mt-10 first:mt-0">
                {icon}
                <h2 className="text-sm font-bold uppercase tracking-widest">{title}</h2>
            </div>
            <div className="grid gap-2">
                {children}
            </div>
        </div>
    );

    const renderOption = (
        label: string,
        desc: string,
        currentValue: string | number | boolean,
        options: { id: any; label: string; desc?: string }[],
        onChange: (val: any) => void
    ) => (
        <div className="p-4 rounded-xl hover:bg-black/5 transition-colors group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="max-w-md">
                    <div className="font-bold flex items-center gap-2">
                        {label}
                        <Info size={14} className="opacity-0 group-hover:opacity-20 transition-opacity cursor-help" />
                    </div>
                    <div className="text-sm opacity-40 leading-relaxed font-mono">{desc}</div>
                </div>
                <div className="flex bg-black/10 p-1 rounded-lg self-start">
                    {options.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => onChange(opt.id)}
                            className={`px-4 py-2 rounded-md transition-all text-xs font-bold uppercase tracking-widest ${currentValue === opt.id
                                ? 'bg-main text-bg'
                                : 'hover:text-main opacity-50 hover:opacity-100'
                                }`}
                            style={{
                                backgroundColor: currentValue === opt.id ? 'var(--main-color)' : 'transparent',
                                color: currentValue === opt.id ? 'var(--bg-color)' : 'inherit'
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto py-16 px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="flex items-center gap-6">
                    <div className="p-5 rounded-3xl bg-main/10 shadow-glow" style={{ color: 'var(--main-color)' }}>
                        <SettingsIcon size={48} />
                    </div>
                    <div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter gradient-text">Settings</h2>
                        <p className="text-xs font-black uppercase tracking-[0.4em] opacity-30 mt-1">Configure your typing experience</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Side Navigation */}
                <div className="lg:col-span-1 space-y-4">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black uppercase tracking-[0.2em] text-[10px] ${activeCategory === cat.id
                                ? 'premium-card text-main bg-main/5'
                                : 'opacity-40 hover:opacity-100'
                                }`}
                            style={{ color: activeCategory === cat.id ? 'var(--main-color)' : 'inherit' }}
                        >
                            <span className={activeCategory === cat.id ? 'text-main' : 'opacity-50'}>{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-3">
                    <div className="premium-card p-10 min-h-[500px]">
                        {activeCategory === 'behavior' && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-12">
                                {renderSettingGroup('behavior', <Zap size={18} />, (
                                    <div className="space-y-4">
                                        {renderOption(
                                            'test difficulty',
                                            'normal is the classic experience. expert fails on incorrect word submission. master fails immediately on any mistake.',
                                            difficulty,
                                            difficulties,
                                            setDifficulty
                                        )}
                                        {renderOption(
                                            'quick restart',
                                            'press a key to quickly restart the test or jump to the test page.',
                                            quickRestart,
                                            restartKeys,
                                            setQuickRestart
                                        )}
                                        <div className="p-6 rounded-2xl bg-black/10 border border-white/5 hover:bg-black/20 transition-all group flex items-center justify-between">
                                            <div className="max-w-md">
                                                <div className="font-black uppercase tracking-tight text-lg">blind mode</div>
                                                <div className="text-sm opacity-30 font-bold mt-1">no errors or incorrect words are highlighted.</div>
                                            </div>
                                            <button
                                                onClick={() => setBlindMode(!blindMode)}
                                                className={`w-16 h-8 rounded-full transition-all relative ${blindMode ? 'bg-main' : 'bg-sub/20'}`}
                                                style={{ backgroundColor: blindMode ? 'var(--main-color)' : 'var(--sub-color)', opacity: blindMode ? 1 : 0.3 }}
                                            >
                                                <div className={`absolute top-1.5 w-5 h-5 bg-bg rounded-full transition-all shadow-md ${blindMode ? 'right-1.5' : 'left-1.5'}`} style={{ backgroundColor: 'var(--bg-color)' }} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeCategory === 'appearance' && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-12">
                                {renderSettingGroup('appearance', <Monitor size={18} />, (
                                    <div className="space-y-4">
                                        {renderOption(
                                            'font size',
                                            'change the font size of the typing text.',
                                            fontSize,
                                            [16, 24, 32, 40, 48].map(s => ({ id: s, label: `${s}px` })),
                                            setFontSize
                                        )}
                                        {renderOption(
                                            'caret style',
                                            'change the appearance of the caret.',
                                            caretStyle,
                                            caretStyles.map(c => ({ id: c.id, label: c.name })),
                                            setCaretStyle
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeCategory === 'theme' && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-12">
                                {renderSettingGroup('theme', <Palette size={18} />, (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                        {themes.map(t => (
                                            <button
                                                key={t.id}
                                                onClick={() => setTheme(t.id)}
                                                className={`p-8 rounded-3xl border-2 transition-all text-left relative overflow-hidden group ${theme === t.id ? 'bg-main/5 border-main shadow-glow' : 'border-white/5 bg-black/10 hover:border-white/20'
                                                    }`}
                                                style={{ borderColor: theme === t.id ? 'var(--main-color)' : '' }}
                                            >
                                                {theme === t.id && (
                                                    <div className="absolute top-0 right-0 w-24 h-24 bg-main/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
                                                )}
                                                <div className="flex justify-between items-center mb-6 relative z-10">
                                                    <div className="font-black uppercase tracking-widest text-sm">{t.name}</div>
                                                    {theme === t.id && (
                                                        <div className="w-2.5 h-2.5 rounded-full bg-main shadow-glow" style={{ backgroundColor: 'var(--main-color)' }} />
                                                    )}
                                                </div>
                                                <div className="flex gap-3 relative z-10">
                                                    {t.colors.map((c, i) => (
                                                        <div key={i} className="w-8 h-8 rounded-xl border border-white/5 shadow-inner" style={{ backgroundColor: c }} />
                                                    ))}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <footer className="mt-32 pt-16 border-t border-white/5 flex flex-col items-center gap-8 opacity-20 hover:opacity-100 transition-opacity duration-700">
                <div className="font-black uppercase tracking-[0.8em] text-[10px] gradient-text italic">bonitypes premium v1.2.0</div>
                <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em]">
                    <span className="cursor-pointer hover:text-main transition-colors">support</span>
                    <span className="cursor-pointer hover:text-main transition-colors">github</span>
                    <span className="cursor-pointer hover:text-main transition-colors">discord</span>
                    <span className="cursor-pointer hover:text-main transition-colors">legal</span>
                </div>
            </footer>
        </div>
    );
};

export default SettingsPage;
