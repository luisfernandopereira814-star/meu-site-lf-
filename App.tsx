
import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Wind, 
  Thermometer, 
  CheckCircle2, 
  Menu, 
  X,
  ChevronRight,
  Activity,
  MessageCircle,
  Send,
  User,
  Moon,
  Sun,
  Plus,
  Minus
} from 'lucide-react';

// Componente customizado para o ícone do WhatsApp
const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const AirFlowEffect = () => {
  const [particles] = useState(() => 
    [...Array(20)].map(() => ({
      top: Math.random() * 100,
      startY: (Math.random() - 0.5) * 60,
      midY: (Math.random() - 0.5) * 120,
      endY: (Math.random() - 0.5) * 80,
      maxOpacity: 0.1 + Math.random() * 0.4,
      duration: 12 + Math.random() * 15,
      delay: Math.random() * 20,
      scale: 0.5 + Math.random() * 1.5,
      rotateMid: (Math.random() - 0.5) * 15,
      rotateEnd: (Math.random() - 0.5) * 25,
      width: 150 + Math.random() * 250
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <div 
          key={i}
          className="air-particle animate-air-flow"
          style={{
            top: `${p.top}%`,
            left: `-300px`,
            width: `${p.width}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: 0,
            '--start-y': `${p.startY}px`,
            '--mid-y': `${p.midY}px`,
            '--end-y': `${p.endY}px`,
            '--max-opacity': p.maxOpacity,
            '--rotate-mid': `${p.rotateMid}deg`,
            '--rotate-end': `${p.rotateEnd}deg`,
            transform: `scale(${p.scale})`,
          } as React.CSSProperties}
        />
      ))}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-100/10 dark:from-blue-900/5 to-transparent opacity-30"></div>
    </div>
  );
};

const Navbar = ({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: (v: boolean) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'services', 'pmoc', 'faq', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Início', id: 'home' },
    { label: 'Sobre Nós', id: 'about' },
    { label: 'Serviços', id: 'services' },
    { label: 'PMOC', id: 'pmoc' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contato', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center space-x-2 group">
          <div className="bg-blue-600 p-2 rounded text-white font-bold text-xl transition-transform group-hover:scale-110">LF</div>
          <div className={`font-bold text-sm md:text-lg leading-tight transition-colors ${scrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}>
            <span>Climatização</span> <span className="text-blue-500">e Refrigeração</span>
          </div>
        </a>
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={(e) => handleLinkClick(e, `#${item.id}`)} 
              className={`font-medium transition-all relative py-2 ${scrolled ? (activeSection === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-500') : (activeSection === item.id ? 'text-blue-400' : 'text-white hover:text-blue-300')}`}
            >
              {item.label}
              {activeSection === item.id && <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full ${scrolled ? 'bg-blue-600 dark:bg-blue-400' : 'bg-blue-400'}`}></span>}
            </a>
          ))}
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full ${scrolled ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/10'}`}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <div className="flex items-center md:hidden">
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 mr-2 ${scrolled ? 'text-gray-600 dark:text-gray-300' : 'text-white'}`}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X className={scrolled ? 'text-gray-800 dark:text-white' : 'text-white'} /> : <Menu className={scrolled ? 'text-gray-800 dark:text-white' : 'text-white'} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 p-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={(e) => handleLinkClick(e, `#${item.id}`)} className="text-lg font-semibold py-2 border-b dark:border-slate-800 dark:text-gray-300">{item.label}</a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
  };
  return (
    <header id="home" className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1590424753062-3251ca961053?auto=format&fm=webp&q=75&w=2000" alt="Ar condicionado" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-blue-900/40"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10 text-white pt-24">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 bg-blue-600 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">Compromisso com a Qualidade do Ar</span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">Sua Segurança e Conforto em <span className="text-blue-400">Ambientes Climatizados</span></h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">Especialistas em manutenção preventiva, corretiva e gestão de PMOC. Qualidade e compromisso com o ar que você respira.</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#contact" onClick={scrollToContact} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all text-center shadow-lg shadow-blue-500/30 animate-shadow-pulse">Fale Conosco</a>
            <a href="#services" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-semibold rounded-lg transition-all text-center">Nossos Serviços</a>
          </div>
        </div>
      </div>
    </header>
  );
};

const Features = () => (
  <section className="py-20 bg-gray-50/80 dark:bg-slate-900/40 backdrop-blur-sm relative z-10">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-500" />, title: "Conformidade Legal", desc: "Atendemos rigorosamente as normas ANVISA e Portaria nº 3.523." },
          { icon: <Clock className="w-8 h-8 text-blue-600 dark:text-blue-500" />, title: "Atendimento 24/7", desc: "Disponibilidade para chamados emergenciais em horários especiais." },
          { icon: <Activity className="w-8 h-8 text-blue-600 dark:text-blue-500" />, title: "Manutenção Preventiva", desc: "Foco total em prolongar a vida útil dos seus equipamentos." },
          { icon: <Wind className="w-8 h-8 text-blue-600 dark:text-blue-500" />, title: "Qualidade do Ar", desc: "Aplicação de produtos bactericidas para um ambiente mais saudável." },
        ].map((f, i) => (
          <div key={i} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all">
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{f.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm scroll-mt-20 relative z-10">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 relative">
          <img src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fm=webp&q=75&w=1200" alt="Técnico" className="rounded-3xl shadow-2xl border dark:border-slate-800/30" />
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-100/50 dark:bg-blue-900/10 rounded-3xl -z-10"></div>
        </div>
        <div className="lg:w-1/2">
          <h4 className="text-blue-600 dark:text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">LF Climatização</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">Compromisso com o ar que você respira</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">A LF Climatização e Refrigeração nasceu com o objetivo claro de garantir que ambientes corporativos e residenciais tenham a melhor qualidade de ar possível.</p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">Nossa atuação é baseada em rigorosos processos técnicos, garantindo que os equipamentos não apenas funcionem, mas operem com eficiência máxima e baixo consumo.</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Excelência Técnica", "Responsabilidade Ambiental", "Conformidade ANVISA", "Suporte 24 Horas"].map(t => (
              <li key={t} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 font-medium"><CheckCircle2 className="w-5 h-5 text-green-500" /><span>{t}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="py-24 bg-gray-50/50 dark:bg-slate-900/30 scroll-mt-20 relative z-10">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 dark:text-white">Soluções Completas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Manutenção Preventiva", icon: <Activity className="w-10 h-10 text-blue-600" />, desc: "Inspeção mensal para evitar quebras e garantir a vida útil dos equipamentos." },
          { title: "Higienização & Bactericida", icon: <Wind className="w-10 h-10 text-blue-600" />, desc: "Eliminação completa de microrganismos nocivos à saúde no sistema." },
          { title: "Análise Técnica", icon: <Thermometer className="w-10 h-10 text-blue-600" />, desc: "Verificação detalhada de parâmetros de performance e segurança." }
        ].map(s => (
          <div key={s.title} className="bg-white/80 dark:bg-slate-800/80 p-10 rounded-3xl border dark:border-slate-700 hover:shadow-xl transition-all">
            <div className="mb-6">{s.icon}</div>
            <h3 className="text-2xl font-bold mb-4 dark:text-white">{s.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PMOCSection = () => (
  <section id="pmoc" className="py-24 bg-blue-900 dark:bg-blue-950 text-white scroll-mt-20 relative z-10">
    <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
      <div className="lg:w-1/2">
        <ShieldCheck className="w-16 h-16 mb-6" />
        <h2 className="text-4xl font-bold mb-8">Gestão de PMOC</h2>
        <p className="text-xl text-blue-100 mb-8">Conforme a Lei nº 13.589/2018, todos os edifícios devem possuir um Plano de Manutenção, Operação e Controle.</p>
        <div className="space-y-4">
          <div className="flex gap-4"><CheckCircle2 className="text-blue-400" /><p>Redução de até 30% no consumo de energia.</p></div>
          <div className="flex gap-4"><CheckCircle2 className="text-blue-400" /><p>Prevenção de doenças respiratórias.</p></div>
          <div className="flex gap-4"><CheckCircle2 className="text-blue-400" /><p>Evite multas pesadas da vigilância sanitária.</p></div>
        </div>
      </div>
      <div className="lg:w-1/2 bg-white rounded-3xl p-10 text-gray-900 shadow-2xl border dark:bg-slate-800 dark:text-white dark:border-slate-700">
        <h3 className="text-2xl font-bold mb-6">O que incluímos no seu relatório:</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {["Inspeção Elétrica", "Teste Mecânico", "Bactericida", "Medição de Pressão"].map(t => (
            <div key={t} className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl border dark:border-slate-600 font-bold text-blue-600 dark:text-blue-400">{t}</div>
          ))}
        </div>
        <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700">Solicitar Auditoria Gratuita</button>
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "O que é o PMOC?", a: "O PMOC é o Plano de Manutenção, Operação e Controle, obrigatório por lei para garantir a qualidade do ar em ambientes coletivos." },
    { q: "Atendem residências?", a: "Sim! Atendemos desde ar-condicionados split residenciais até grandes sistemas VRF/Chiller comerciais." },
    { q: "Qual a região de atendimento?", a: "Estamos em Embu das Artes, mas atendemos toda a região metropolitana de São Paulo." }
  ];
  return (
    <section id="faq" className="py-24 bg-gray-50/50 dark:bg-slate-900/30 scroll-mt-20 relative z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">Dúvidas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex justify-between p-6 text-left font-bold dark:text-white">
                {faq.q} {openIndex === i ? <Minus /> : <Plus />}
              </button>
              {openIndex === i && <div className="p-6 pt-0 text-gray-600 dark:text-gray-400 border-t dark:border-slate-700">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Novo Contato via Site*%0A*Nome:* ${formData.nome}%0A*Mensagem:* ${formData.mensagem}`;
    window.open(`https://wa.me/5511933841722?text=${text}`, '_blank');
  };
  return (
    <section id="contact" className="py-24 bg-white/50 dark:bg-slate-950/50 scroll-mt-20 relative z-10">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-bold mb-8 dark:text-white">Fale Conosco</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">Atendimento especializado em Embu das Artes e região.</p>
          <div className="space-y-8">
            <div className="flex gap-4 items-center"><Phone className="text-blue-600" /><p className="font-bold dark:text-white">11 93384-1722</p></div>
            <div className="flex gap-4 items-center"><Mail className="text-blue-600" /><p className="font-bold dark:text-white">atendimento.lf@outlook.com
              </p></div>
            <div className="flex gap-4 items-center"><MapPin className="text-blue-600" /><p className="font-bold dark:text-white">Embu das Artes - SP</p></div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-slate-900 p-10 rounded-3xl border dark:border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input required placeholder="Seu Nome" className="w-full p-4 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
            <textarea required placeholder="Como podemos ajudar?" rows={4} className="w-full p-4 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" value={formData.mensagem} onChange={e => setFormData({...formData, mensagem: e.target.value})} />
            <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all">Enviar Mensagem</button>
          </form>
        </div>
      </div>
    </section>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'welcome' | 'form' | 'redirect'>('welcome');
  const [clientName, setClientName] = useState('');

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá! Meu nome é ${clientName} e vi seu site. Gostaria de um orçamento para manutenção de ar-condicionado.`;
    window.open(`https://wa.me/5511933841722?text=${encodeURIComponent(text)}`, '_blank');
    setStep('redirect');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="bg-white dark:bg-slate-900 w-[340px] sm:w-[380px] rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col mb-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#25D366] p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <WhatsAppIcon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">LF Climatização</h4>
                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span><span className="text-[10px] opacity-80 uppercase font-bold">Online no WhatsApp</span></div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full"><X size={20} /></button>
          </div>

          <div className="p-6 bg-gray-50/50 dark:bg-slate-950">
            {step === 'welcome' ? (
              <div className="space-y-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border dark:border-slate-700 shadow-sm">
                  <p className="text-sm text-gray-800 dark:text-gray-200">Olá! 👋 Como podemos ajudar com seu ar-condicionado hoje?</p>
                </div>
                <button onClick={() => setStep('form')} className="w-full py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2">
                  <WhatsAppIcon size={18} /> Iniciar Atendimento
                </button>
              </div>
            ) : step === 'form' ? (
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Qual seu nome?</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-[#25D366]" 
                    placeholder="Ex: João Silva"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-full py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] flex items-center justify-center gap-2">
                  <Send size={18} /> Chamar no WhatsApp
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center mx-auto"><CheckCircle2 size={32} /></div>
                <h4 className="font-bold dark:text-white">Redirecionando...</h4>
                <p className="text-sm text-gray-500">Estamos abrindo seu WhatsApp para falar com um técnico.</p>
                <button onClick={() => setStep('welcome')} className="text-blue-600 text-sm font-bold">Voltar</button>
              </div>
            )}
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-16 h-16 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95 group overflow-hidden relative ${isOpen ? 'bg-blue-600' : 'bg-[#25D366]'}`}
      >
        {isOpen ? (
          <X size={32} />
        ) : (
          <WhatsAppIcon size={32} />
        )}
      </button>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-20 border-t border-gray-800 relative z-10">
    <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12 text-center md:text-left">
      <div className="col-span-1">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
          <div className="bg-blue-600 p-2 rounded font-bold">LF</div>
          <span className="font-bold">LF Climatização</span>
        </div>
        <p className="text-gray-400 text-sm">Expertise em ambientes saudáveis para sua empresa ou residência.</p>
      </div>
      <div>
        <h4 className="font-bold mb-6">Links Rápidos</h4>
        <ul className="space-y-4 text-gray-400 text-sm">
          <li><a href="#home" className="hover:text-blue-400 transition-colors">Início</a></li>
          <li><a href="#about" className="hover:text-blue-400 transition-colors">Sobre Nós</a></li>
          <li><a href="#pmoc" className="hover:text-blue-400 transition-colors">Gestão PMOC</a></li>
          <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contato</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6">Conformidade</h4>
        <ul className="space-y-4 text-gray-400 text-sm">
          <li>Lei Federal 13.589/2018</li>
          <li>Portaria MS 3.523/98</li>
          <li>Normas da ANVISA</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6">Suporte</h4>
        <div className="flex items-center justify-center md:justify-start gap-2 text-blue-400">
          <Clock size={16} />
          <span className="font-bold">24 Horas / 7 Dias</span>
        </div>
        <p className="mt-4 text-gray-500 text-xs">© {new Date().getFullYear()} LF Climatização.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : true;
    }
    return true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors relative min-h-screen selection:bg-blue-600 selection:text-white">
      <AirFlowEffect />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <Features />
      <About />
      <Services />
      <PMOCSection />
      <FAQSection />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
}
