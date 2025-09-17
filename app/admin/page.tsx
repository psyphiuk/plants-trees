'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.scss'
import { getQuotes, updateQuoteStatus, exportQuotesToCSV, Quote } from '@/lib/storage'
import { partners, generatePartnerUrl } from '@/lib/partners'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPartner, setFilterPartner] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<'quotes' | 'partners'>('quotes')

  useEffect(() => {
    // Check if already authenticated (using sessionStorage)
    const auth = sessionStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadQuotes()
    }
  }, [])

  const loadQuotes = () => {
    const allQuotes = getQuotes()
    setQuotes(allQuotes.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ))
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would check against environment variable
    // For demo, using hardcoded password
    if (password === 'admin123') {
      sessionStorage.setItem('admin_auth', 'true')
      setIsAuthenticated(true)
      setPasswordError(false)
      loadQuotes()
    } else {
      setPasswordError(true)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    setIsAuthenticated(false)
    setPassword('')
  }

  const handleStatusUpdate = (quoteId: string, status: Quote['status']) => {
    updateQuoteStatus(quoteId, status)
    loadQuotes()
  }

  const handleExportCSV = () => {
    const csv = exportQuotesToCSV()
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `quotes-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    alert('URL copied to clipboard!')
  }

  const filteredQuotes = quotes.filter(quote => {
    const statusMatch = filterStatus === 'all' || quote.status === filterStatus
    const partnerMatch = filterPartner === 'all' || quote.partnerCode === filterPartner
    return statusMatch && partnerMatch
  })

  const getStatusBadgeClass = (status: Quote['status']) => {
    switch (status) {
      case 'pending': return styles.badgePending
      case 'contacted': return styles.badgeContacted
      case 'completed': return styles.badgeCompleted
      default: return ''
    }
  }

  const calculatePartnerStats = (partnerCode: string) => {
    const partnerQuotes = quotes.filter(q => q.partnerCode === partnerCode)
    const totalReferrals = partnerQuotes.length
    const totalRevenue = partnerQuotes.reduce((sum, q) => sum + q.total, 0)
    const totalCommission = totalRevenue * 0.1
    return { totalReferrals, totalRevenue, totalCommission }
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
              />
              {passwordError && (
                <p className={styles.error}>Invalid password. Try 'admin123' for demo.</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <h1>Admin Dashboard</h1>
            <div className={styles.headerActions}>
              <Link href="/" className={styles.viewSite}>
                View Site
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <h3>Total Quotes</h3>
              <p className={styles.statValue}>{quotes.length}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Pending</h3>
              <p className={styles.statValue}>
                {quotes.filter(q => q.status === 'pending').length}
              </p>
            </div>
            <div className={styles.statCard}>
              <h3>Total Revenue</h3>
              <p className={styles.statValue}>
                ${quotes.reduce((sum, q) => sum + q.total, 0).toFixed(2)}
              </p>
            </div>
            <div className={styles.statCard}>
              <h3>Partners</h3>
              <p className={styles.statValue}>{partners.length}</p>
            </div>
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'quotes' ? styles.active : ''}`}
              onClick={() => setActiveTab('quotes')}
            >
              Quotes
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'partners' ? styles.active : ''}`}
              onClick={() => setActiveTab('partners')}
            >
              Partners
            </button>
          </div>

          {activeTab === 'quotes' && (
            <div className={styles.quotesSection}>
              <div className={styles.filters}>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                </select>
                <select
                  value={filterPartner}
                  onChange={(e) => setFilterPartner(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">All Partners</option>
                  {partners.map(partner => (
                    <option key={partner.code} value={partner.code}>
                      {partner.name}
                    </option>
                  ))}
                </select>
                <button onClick={handleExportCSV} className="btn btn-secondary">
                  Export CSV
                </button>
              </div>

              <div className={styles.quotesTable}>
                {filteredQuotes.length === 0 ? (
                  <p className={styles.noData}>No quotes found</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Partner</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredQuotes.map((quote) => (
                        <tr key={quote.id}>
                          <td className={styles.quoteId}>{quote.id}</td>
                          <td>{new Date(quote.createdAt).toLocaleDateString()}</td>
                          <td>
                            <div className={styles.customerInfo}>
                              <strong>
                                {quote.contact.firstName} {quote.contact.lastName}
                              </strong>
                              <span>{quote.contact.email}</span>
                              <span>{quote.contact.phone}</span>
                            </div>
                          </td>
                          <td>{quote.partnerCode || '-'}</td>
                          <td className={styles.total}>${quote.total.toFixed(2)}</td>
                          <td>
                            <span className={`${styles.badge} ${getStatusBadgeClass(quote.status)}`}>
                              {quote.status}
                            </span>
                          </td>
                          <td>
                            <div className={styles.actions}>
                              <select
                                value={quote.status}
                                onChange={(e) => handleStatusUpdate(quote.id, e.target.value as Quote['status'])}
                                className={styles.statusSelect}
                              >
                                <option value="pending">Pending</option>
                                <option value="contacted">Contacted</option>
                                <option value="completed">Completed</option>
                              </select>
                              <button
                                onClick={() => {
                                  const quoteDetails = `Quote #${quote.id}\n` +
                                    `Customer: ${quote.contact.firstName} ${quote.contact.lastName}\n` +
                                    `Email: ${quote.contact.email}\n` +
                                    `Phone: ${quote.contact.phone}\n` +
                                    `Address: ${quote.delivery.streetAddress}, ${quote.delivery.city}, ${quote.delivery.state} ${quote.delivery.zipCode}\n` +
                                    `Total: $${quote.total.toFixed(2)}\n\n` +
                                    `Items:\n${quote.items.map(item =>
                                      `- ${item.product.name} (${item.selectedSize.size} ${item.selectedSize.unit}) x ${item.quantity} = $${(item.selectedSize.price * item.quantity).toFixed(2)}`
                                    ).join('\n')}`
                                  alert(quoteDetails)
                                }}
                                className={styles.viewBtn}
                              >
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab === 'partners' && (
            <div className={styles.partnersSection}>
              <div className={styles.partnersGrid}>
                {partners.map((partner) => {
                  const stats = calculatePartnerStats(partner.code)
                  const url = generatePartnerUrl(partner.code)

                  return (
                    <div key={partner.id} className={styles.partnerCard}>
                      <h3>{partner.name}</h3>
                      <p className={styles.partnerCode}>Code: {partner.code}</p>
                      <div className={styles.partnerStats}>
                        <div>
                          <span>Referrals:</span>
                          <strong>{stats.totalReferrals}</strong>
                        </div>
                        <div>
                          <span>Revenue:</span>
                          <strong>${stats.totalRevenue.toFixed(2)}</strong>
                        </div>
                        <div>
                          <span>Commission (10%):</span>
                          <strong>${stats.totalCommission.toFixed(2)}</strong>
                        </div>
                      </div>
                      <div className={styles.partnerUrl}>
                        <input
                          type="text"
                          value={url}
                          readOnly
                          className={styles.urlInput}
                        />
                        <button
                          onClick={() => handleCopyUrl(url)}
                          className={styles.copyBtn}
                        >
                          Copy
                        </button>
                      </div>
                      <div className={styles.partnerActions}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.previewLink}
                        >
                          Preview →
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}