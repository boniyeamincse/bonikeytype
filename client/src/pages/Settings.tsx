import React, { useState } from 'react';
import { useSettings } from '../store/SettingsContext';
import type { Theme, CaretStyle, Difficulty, QuickRestartKey } from '../store/SettingsContext';
import {
    Settings as SettingsIcon,
    Type,
    MousePointer2,
    Zap,
    Palette,
    Monitor,
    ShieldAlert,
    Keyboard,
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
        <div className="max-w-5xl mx-auto py-12 px-6 animate-in fade-in duration-700">
            <div className="flex items-center gap-4 mb-16">
                <SettingsIcon size={32} style={{ color: 'var(--main-color)' }} />
                <h1 className="text-3xl font-black">settings</h1>
            </div>

            {/* Category Nav */}
            <div className="flex gap-2 mb-12 bg-black/10 p-1 rounded-2xl w-fit">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold tracking-tight ${activeCategory === cat.id ? 'bg-black/20 text-main' : 'opacity-40 hover:opacity-100'
                            }`}
                        style={{ color: activeCategory === cat.id ? 'var(--main-color)' : 'inherit' }}
                    >
                        {cat.icon}
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="space-y-12">
                {activeCategory === 'behavior' && (
                    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                        {renderSettingGroup('behavior', <Zap size={18} />, (
                            <>
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
                                <div className="p-4 rounded-xl hover:bg-black/5 transition-colors group flex items-center justify-between">
                                    <div className="max-w-md">
                                        <div className="font-bold">blind mode</div>
                                        <div className="text-sm opacity-40 font-mono">no errors or incorrect words are highlighted.</div>
                                    </div>
                                    <button
                                        onClick={() => setBlindMode(!blindMode)}
                                        className={`w-14 h-7 rounded-full transition-all relative ${blindMode ? 'bg-main' : 'bg-sub/20'}`}
                                        style={{ backgroundColor: blindMode ? 'var(--main-color)' : 'var(--sub-color)', opacity: blindMode ? 1 : 0.3 }}
                                    >
                                        <div className={`absolute top-1 w-5 h-5 bg-bg rounded-full transition-all ${blindMode ? 'right-1' : 'left-1'}`} style={{ backgroundColor: 'var(--bg-color)' }} />
                                    </button>
                                </div>
                            </>
                        ))}
                    </div>
                )}

                {activeCategory === 'appearance' && (
                    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                        {renderSettingGroup('appearance', <Monitor size={18} />, (
                            <>
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
                            </>
                        ))}
                    </div>
                )}

                {activeCategory === 'theme' && (
                    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                        {renderSettingGroup('theme', <Palette size={18} />, (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {themes.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setTheme(t.id)}
                                        className={`p-6 rounded-2xl border-2 transition-all text-left group ${theme === t.id ? 'border-main bg-black/5' : 'border-transparent bg-black/5 hover:bg-black/10'
                                            }`}
                                        style={{ borderColor: theme === t.id ? 'var(--main-color)' : 'transparent' }}
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="font-bold tracking-tight">{t.name}</div>
                                            {theme === t.id && <div className="w-2 h-2 rounded-full bg-main" style={{ backgroundColor: 'var(--main-color)' }} />}
                                        </div>
                                        <div className="flex gap-2">
                                            {t.colors.map((c, i) => (
                                                <div key={i} className="w-6 h-6 rounded-lg border border-white/5" style={{ backgroundColor: c }} />
                                            ))}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <footer className="mt-24 pt-12 border-t border-white/5 flex flex-col items-center gap-4 opacity-20 text-xs">
                <div className="font-black uppercase tracking-[0.4em]">bonitypes v1.1.0</div>
                <div className="flex gap-6 font-mono uppercase">
                    <span className="cursor-pointer hover:opacity-100">support</span>
                    <span className="cursor-pointer hover:opacity-100">github</span>
                    <span className="cursor-pointer hover:opacity-100">discord</span>
                    <span className="cursor-pointer hover:opacity-100">twitter</span>
                </div>
            </footer>
        </div>
    );
};

export default SettingsPage;
