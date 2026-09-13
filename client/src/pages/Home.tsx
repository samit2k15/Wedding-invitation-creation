import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Gift,
  Heart,
  MapPin,
  Menu,
  Navigation,
  Send,
  Shirt,
  Sparkles,
  X,
} from "lucide-react";

const HERO = "/manus-storage/noor-armaan-hero_546406e4.jpg";
const GARDEN = "/manus-storage/noor-armaan-garden_9f994458.jpg";
const TABLE = "/manus-storage/noor-armaan-table_20fd7c6f.jpg";

const weddingDate = new Date("2026-11-14T17:30:00+05:30");

const events = [
  {
    time: "04:00 PM",
    title: "The welcome",
    detail: "A rosewater welcome and golden hour portraits in the courtyard.",
  },
  {
    time: "05:30 PM",
    title: "The ceremony",
    detail: "Under the jasmine canopy, with blessings from our families.",
  },
  {
    time: "07:30 PM",
    title: "Dinner & dancing",
    detail: "An evening of candlelight, music, and a table set for all of you.",
  },
];

const gallery = [
  { src: GARDEN, alt: "Ivory roses, ribbon, and a gold envelope", label: "The little details" },
  { src: TABLE, alt: "Candlelit reception table in a conservatory", label: "Dinner under glass" },
  { src: HERO, alt: "Candlelit palace courtyard", label: "Where it begins" },
];

function getTimeRemaining() {
  const difference = weddingDate.getTime() - Date.now();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TwoDigit({ value }: { value: number }) {
  return <span>{String(value).padStart(2, "0")}</span>;
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining);

  useEffect(() => {
    const interval = window.setInterval(() => setTimeLeft(getTimeRemaining()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const formattedDate = useMemo(
    () => new Intl.DateTimeFormat("en-IN", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(weddingDate),
    [],
  );

  const handleRsvp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRsvpSent(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="site-shell">
      <div className={`opening-card ${isOpen ? "opening-card--dismissed" : ""}`} aria-hidden={isOpen}>
        <div className="opening-card__ornament" aria-hidden="true">✦</div>
        <p className="eyebrow">A little note from us</p>
        <h1>Something lovely<br /><em>is on its way.</em></h1>
        <p className="opening-card__copy">Take a breath, open the doors, and step into our evening.</p>
        <button className="gold-button" onClick={() => setIsOpen(true)}>
          Open the invitation <ArrowUpRight size={16} />
        </button>
        <p className="opening-card__date">14 · 11 · 2026</p>
      </div>

      <header className="topbar">
        <button className="brand" onClick={() => scrollTo("top")} aria-label="Back to top">
          <span>n</span><span>a</span>
        </button>
        <nav className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          <button onClick={() => scrollTo("story")}>Our story</button>
          <button onClick={() => scrollTo("details")}>The details</button>
          <button onClick={() => scrollTo("rsvp")}>RSVP</button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <section id="top" className="hero-section" style={{ backgroundImage: `url(${HERO})` }}>
        <div className="hero-section__overlay" />
        <div className="hero-section__grain" />
        <div className="hero-content reveal-up">
          <p className="eyebrow eyebrow--gold">Two hearts, one horizon</p>
          <div className="hero-monogram" aria-hidden="true"><span>N</span><span>&</span><span>A</span></div>
          <h2>Noor <span>&</span> Armaan</h2>
          <p className="hero-subtitle">request the pleasure of your company</p>
          <div className="hero-divider"><span /><Sparkles size={15} /><span /></div>
          <p className="hero-date">{formattedDate}<br /><span>Jaipur · India</span></p>
          <button className="scroll-cue" onClick={() => scrollTo("story")} aria-label="Scroll to our story">
            <span>Scroll to enter</span><ArrowDown size={16} />
          </button>
        </div>
        <div className="hero-stamp">N <span>×</span> A<br /><small>est. 2026</small></div>
      </section>

      <section id="story" className="story-section section-pad">
        <div className="section-kicker"><span>01</span><span className="line" /><span>Our story</span></div>
        <div className="story-grid">
          <div className="story-copy">
            <p className="eyebrow">A gathering in good company</p>
            <h3>In the space<br />between <em>then</em><br />and always.</h3>
            <p className="lead">We met over a shared umbrella, stayed for the conversation, and somehow found ourselves here — writing an invitation to the next chapter.</p>
            <p className="body-copy">This evening is for the people who have held us, cheered us on, and made every ordinary day feel golden. We cannot wait to celebrate under the stars with you.</p>
            <div className="signature"><span>with love,</span><strong>N & A</strong></div>
          </div>
          <div className="story-visual" style={{ backgroundImage: `url(${GARDEN})` }}>
            <div className="story-visual__note"><span>14</span><small>November<br />2026</small></div>
          </div>
        </div>
      </section>

      <section className="countdown-section">
        <div className="countdown-section__inner">
          <p className="eyebrow eyebrow--gold">Until the day</p>
          <h3>Counting down to forever</h3>
          <div className="countdown-grid" aria-label="Countdown to the wedding">
            {[{ label: "days", value: timeLeft.days }, { label: "hours", value: timeLeft.hours }, { label: "minutes", value: timeLeft.minutes }, { label: "seconds", value: timeLeft.seconds }].map((item) => (
              <div className="countdown-item" key={item.label}><strong><TwoDigit value={item.value} /></strong><span>{item.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section id="details" className="details-section section-pad">
        <div className="section-kicker"><span>02</span><span className="line" /><span>The details</span></div>
        <div className="details-intro">
          <p className="eyebrow">Keep the evening free</p>
          <h3>The shape of<br /><em>our day.</em></h3>
          <p className="lead">A few gentle notes so you can arrive relaxed, curious, and ready to dance.</p>
        </div>
        <div className="timeline">
          {events.map((event, index) => (
            <div className="timeline-row" key={event.title}>
              <div className="timeline-index">0{index + 1}</div>
              <div className="timeline-time"><Clock3 size={16} />{event.time}</div>
              <div className="timeline-copy"><h4>{event.title}</h4><p>{event.detail}</p></div>
              <ChevronRight className="timeline-arrow" size={20} />
            </div>
          ))}
        </div>
        <div className="venue-card">
          <div><MapPin size={19} /><p className="eyebrow">The venue</p><h4>Samode Haveli</h4><p>Gangapole, Jaipur<br />Rajasthan 302002</p></div>
          <a href="https://maps.google.com/?q=Samode+Haveli+Jaipur" target="_blank" rel="noreferrer" className="text-link">Open in maps <Navigation size={15} /></a>
        </div>
        <div className="notes-grid">
          <div className="note-card"><Shirt size={21} /><p className="eyebrow">Dress code</p><h4>Jewel tones & black tie</h4><p>Come dressed for candlelight — deep colour, soft texture, and something you can dance in.</p></div>
          <div className="note-card"><Gift size={21} /><p className="eyebrow">A little note</p><h4>Your presence is enough</h4><p>We mean it. Your company, your stories, and your best dance moves are the only gifts we need.</p></div>
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-pad gallery-intro"><div className="section-kicker"><span>03</span><span className="line" /><span>Little moments</span></div><h3>Gathered<br /><em>in the golden hour.</em></h3></div>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <button className={`gallery-tile gallery-tile--${index + 1}`} key={item.src} onClick={() => setLightbox(index)} aria-label={`Open ${item.label}`}>
              <img src={item.src} alt={item.alt} /><span>{item.label} <ArrowUpRight size={15} /></span>
            </button>
          ))}
        </div>
      </section>

      <section id="rsvp" className="rsvp-section section-pad">
        <div className="rsvp-panel">
          <div className="rsvp-copy"><p className="eyebrow eyebrow--gold">04 · Join us</p><h3>Will we save<br /><em>you a seat?</em></h3><p>Kindly reply by 01 October 2026. We are keeping the guest list tender and small, with room for your favourite stories.</p><div className="rsvp-heart"><Heart size={18} fill="currentColor" /></div></div>
          <div className="rsvp-form-wrap">
            {rsvpSent ? <div className="success-state"><div className="success-icon"><Check size={24} /></div><p className="eyebrow eyebrow--gold">Thank you</p><h4>Your reply is on its way.</h4><p>We are already looking forward to seeing you under the lights.</p><button className="outline-button" onClick={() => setRsvpSent(false)}>Send another reply</button></div> : <form className="rsvp-form" onSubmit={handleRsvp}><label>Your name<input required name="name" placeholder="e.g. Aisha Khan" /></label><label>Email address<input required type="email" name="email" placeholder="you@example.com" /></label><label>Will you be joining us?<select required name="attendance" defaultValue=""><option value="" disabled>Select one</option><option>Yes, with bells on</option><option>Regretfully, no</option></select></label><label>A note for the couple <textarea name="message" rows={3} placeholder="Leave us a little love..." /></label><button className="gold-button gold-button--full" type="submit">Send my reply <Send size={16} /></button></form>}
          </div>
        </div>
      </section>

      <footer className="footer"><div className="footer-mark">N <span>&</span> A</div><p>Made with love for the people who make life beautiful.</p><button onClick={() => scrollTo("top")}><ArrowUpRight size={15} /> Back to the beginning</button></footer>

      {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[lightbox].label} onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image"><X /></button><img src={gallery[lightbox].src} alt={gallery[lightbox].alt} onClick={(event) => event.stopPropagation()} /></div>}
    </main>
  );
}
