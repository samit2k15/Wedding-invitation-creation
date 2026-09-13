import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  ExternalLink,
  Flame,
  Flower2,
  Gift,
  Heart,
  MapPin,
  Menu,
  Music2,
  Navigation,
  Share2,
  Sparkles,
  Sun,
  X,
} from "lucide-react";

const ASSETS = {
  tilak: "/manus-storage/hindu-tilak_a5beaa50.jpg",
  haldi: "/manus-storage/hindu-haldi_b6f908f8.jpg",
  mehndi: "/manus-storage/hindu-mehndi-sangeet_96f2caff.jpg",
  baraat: "/manus-storage/hindu-baraat_d8b63415.jpg",
  mandap: "/manus-storage/hindu-mandap_a726fdeb.jpg",
  vidaai: "/manus-storage/hindu-vidaai_3ed581a8.jpg",
};

const invitation = {
  couple: "Noor & Armaan",
  city: "Jaipur · Rajasthan",
  venue: "The Palace Courtyard",
  address: "Amer Road, Jaipur, Rajasthan 302002",
  replyBy: "01 October 2026",
  weddingDate: new Date("2026-11-14T17:30:00+05:30"),
  welcome: "With the blessings of our families",
};

type Event = {
  id: string;
  day: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  date: string;
  time: string;
  location: string;
  detail: string;
  mood: string;
  palette: string;
  image: string;
  number: string;
};

const events: Event[] = [
  {
    id: "tilak",
    day: "Day 1 · Evening",
    eyebrow: "A promise between families",
    title: "Tilak Ceremony",
    shortTitle: "Tilak",
    date: "Thursday, 12 November 2026",
    time: "07:30 PM",
    location: "The Heritage Salon",
    detail: "An intimate beginning with family blessings, aarti, marigold garlands, and the warmth of a room filled with stories.",
    mood: "Warm · ceremonial · intimate",
    palette: "Marigold · gold · ivory",
    image: ASSETS.tilak,
    number: "01",
  },
  {
    id: "haldi",
    day: "Day 2 · Morning",
    eyebrow: "Sunshine, colour, and laughter",
    title: "Haldi Ceremony",
    shortTitle: "Haldi",
    date: "Friday, 13 November 2026",
    time: "11:00 AM",
    location: "The Garden Courtyard",
    detail: "A sunlit morning of turmeric, marigolds, brass urli, ethnic cushions, and the kind of laughter that carries across the courtyard.",
    mood: "Bright · playful · joyful",
    palette: "Haldi yellow · kesari · leaf green",
    image: ASSETS.haldi,
    number: "02",
  },
  {
    id: "mehndi-sangeet",
    day: "Day 2 · Evening",
    eyebrow: "Music under the stars",
    title: "Mehndi & Sangeet Night",
    shortTitle: "Mehndi + Sangeet",
    date: "Friday, 13 November 2026",
    time: "07:00 PM",
    location: "The Lantern Garden",
    detail: "Come ready for mehndi, dhol, choreography, cabana lounges, and a stage that glows brighter with every performance.",
    mood: "Festive · musical · electric",
    palette: "Fuchsia · saffron · jewel blue",
    image: ASSETS.mehndi,
    number: "03",
  },
  {
    id: "baraat",
    day: "Day 3 · Afternoon",
    eyebrow: "The procession arrives",
    title: "Baraat & Grand Welcome",
    shortTitle: "Baraat",
    date: "Saturday, 14 November 2026",
    time: "02:00 PM",
    location: "The Palace Gate",
    detail: "A royal arrival through floral gates, rose petal showers, dhol beats, and a Milni archway made for a grand hello.",
    mood: "Royal · high-energy · welcoming",
    palette: "Crimson · saffron · antique gold",
    image: ASSETS.baraat,
    number: "04",
  },
  {
    id: "mandap",
    day: "Day 3 · Twilight",
    eyebrow: "The sacred centre of the day",
    title: "Mandap Ceremony & Saat Phere",
    shortTitle: "Saat Phere",
    date: "Saturday, 14 November 2026",
    time: "05:30 PM",
    location: "The Crimson Mandap",
    detail: "As the sky turns rose, we take our seven sacred steps beneath a four-pillar mandap and the steady glow of the havan kund.",
    mood: "Regal · sacred · timeless",
    palette: "Deep crimson · rose · antique gold",
    image: ASSETS.mandap,
    number: "05",
  },
  {
    id: "vidaai",
    day: "Day 3 · Night",
    eyebrow: "Until the next hello",
    title: "Vidaai",
    shortTitle: "Vidaai",
    date: "Saturday, 14 November 2026",
    time: "11:30 PM",
    location: "The Moonlit Drive",
    detail: "A soft farewell by lantern light, with jasmine on the getaway car and every blessing carried into the night.",
    mood: "Tender · emotional · graceful",
    palette: "Midnight blue · jasmine · ruby",
    image: ASSETS.vidaai,
    number: "06",
  },
];

function getTimeRemaining() {
  const difference = invitation.weddingDate.getTime() - Date.now();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function EventMotif({ id }: { id: string }) {
  if (id === "haldi") return <Sun size={22} />;
  if (id === "mehndi-sangeet") return <Music2 size={22} />;
  if (id === "mandap") return <Flame size={22} />;
  if (id === "vidaai") return <Heart size={22} />;
  return <Flower2 size={22} />;
}

function TwoDigit({ value }: { value: number }) {
  return <span>{String(value).padStart(2, "0")}</span>;
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [shareStatus, setShareStatus] = useState("Share invitation");
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining);

  useEffect(() => {
    const interval = window.setInterval(() => setTimeLeft(getTimeRemaining()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const formattedDate = useMemo(
    () => new Intl.DateTimeFormat("en-IN", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(invitation.weddingDate),
    [],
  );

  const handleShare = async () => {
    const shareData = { title: `${invitation.couple} · Wedding Invitation`, text: "Join us for our three-day Hindu wedding celebration.", url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("Invitation shared");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus("Link copied");
      }
    } catch {
      setShareStatus("Share invitation");
    }
    window.setTimeout(() => setShareStatus("Share invitation"), 2200);
  };

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
        <div className="opening-card__mandala" aria-hidden="true">✦</div>
        <p className="eyebrow">Shubh Aarambh · A sacred beginning</p>
        <h1>Three days of<br /><em>love, ritual & joy.</em></h1>
        <p className="opening-card__copy">With the blessings of our families, we invite you to enter our celebration.</p>
        <button className="gold-button" onClick={() => setIsOpen(true)}>Open the invitation <ArrowUpRight size={16} /></button>
        <p className="opening-card__date">12 · 13 · 14 November 2026</p>
      </div>

      <header className="topbar">
        <button className="brand" onClick={() => scrollTo("top")} aria-label="Back to top"><span>न</span><span>अ</span></button>
        <nav className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          <button onClick={() => scrollTo("welcome")}>Welcome</button>
          <button onClick={() => scrollTo("celebrations")}>Celebrations</button>
          <button onClick={() => scrollTo("rsvp")}>RSVP</button>
        </nav>
        <button className="share-button share-button--nav" onClick={handleShare}><Share2 size={15} /><span>{shareStatus}</span></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <section id="top" className="hero-section" style={{ backgroundImage: `url(${ASSETS.mandap})` }}>
        <div className="hero-section__overlay" />
        <div className="hero-section__grain" />
        <div className="hero-content reveal-up">
          <p className="eyebrow eyebrow--gold">{invitation.welcome}</p>
          <div className="hero-monogram" aria-hidden="true"><span>शुभ</span><span>✦</span><span>आरम्भ</span></div>
          <h2>{invitation.couple.split(" & ")[0]} <span>&</span> {invitation.couple.split(" & ")[1]}</h2>
          <p className="hero-subtitle">invite you to celebrate their wedding</p>
          <div className="hero-divider"><span /><Sparkles size={15} /><span /></div>
          <p className="hero-date">{formattedDate}<br /><span>{invitation.city}</span></p>
          <div className="hero-actions"><button className="scroll-cue" onClick={() => scrollTo("welcome")} aria-label="Scroll to welcome"><span>Enter the celebration</span><ArrowDown size={16} /></button><button className="hero-share" onClick={handleShare}><Share2 size={15} /> Send this invitation</button></div>
        </div>
        <div className="hero-stamp">ॐ<br /><small>three days · one story</small></div>
      </section>

      <section id="welcome" className="welcome-section section-pad">
        <div className="section-kicker"><span>00</span><span className="line" /><span>Welcome to our celebration</span></div>
        <div className="welcome-grid">
          <div className="welcome-copy"><p className="eyebrow">A digital invitation for every screen</p><h3>Come for the<br /><em>rituals.</em><br />Stay for the joy.</h3><p className="lead">From the first tilak to the last farewell, we are gathering everyone we love across three unforgettable days in Jaipur.</p><p className="body-copy">Save this page, send the link to your family group, and keep it close for the full schedule, venue notes, and each beautiful moment in between.</p><button className="text-link text-link--button" onClick={handleShare}><Copy size={15} /> Copy invitation link</button></div>
          <div className="welcome-panel"><div className="welcome-panel__symbol">ॐ</div><p className="eyebrow">Our wedding weekend</p><div className="welcome-panel__dates"><strong>12</strong><span>·</span><strong>13</strong><span>·</span><strong>14</strong></div><p>November 2026<br />Jaipur, Rajasthan</p><div className="welcome-panel__rule" /><p className="welcome-panel__small">Please join us for every ceremony that your heart can make room for.</p></div>
        </div>
      </section>

      <section className="countdown-section"><div className="countdown-section__inner"><p className="eyebrow eyebrow--gold">Until the wedding day</p><h3>The countdown has begun</h3><div className="countdown-grid" aria-label="Countdown to the wedding">{[{ label: "days", value: timeLeft.days }, { label: "hours", value: timeLeft.hours }, { label: "minutes", value: timeLeft.minutes }, { label: "seconds", value: timeLeft.seconds }].map((item) => <div className="countdown-item" key={item.label}><strong><TwoDigit value={item.value} /></strong><span>{item.label}</span></div>)}</div></div></section>

      <section id="celebrations" className="celebrations-section section-pad">
        <div className="section-kicker"><span>01–06</span><span className="line" /><span>The celebration map</span></div>
        <div className="celebrations-heading"><div><p className="eyebrow">A three-day mood board</p><h3>Six rituals.<br /><em>One beautiful story.</em></h3></div><p className="lead">Each ceremony has its own colour, rhythm, and little bit of magic. Tap through the itinerary, then scroll to linger on the details.</p></div>
        <div className="event-rail" aria-label="Jump to ceremony"><span>Jump to</span>{events.map((event) => <button key={event.id} onClick={() => scrollTo(event.id)}><b>{event.number}</b>{event.shortTitle}</button>)}</div>
        <div className="event-list">{events.map((event, index) => <article className={`event-card event-card--${index % 2 === 0 ? "image-left" : "image-right"}`} id={event.id} key={event.id}>
          <button className="event-image" onClick={() => setLightbox(index)} aria-label={`Open ${event.title} image`}><img src={event.image} alt={`${event.title} mood board`} /><span className="event-image__zoom">View mood board <ArrowUpRight size={15} /></span></button>
          <div className="event-copy"><div className="event-copy__top"><div className="event-number">{event.number}</div><div><p className="eyebrow">{event.day}</p><p className="event-eyebrow">{event.eyebrow}</p></div></div><h4>{event.title}</h4><p className="event-detail">{event.detail}</p><div className="event-meta"><div><CalendarDays size={16} /><span>{event.date}</span></div><div><Clock3 size={16} /><span>{event.time}</span></div><div><MapPin size={16} /><span>{event.location}</span></div></div><div className="event-tags"><span>{event.mood}</span><span>{event.palette}</span></div><button className="event-link" onClick={() => setLightbox(index)}>See the visual story <ChevronRight size={16} /></button></div>
        </article>)}</div>
      </section>

      <section className="quick-guide"><div className="quick-guide__inner"><p className="eyebrow eyebrow--gold">Keep this close</p><h3>Your weekend at a glance</h3><div className="quick-guide__grid">{events.map((event) => <button key={event.id} onClick={() => scrollTo(event.id)}><span><EventMotif id={event.id} /></span><small>{event.day.replace(" · ", " / ")}</small><strong>{event.shortTitle}</strong><i>{event.time}</i></button>)}</div></div></section>

      <section className="venue-section section-pad"><div className="venue-card"><div className="venue-card__copy"><p className="eyebrow">All roads lead here</p><h3>{invitation.venue}</h3><p>{invitation.address}</p><a href="https://maps.google.com/?q=The+Palace+Courtyard+Jaipur" target="_blank" rel="noreferrer" className="text-link">Open in maps <Navigation size={15} /></a></div><div className="venue-card__seal"><MapPin size={18} /><span>जयपुर</span><small>Rajasthan</small></div></div><div className="notes-grid"><div className="note-card"><Gift size={21} /><p className="eyebrow">Dress code</p><h4>Festive Indian · jewel tones</h4><p>Come dressed for colour, comfort, and dancing. Saffron, crimson, emerald, and gold are always welcome.</p></div><div className="note-card"><Heart size={21} /><p className="eyebrow">A little note</p><h4>Your presence is our present</h4><p>Bring your blessings, your stories, and your best dance moves. That is all we could ask for.</p></div></div></section>

      <section id="rsvp" className="rsvp-section section-pad"><div className="rsvp-panel"><div className="rsvp-copy"><p className="eyebrow eyebrow--gold">07 · Join us</p><h3>Will you<br /><em>celebrate with us?</em></h3><p>Kindly reply by {invitation.replyBy}. We are keeping our guest list tender and close, with room for every person who makes our lives brighter.</p><div className="rsvp-heart"><Heart size={18} fill="currentColor" /></div></div><div className="rsvp-form-wrap">{rsvpSent ? <div className="success-state"><div className="success-icon"><Check size={24} /></div><p className="eyebrow eyebrow--gold">Dhanyavaad</p><h4>Your reply is on its way.</h4><p>We are already looking forward to seeing you under the marigolds.</p><button className="outline-button" onClick={() => setRsvpSent(false)}>Send another reply</button></div> : <form className="rsvp-form" onSubmit={handleRsvp}><label>Your name<input required name="name" placeholder="e.g. Aisha Khan" /></label><label>Email address<input required type="email" name="email" placeholder="you@example.com" /></label><label>Will you be joining us?<select required name="attendance" defaultValue=""><option value="" disabled>Select one</option><option>Yes, with blessings</option><option>Regretfully, we cannot</option></select></label><label>A note for the family<textarea name="message" rows={3} placeholder="Leave us a little love..." /></label><button className="gold-button gold-button--full" type="submit">Send my reply <SendIcon /></button></form>}</div></div></section>

      <footer className="footer"><div className="footer-mark">ॐ <span>शुभ</span></div><p>Made with love for the people who make life beautiful.</p><button onClick={() => scrollTo("top")}><ArrowUpRight size={15} /> Back to the beginning</button></footer>
      <div className="mobile-share-bar"><button onClick={handleShare}><Share2 size={17} /> {shareStatus}</button><button onClick={() => scrollTo("celebrations")}><CalendarDays size={17} /> View schedule</button></div>

      {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={events[lightbox].title} onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image"><X /></button><div className="lightbox-caption"><p className="eyebrow eyebrow--gold">{events[lightbox].day}</p><h4>{events[lightbox].title}</h4><p>{events[lightbox].mood} · {events[lightbox].palette}</p></div><img src={events[lightbox].image} alt={`${events[lightbox].title} mood board`} onClick={(event) => event.stopPropagation()} /></div>}
    </main>
  );
}

function SendIcon() {
  return <ExternalLink size={16} />;
}
