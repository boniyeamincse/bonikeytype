import React from 'react';
import { Shield, Mail, AlertCircle, FileText } from 'lucide-react';

const SecurityPolicy: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto py-20 px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <header className="flex items-center gap-6 mb-16">
                <div className="p-5 rounded-3xl bg-main/10 shadow-glow" style={{ color: 'var(--main-color)' }}>
                    <Shield size={48} />
                </div>
                <div>
                    <h2 className="text-5xl font-black uppercase tracking-tighter gradient-text">Security Policy</h2>
                    <p className="text-xs font-black uppercase tracking-[0.4em] opacity-30 mt-1">Our commitment to safety</p>
                </div>
            </header>

            <div className="premium-card p-12 space-y-16">
                <section>
                    <p className="text-xl leading-relaxed italic opacity-80" style={{ color: 'var(--text-color)' }}>
                        We take the security and integrity of BoniTypes very seriously. If you have found a vulnerability, please report it ASAP so we can quickly remediate the issue.
                    </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <section className="space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                            <Mail size={24} className="text-main" />
                            <h2 className="text-2xl font-black uppercase tracking-tight">disclosure</h2>
                        </div>
                        <div className="space-y-6 opacity-60 font-bold leading-relaxed">
                            <p>
                                Please send your disclosure via email to{' '}
                                <a href="mailto:boniyeamincse@gmail.com" className="text-main underline decoration-2 underline-offset-4 hover:opacity-100 transition-all">boniyeamincse@gmail.com</a>.
                            </p>
                            <p>
                                For non-security platform bugs, use our{' '}
                                <a href="https://github.com/boniyeamincse/bonikeytype/issues" target="_blank" rel="noopener noreferrer" className="text-main underline decoration-2 underline-offset-4 hover:opacity-100 transition-all">guidelines</a>.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                            <AlertCircle size={24} className="text-main" />
                            <h2 className="text-2xl font-black uppercase tracking-tight">guidelines</h2>
                        </div>
                        <p className="opacity-60 font-bold leading-relaxed">
                            Do not engage in activities that might cause a denial of service, create significant strains on critical resources, or negatively impact users of the site.
                        </p>
                    </section>
                </div>

                <div className="p-8 rounded-2xl bg-black/20 border border-white/5 shadow-inner">
                    <p className="mb-6 font-black uppercase tracking-[0.3em] text-[10px] opacity-30">Minimum Disclosure Requirements:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-bold opacity-60">
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-main"></div>
                            Vulnerability description
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-main"></div>
                            Proof of concept
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-main"></div>
                            Impact analysis
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-main"></div>
                            Screenshots/Recordings
                        </li>
                    </ul>
                </div>

                <footer className="pt-12 border-t border-white/5 opacity-20">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black">
                        <FileText size={16} />
                        <span>Last Updated: March 11, 2026</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default SecurityPolicy;
