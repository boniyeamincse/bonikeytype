import React from 'react';
import { useSettings } from '../store/SettingsContext';

const AdsPlaceholder: React.FC = () => {
    const { showAds } = useSettings();

    if (!showAds) return null;

    return (
        <div className="w-full max-w-4xl mx-auto my-12 animate-in fade-in duration-1000">
            <div className="premium-card p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-full bg-main/5 -skew-x-12 translate-x-16 group-hover:translate-x-12 transition-transform duration-700"></div>

                <div className="relative z-10 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded bg-main/10 text-main text-[8px] font-black uppercase tracking-widest border border-main/20">Sponsored</span>
                        <span className="text-xs font-black uppercase tracking-[0.3em] opacity-30">Announcement</span>
                    </div>
                    <h3 className="text-xl font-black tracking-tight">Support BoniTypes Development</h3>
                    <p className="text-sm opacity-50 font-bold max-w-md">Enjoy an ad-free experience, custom themes, and early access to new features with BoniTypes Premium.</p>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                    <button className="px-8 py-4 rounded-2xl bg-main text-bg text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-glow" style={{ backgroundColor: 'var(--main-color)', color: 'var(--bg-color)' }}>
                        Go Premium
                    </button>
                    <button className="px-8 py-4 rounded-2xl bg-black/20 hover:bg-black/40 text-xs font-black uppercase tracking-widest border border-white/5 transition-all">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdsPlaceholder;
