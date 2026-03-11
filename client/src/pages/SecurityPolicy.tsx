import React from 'react';
import { Shield, Mail, AlertCircle, FileText } from 'lucide-react';

const SecurityPolicy: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto py-20 px-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center gap-4 mb-12">
                <Shield size={48} style={{ color: 'var(--main-color)' }} />
                <h1 className="text-4xl font-bold tracking-tight" style={{ color: 'var(--text-color)' }}>security policy</h1>
            </div>

            <div className="space-y-12">
                <section>
                    <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-color)' }}>
                        We take the security and integrity of BoniTypes very seriously. If you have found a vulnerability, please report it ASAP so we can quickly remediate the issue.
                    </p>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Mail size={24} style={{ color: 'var(--main-color)' }} />
                        <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-color)' }}>how to disclose a vulnerability</h2>
                    </div>
                    <div className="pl-9 space-y-4" style={{ color: 'var(--sub-color)' }}>
                        <p>
                            For vulnerabilities that impact the confidentiality, integrity, and availability of BoniTypes services, please send your disclosure via email to{' '}
                            <a
                                href="mailto:boniyeamincse@gmail.com"
                                className="font-bold underline decoration-2 transition-all"
                                style={{ color: 'var(--main-color)' }}
                            >
                                boniyeamincse@gmail.com
                            </a>.
                        </p>
                        <p>
                            For non-security related platform bugs, please follow our bug submission{' '}
                            <a
                                href="https://github.com/boniyeamincse/bonikeytype/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold underline decoration-2 transition-all"
                                style={{ color: 'var(--main-color)' }}
                            >
                                guidelines
                            </a>.
                        </p>
                        <div className="mt-6 p-6 rounded-2xl bg-black/10 border border-white/5">
                            <p className="mb-4 font-bold uppercase tracking-widest text-xs opacity-50">at a minimum, disclosures should include:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>vulnerability description</li>
                                <li>proof of concept</li>
                                <li>impact</li>
                                <li>screenshots or proof</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertCircle size={24} style={{ color: 'var(--main-color)' }} />
                        <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-color)' }}>submission guidelines</h2>
                    </div>
                    <div className="pl-9 space-y-4" style={{ color: 'var(--sub-color)' }}>
                        <p className="leading-relaxed">
                            Do not engage in activities that might cause a denial of service condition, create significant strains on critical resources, or negatively impact users of the site outside of test accounts.
                        </p>
                    </div>
                </section>

                <section className="pt-12 border-t border-white/5 opacity-40">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
                        <FileText size={14} />
                        <span>last updated: march 11, 2026</span>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SecurityPolicy;
