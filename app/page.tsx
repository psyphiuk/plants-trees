import Link from 'next/link'
import styles from './page.module.scss'

export default function Home() {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <h1 className={styles.logo}>Southern High Farms</h1>
            <nav className={styles.nav}>
              <Link href="/quote">Get Quote</Link>
              <Link href="/admin">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h2 className={styles.heroTitle}>
              Wholesale Plants & Trees for Landscaping Professionals
            </h2>
            <p className={styles.heroDescription}>
              Quality plants at competitive prices. Get your quote in minutes.
            </p>
            <div className={styles.heroActions}>
              <Link href="/quote" className="btn btn-primary btn-large">
                Request Quote
              </Link>
              <Link href="/quote?partner=demo" className="btn btn-secondary btn-large">
                Partner Demo
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className="container">
            <div className={styles.featureGrid}>
              <div className={styles.feature}>
                <h3>Quality Plants</h3>
                <p>Premium trees, shrubs, perennials, and more from trusted growers</p>
              </div>
              <div className={styles.feature}>
                <h3>Quick Quotes</h3>
                <p>Get detailed pricing in under 2 minutes</p>
              </div>
              <div className={styles.feature}>
                <h3>Partner Program</h3>
                <p>Earn 10% lifetime commission on referrals</p>
              </div>
              <div className={styles.feature}>
                <h3>Bilingual Support</h3>
                <p>English and Spanish for all customers</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.categories}>
          <div className="container">
            <h2>Our Product Categories</h2>
            <div className={styles.categoryGrid}>
              <div className={styles.category}>
                <h3>Trees</h3>
                <p>Shade trees, ornamental, and native species</p>
              </div>
              <div className={styles.category}>
                <h3>Shrubs</h3>
                <p>Foundation plants, hedges, and flowering shrubs</p>
              </div>
              <div className={styles.category}>
                <h3>Perennials</h3>
                <p>Returning favorites for every garden</p>
              </div>
              <div className={styles.category}>
                <h3>Annuals</h3>
                <p>Seasonal color in flats and containers</p>
              </div>
              <div className={styles.category}>
                <h3>Grasses</h3>
                <p>Ornamental grasses for texture and movement</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <p>&copy; 2024 Southern High Farms. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}