import React from 'react';
import {
    Info,
    Heart,
    Mail,
    Users,
    Award,
    Github,
    Twitter,
    ExternalLink
} from 'lucide-react';

const AboutPage: React.FC = () => {
    const sections = [
        {
            id: 'about',
            title: 'about',
            icon: <Info size={24} />,
            content: (
                <div className="space-y-4">
                    <p>
                        BoniTypes is a minimalist, customizable typing website, inspired by Monkeytype.
                        It is designed to provide a premium typing practice experience without distractions.
                    </p>
                    <p>
                        Our mission is to help typists of all levels improve their speed and accuracy
                        through a clean interface and deep customization options.
                    </p>
                </div>
            )
        },
        {
            id: 'support',
            title: 'support',
            icon: <Heart size={24} />,
            content: (
                <div className="space-y-4">
                    <p>
                        If you enjoy using BoniTypes and would like to support the development,
                        consider making a donation. Every bit helps keep the servers running and
                        the project alive.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <button className="px-6 py-2 rounded-lg bg-main text-bg font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all" style={{ backgroundColor: 'var(--main-color)', color: 'var(--bg-color)' }}>
                            Buy me a coffee
                        </button>
                        <button className="px-6 py-2 rounded-lg bg-sub/10 text-main font-bold uppercase tracking-widest text-xs border border-main/20 hover:bg-main/10 transition-all" style={{ color: 'var(--main-color)' }}>
                            Patreon
                        </button>
                    </div>
                </div>
            )
        },
        {
            id: 'contact',
            title: 'contact',
            icon: <Mail size={24} />,
            content: (
                <div className="space-y-4">
                    <p>
                        Have a question, feedback, or a business inquiry? Reach out to us via
                        email or join our social communities.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href="mailto:boniyeamincse@gmail.com" className="flex items-center gap-3 p-4 rounded-xl bg-black/10 hover:bg-black/20 transition-all group">
                            <Mail size={18} className="opacity-50 group-hover:opacity-100 group-hover:text-main" style={{ color: 'var(--main-color)' }} />
                            <span className="text-sm font-mono">boniyeamincse@gmail.com</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 p-4 rounded-xl bg-black/10 hover:bg-black/20 transition-all group">
                            <Twitter size={18} className="opacity-50 group-hover:opacity-100 group-hover:text-main" style={{ color: 'var(--main-color)' }} />
                            <span className="text-sm font-mono">@bonitypes_dev</span>
                        </a>
                    </div>
                </div>
            )
        },
        {
            id: 'credits',
            title: 'credits',
            icon: <Award size={24} />,
            content: (
                <div className="space-y-4">
                    <p>
                        BoniTypes wouldn't be possible without these amazing open-source projects and inspirations:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm font-mono opacity-60">
                        <li>Monkeytype (Design & Concept Inspiration)</li>
                        <li>React & Vite (Frontend Foundation)</li>
                        <li>TailwindCSS (Styling)</li>
                        <li>Lucide Icons (Visual Assets)</li>
                        <li>Google Fonts (Typography)</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'supporters',
            title: 'top supporters',
            icon: <Heart size={24} className="text-main" style={{ color: 'var(--main-color)' }} />,
            content: (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Alex T.', 'CyberNinja', 'TypingGod', 'Sarah M.', 'FutureDev', 'Echo'].map((name, i) => (
                        <div key={i} className="px-4 py-3 rounded-lg bg-black/10 text-center text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-all border border-transparent hover:border-main/20">
                            {name}
                        </div>
                    ))}
                    <div className="px-4 py-3 rounded-lg bg-main/5 text-center text-xs font-bold uppercase tracking-widest text-main/40 border border-dashed border-main/20 col-span-full mt-2">
                        Your name could be here!
                    </div>
                </div>
            )
        },
        {
            id: 'contributors',
            title: 'contributors',
            icon: <Users size={24} />,
            content: (
                <div className="space-y-6">
                    <p>
                        Special thanks to everyone who has contributed code, bug reports, or translations!
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a href="https://github.com/boniyeamincse" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-black/10 hover:bg-black/20 transition-all group">
                            <div className="w-10 h-10 rounded-full bg-main/20 flex items-center justify-center font-bold text-main" style={{ color: 'var(--main-color)' }}>B</div>
                            <div>
                                <div className="text-sm font-bold">Boni Yeamin</div>
                                <div className="text-xs opacity-40">Lead Developer</div>
                            </div>
                            <ExternalLink size={12} className="opacity-0 group-hover:opacity-40 ml-2" />
                        </a>
                        {/* Placeholder for more contributors */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-black/5 opacity-40">
                            <div className="w-10 h-10 rounded-full bg-sub/20 flex items-center justify-center font-bold">?</div>
                            <div>
                                <div className="text-sm font-bold">Join Us</div>
                                <div className="text-xs italic">Open to everyone</div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4">
                        <a href="https://github.com/boniyeamincse/bonikeytype" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-main hover:underline" style={{ color: 'var(--main-color)' }}>
                            <Github size={16} />
                            View Repository on GitHub
                        </a>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="max-w-4xl mx-auto py-16 px-6 animate-in fade-in duration-700">
            <header className="mb-16 text-center">
                <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">BoniTypes</h1>
                <div className="text-sm font-mono opacity-40 uppercase tracking-[0.4em]">about & community</div>
            </header>

            <div className="grid gap-8">
                {sections.map(section => (
                    <section
                        key={section.id}
                        id={section.id}
                        className="p-8 rounded-2xl bg-black/10 border border-white/5 hover:border-white/10 transition-all group"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-black/20 group-hover:text-main transition-colors" style={{ color: 'var(--main-color)' }}>
                                {section.icon}
                            </div>
                            <h2 className="text-xl font-bold uppercase tracking-tight">{section.title}</h2>
                        </div>
                        <div className="text-sub-color leading-relaxed" style={{ color: 'var(--text-color)' }}>
                            {section.content}
                        </div>
                    </section>
                ))}
            </div>

            <footer className="mt-24 pt-12 border-t border-white/5 text-center">
                <div className="text-xs font-bold uppercase tracking-[0.5em] opacity-20">
                    made with love by Boni Yeamin
                </div>
            </footer>
        </div>
    );
};

export default AboutPage;
