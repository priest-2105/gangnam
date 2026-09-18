import { useState } from 'react'
import './App.css'

const review = {
  clinic: 'JY Plastic Surgery', procedure: 'Rhinoplasty', location: 'Seoul',
  procedureDate: 'March 2026', reviewDate: 'June 2026', rating: 4.6,
  source: 'Naver', price: '₩4,200,000', translationConfidence: 'High',
  english: 'The consultation felt a little rushed, but the surgeon explained the expected result clearly and did not pressure me into additional procedures. The swelling was difficult during the first two weeks. At three months, the bridge looks natural and I’m happy with the result so far.',
  korean: '상담은 조금 급하게 진행되는 느낌이었지만, 원장님이 예상되는 결과를 명확하게 설명해 주셨고 추가 시술을 권하지 않았어요. 첫 2주 동안은 붓기가 힘들었습니다. 3개월이 지난 지금 콧대가 자연스러워 보여서 현재까지는 만족합니다.',
  signals: [
    ['Procedure confirmed', 'Rhinoplasty is named in the source review.'],
    ['Price mentioned', 'The reviewer reported paying ₩4,200,000.'],
    ['Surgeon discussed', 'The reviewer describes their surgeon consultation.'],
  ],
  concerns: [
    ['Rushed consultation', 'Subjective opinion expressed by the reviewer.'],
    ['Early result', 'Written only 3 months after the procedure.'],
  ],
}

function CheckIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5.2 10.3 3 3 6.6-7" /></svg> }
function AlertIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5.2v5.2M10 14.3v.1" /></svg> }
function ChevronIcon({ open }: { open: boolean }) { return <svg className={open ? 'chevron open' : 'chevron'} viewBox="0 0 20 20" aria-hidden="true"><path d="m6.5 8 3.5 3.5L13.5 8" /></svg> }
function MenuIcon({ open }: { open: boolean }) {
  return <svg className="menu-icon" viewBox="0 0 24 24" aria-hidden="true">{open ? <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}</svg>
}

function App() {
  const [showOriginal, setShowOriginal] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Gangnam Beauty Guide home"><img src="/logo.png" alt="Gangnam Beauty Guide" /></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#procedure">Procedures</a><a href="#clinic">Clinics</a><a href="#trust-title">Doctors</a><a className="active" href="#top">Reviews</a>
          <div className="audience-switch" aria-label="Audience"><span>For Her</span><span>For Him</span><span>For Transition</span><strong>Everyone</strong></div>
          <span className="language">GB<br /><b>English</b></span>
        </nav>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen((value) => !value)}><MenuIcon open={menuOpen} /></button>
      </header>
      {menuOpen && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation"><a href="#procedure" onClick={() => setMenuOpen(false)}>Procedures</a><a href="#clinic" onClick={() => setMenuOpen(false)}>Clinics</a><a href="#trust-title" onClick={() => setMenuOpen(false)}>Doctors</a><a className="active" href="#top" onClick={() => setMenuOpen(false)}>Reviews</a><div className="mobile-nav-meta"><span>Everyone</span><span>English · GB</span></div></nav>}

      <main id="top">
        <section className="intro" aria-labelledby="page-title">
          <h1 id="page-title">Don’t just read the translation.<br />See what the review actually tells you.</h1>
          <p className="intro-copy">A clearer way to separate what the reviewer said, what AI extracted, and what has actually been verified.</p>
        </section>

        <article className="review" id="clinic" aria-label={`Review of ${review.clinic}`}>
          <div className="review-main" id="procedure">
            <div className="tags" aria-label="Review attributes">
              <span>{review.procedure}</span><span>{review.location}</span><span className="verified-tag"><CheckIcon /> Verified procedure</span><span className="illustrative-tag">Illustrative review</span>
            </div>
            <div className="review-heading">
              <div><h2>{review.clinic}</h2><p>{review.procedure} <span aria-hidden="true">·</span> {review.procedureDate}</p></div>
              <div className="rating" aria-label={`${review.rating} out of 5`}><span>Rating</span><strong>{review.rating} / 5</strong></div>
            </div>
            <blockquote>“{review.english}”</blockquote>

            <div className="translation-row">
              <div className="translation-meta"><span>Translated from Korean</span><span className="confidence-inline">{review.translationConfidence} confidence</span></div>
              <button className="original-toggle" type="button" aria-expanded={showOriginal} aria-controls="original-review" onClick={() => setShowOriginal((value) => !value)}>
                {showOriginal ? 'Hide original' : 'View original'}<ChevronIcon open={showOriginal} />
              </button>
            </div>
            {showOriginal && <div className="original" id="original-review" lang="ko"><div className="original-header"><span>Original Korean</span><span>Source text</span></div><p>{review.korean}</p></div>}

            <section className="breakdown" aria-labelledby="breakdown-title">
              <div className="section-heading">
                <div><h3 id="breakdown-title">AI review breakdown</h3><p>Extracted from the review — not independently verified.</p></div>
                <span className="ai-label">AI extracted</span>
              </div>
              <div className="signal-columns">
                <div><h4>Useful signals</h4><ul className="signal-list positive">{review.signals.map(([label, detail]) => <li key={label}><span className="status-icon"><CheckIcon /></span><div><strong>{label}</strong><span>{detail}</span></div></li>)}</ul></div>
                <div><h4>Potential concerns</h4><ul className="signal-list caution">{review.concerns.map(([label, detail]) => <li key={label}><span className="status-icon"><AlertIcon /></span><div><strong>{label}</strong><span>{detail}</span></div></li>)}</ul></div>
              </div>
              <div className="ai-summary"><p className="summary-label">What this review actually tells you</p><p>The reviewer describes a positive early result and a clear surgeon consultation, despite feeling rushed. The price and procedure are explicit, but the outcome is still early and the surgeon’s identity could not be independently confirmed.</p></div>
            </section>
          </div>

          <aside className="trust-panel" aria-labelledby="trust-title">
            <div><h3 id="trust-title">Source &amp; trust</h3><p className="trust-intro">What we can trace back to the original listing.</p></div>
            <dl className="facts">
              <div><dt>Source</dt><dd>{review.source}</dd></div><div><dt>Procedure</dt><dd>{review.procedure}</dd></div><div><dt>Price paid</dt><dd>{review.price}</dd></div><div><dt>Review date</dt><dd>{review.reviewDate}</dd></div><div><dt>Translation</dt><dd><span className="confidence-dot" />{review.translationConfidence}</dd></div>
            </dl>
            <div className="verification-list" aria-label="Verification status">
              <div className="verified"><CheckIcon /><span><strong>Procedure verified</strong><small>Matches source listing</small></span></div>
              <div className="verified"><CheckIcon /><span><strong>Clinic matched</strong><small>Normalised clinic record</small></span></div>
              <div className="uncertain"><span className="question-icon">?</span><span><strong>Surgeon not verified</strong><small>Not named in source</small></span></div>
            </div>
            <p className="method-note"><strong>How to read this</strong> Verified means matched against source data. AI-extracted means identified from review text and may need confirmation.</p>
          </aside>
        </article>
      </main>

      <footer><span>Illustrative review data for prototype purposes.</span><span>Gangnam Beauty Guide</span></footer>
    </div>
  )
}

export default App
