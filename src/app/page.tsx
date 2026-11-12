 "use client";

import { useMemo, useState } from "react";
import {
  Album, ArrowRight, BookOpen, ChevronDown, CircleHelp, Disc3, Headphones,
  Heart, Home, Library, ListMusic, Menu, Music2, Pause, Play, Search,
  Settings2, ShieldCheck, SkipBack, SkipForward, Volume2, X
} from "lucide-react";

type Song = {
  id: number;
  number: string;
  title: string;
  collection: string;
  category: string;
  duration: string;
  lyrics: string[];
};

const songs: Song[] = [
  { id: 1, number: "001", title: "Contoh Lagu Pengharapan", collection: "Koleksi Lagu Sion", category: "Lagu Sion", duration: "03:42", lyrics: ["Ini adalah contoh lirik untuk keperluan prototype.", "Lirik asli bahasa Nias akan dimasukkan setelah disiapkan dan mendapat izin.", "Setiap bait dapat ditampilkan dengan rapi di halaman detail lagu."] },
  { id: 2, number: "002", title: "Contoh Lagu Syukur", collection: "Koleksi Lagu Sion", category: "Lagu Sion", duration: "04:10", lyrics: ["Contoh lirik lagu kedua.", "Konten ini hanya data demonstrasi, bukan lirik lagu sungguhan."] },
  { id: 3, number: "003", title: "Contoh Lagu Penyembahan", collection: "Lagu Rohani Nias", category: "Lagu Nias", duration: "03:28", lyrics: ["Contoh lirik lagu ketiga.", "Nantinya lirik bahasa Nias dapat ditampilkan di sini."] },
  { id: 4, number: "004", title: "Contoh Lagu Penghiburan", collection: "Lagu Rohani Nias", category: "Lagu Nias", duration: "04:05", lyrics: ["Contoh lirik lagu keempat.", "Audio dan informasi lagu dapat dikelola oleh administrator."] },
  { id: 5, number: "005", title: "Contoh Lagu Ibadah", collection: "Koleksi Lagu Sion", category: "Lagu Sion", duration: "03:56", lyrics: ["Contoh lirik lagu kelima.", "Silakan ganti dengan materi yang sudah mendapat izin."] },
  { id: 6, number: "006", title: "Contoh Lagu Doa", collection: "Lagu Rohani Nias", category: "Lagu Nias", duration: "02:58", lyrics: ["Contoh lirik lagu keenam.", "Bagian ini akan menjadi tempat lirik lagu Nias."] },
];

const navItems = [
  { label: "Beranda", icon: Home },
  { label: "Semua Lagu", icon: Library },
  { label: "Album", icon: Album },
  { label: "Playlist", icon: ListMusic },
];

export default function HomePage() {
  const [activeNav, setActiveNav] = useState("Beranda");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playing, setPlaying] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [saved, setSaved] = useState<number[]>([]);

  const filteredSongs = useMemo(() => songs.filter((song) => {
    const matchesQuery = `${song.title} ${song.number} ${song.collection}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "Semua" || song.category === category;
    return matchesQuery && matchesCategory;
  }), [query, category]);

  function playSong(song: Song) {
    setCurrentSong(song);
    setPlaying(true);
  }

  function toggleSaved(id: number) {
    setSaved((old) => old.includes(id) ? old.filter((item) => item !== id) : [...old, id]);
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Music2 size={23} /></div>
          <div><div className="brand-name">Li Si&apos;ao</div><div className="brand-caption">Lagu Rohani Nias</div></div>
          <button className="icon-button mobile-close" onClick={() => setMobileMenu(false)} aria-label="Tutup menu"><X size={19}/></button>
        </div>

        <div className="side-label">MENU UTAMA</div>
        <nav className="nav-list">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${activeNav === label ? "active" : ""}`} onClick={() => { setActiveNav(label); setMobileMenu(false); }}>
              <Icon size={18}/><span>{label}</span>{label === "Playlist" && saved.length > 0 && <span className="nav-count">{saved.length}</span>}
            </button>
          ))}
        </nav>

        <div className="side-label collection-label">KOLEKSI</div>
        <button className={`collection-link ${category === "Lagu Sion" ? "chosen" : ""}`} onClick={() => { setCategory("Lagu Sion"); setActiveNav("Semua Lagu"); }}><span className="collection-dot purple"/>Lagu Sion</button>
        <button className={`collection-link ${category === "Lagu Nias" ? "chosen" : ""}`} onClick={() => { setCategory("Lagu Nias"); setActiveNav("Semua Lagu"); }}><span className="collection-dot orange"/>Lagu Rohani Nias</button>
        <button className="collection-link" onClick={() => setCategory("Semua")}><span className="collection-dot green"/>Semua koleksi</button>

        <div className="sidebar-note">
          <div className="note-icon"><BookOpen size={17}/></div>
          <strong>Nyanyian yang menyatukan</strong>
          <p>Ruang untuk menyimpan dan menikmati lagu rohani dalam bahasa Nias.</p>
        </div>
        <div className="sidebar-footer"><ShieldCheck size={15}/> Prototype Li Si&apos;ao · Versi 1.0</div>
      </aside>

      {mobileMenu && <button className="mobile-scrim" onClick={() => setMobileMenu(false)} aria-label="Tutup menu"/>}

      <section className="main-panel">
        <header className="topbar">
          <button className="icon-button mobile-menu-button" onClick={() => setMobileMenu(true)} aria-label="Buka menu"><Menu size={21}/></button>
          <div className="breadcrumb">Perpustakaan <span>/</span> <strong>{activeNav}</strong></div>
          <div className="topbar-actions">
            <span className="language-pill">ID <ChevronDown size={14}/></span>
            <button className="owner-button" onClick={() => alert("Panel administrator akan dikembangkan setelah desain disetujui.")}><Settings2 size={16}/> Area Admin</button>
          </div>
        </header>

        <div className="content">
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line"/> PERPUSTAKAAN LAGU ROHANI NIAS</div>
              <h1>Nyanyikan iman,<br/><em>wariskan</em> budaya.</h1>
              <p>Temukan, baca, dan dengarkan koleksi lagu rohani berbahasa Nias dalam satu ruang digital.</p>
              <button className="hero-button" onClick={() => { setActiveNav("Semua Lagu"); document.getElementById("song-library")?.scrollIntoView({ behavior: "smooth" }); }}>Jelajahi koleksi <ArrowRight size={17}/></button>
            </div>
            <div className="hero-art" aria-label="Ilustrasi dekoratif">
              <div className="sun-orb"/>
              <div className="art-circle circle-one"/>
              <div className="art-circle circle-two"/>
              <div className="art-hill hill-back"/>
              <div className="art-hill hill-front"/>
              <div className="art-quote"><span>♫</span><small>SUARA • IMAN • NIAS</small></div>
            </div>
            <div className="hero-index">01 <span>—</span> RUANG DENGAR</div>
          </section>

          <section className="quick-stats">
            <div className="stat"><div className="stat-icon"><Music2 size={18}/></div><div><strong>{songs.length.toString().padStart(2, "0")}</strong><span>Contoh lagu</span></div></div>
            <div className="stat"><div className="stat-icon"><Disc3 size={18}/></div><div><strong>02</strong><span>Koleksi contoh</span></div></div>
            <div className="stat"><div className="stat-icon"><Headphones size={18}/></div><div><strong>Audio</strong><span>Siap dikembangkan</span></div></div>
          </section>

          <section className="library-section" id="song-library">
            <div className="section-heading">
              <div><div className="eyebrow">JELAJAHI PERPUSTAKAAN</div><h2>Koleksi lagu</h2><p>Pilih lagu untuk melihat lirik atau mulai mendengarkan.</p></div>
              <button className="text-button" onClick={() => { setCategory("Semua"); setActiveNav("Semua Lagu"); }}>Lihat semua <ArrowRight size={16}/></button>
            </div>

            <div className="filter-row">
              <div className="search-box"><Search size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari judul atau nomor lagu..." aria-label="Cari lagu"/>{query && <button onClick={() => setQuery("")} aria-label="Hapus pencarian"><X size={15}/></button>}</div>
              <div className="filter-buttons">
                {["Semua", "Lagu Sion", "Lagu Nias"].map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? "filter-active" : ""}>{item}</button>)}
              </div>
            </div>

            <div className="song-list">
              <div className="song-list-head"><span>JUDUL LAGU</span><span>KOLEKSI</span><span>DURASI</span><span>AKSI</span></div>
              {filteredSongs.length ? filteredSongs.map((song) => (
                <div className="song-row" key={song.id}>
                  <button className="song-main" onClick={() => setSelectedSong(song)}>
                    <span className="song-number">{song.number}</span><span className="song-title-wrap"><strong>{song.title}</strong><small>{song.category}</small></span>
                  </button>
                  <span className="song-collection">{song.collection}</span><span className="song-duration">{song.duration}</span>
                  <div className="song-actions">
                    <button className={`icon-button save-button ${saved.includes(song.id) ? "is-saved" : ""}`} onClick={() => toggleSaved(song.id)} aria-label="Simpan ke playlist"><Heart size={17} fill={saved.includes(song.id) ? "currentColor" : "none"}/></button>
                    <button className="play-small" onClick={() => playSong(song)} aria-label="Putar lagu"><Play size={15} fill="currentColor"/></button>
                  </div>
                </div>
              )) : <div className="empty-state"><Search size={25}/><strong>Lagu tidak ditemukan</strong><span>Coba kata kunci atau kategori lain.</span></div>}
            </div>
          </section>

          <section className="bottom-note"><div className="note-large"><BookOpen size={21}/></div><div><strong>Melestarikan lagu, merawat warisan.</strong><p>Li Si&apos;ao dikembangkan sebagai ruang digital untuk koleksi lagu rohani berbahasa Nias.</p></div><CircleHelp size={19} className="note-help"/></section>
          <footer className="page-footer"><span>© 2026 Li Si&apos;ao · Prototype desain</span><span>Dibuat untuk pelayanan dan pelestarian lagu rohani Nias</span></footer>
        </div>
      </section>

      {selectedSong && <div className="modal-backdrop" onClick={() => setSelectedSong(null)}><section className="lyrics-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top"><span className="modal-kicker">DETAIL LAGU · {selectedSong.number}</span><button className="icon-button" onClick={() => setSelectedSong(null)} aria-label="Tutup"><X size={19}/></button></div>
        <div className="modal-symbol"><BookOpen size={24}/></div><div className="modal-category">{selectedSong.collection}</div><h2>{selectedSong.title}</h2>
        <div className="lyrics-content">{selectedSong.lyrics.map((line, index) => <p key={index}>{line}</p>)}</div>
        <button className="modal-play" onClick={() => playSong(selectedSong)}><Play size={16} fill="currentColor"/> Putar contoh audio</button>
        <p className="demo-warning">Konten demonstrasi. Ganti dengan lirik dan audio yang telah mendapat izin.</p>
      </section></div>}

      {currentSong && <div className="player-bar">
        <div className="player-track"><div className="player-cover"><Music2 size={19}/></div><div><strong>{currentSong.title}</strong><span>{currentSong.collection}</span></div></div>
        <div className="player-controls"><div className="control-buttons"><button aria-label="Sebelumnya" onClick={() => playSong(songs[Math.max(0, songs.findIndex(s => s.id === currentSong.id) - 1)])}><SkipBack size={17}/></button><button className="main-play" onClick={() => setPlaying(!playing)} aria-label={playing ? "Jeda" : "Putar"}>{playing ? <Pause size={17} fill="currentColor"/> : <Play size={17} fill="currentColor"/>}</button><button aria-label="Berikutnya" onClick={() => playSong(songs[Math.min(songs.length - 1, songs.findIndex(s => s.id === currentSong.id) + 1)])}><SkipForward size={17}/></button></div><div className="fake-progress"><span/><i/></div></div>
        <div className="player-volume"><Volume2 size={18}/><span>Preview</span><button className="icon-button" onClick={() => { setCurrentSong(null); setPlaying(false); }} aria-label="Tutup pemutar"><X size={17}/></button></div>
      </div>}
    </main>
  );
}
