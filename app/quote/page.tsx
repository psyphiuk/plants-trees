'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.scss'
import { products, Product, ProductSize } from '@/lib/products'
import { getPartnerByCode } from '@/lib/partners'
import {
  savePartnerCode,
  getPartnerCode,
  saveQuote,
  generateQuoteId,
  QuoteItem,
  Quote,
  calculateQuoteTotal
} from '@/lib/storage'
import { t, detectLanguage, Language } from '@/lib/translations'

export default function QuotePage() {
  const searchParams = useSearchParams()
  const [language, setLanguage] = useState<Language>('en')
  const [currentStep, setCurrentStep] = useState(1)
  const [partnerName, setPartnerName] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [quoteId, setQuoteId] = useState('')

  // Form data
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
  })

  const [deliveryInfo, setDeliveryInfo] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    date: '',
    notes: '',
  })

  useEffect(() => {
    // Detect language
    const detectedLang = detectLanguage()
    setLanguage(detectedLang)

    // Check for partner code in URL
    const partnerCode = searchParams.get('partner')
    if (partnerCode) {
      savePartnerCode(partnerCode)
      const partner = getPartnerByCode(partnerCode)
      if (partner) {
        setPartnerName(partner.name)
      }
    } else {
      // Check if partner code exists in localStorage
      const savedCode = getPartnerCode()
      if (savedCode) {
        const partner = getPartnerByCode(savedCode)
        if (partner) {
          setPartnerName(partner.name)
        }
      }
    }
  }, [searchParams])

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.scientificName?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToQuote = (product: Product, size: ProductSize, quantity: number) => {
    setQuoteItems(prev => {
      const existing = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize.size === size.size
      )
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing].quantity += quantity
        return updated
      }
      return [...prev, { product, selectedSize: size, quantity }]
    })
  }

  const removeFromQuote = (productId: string, sizeId: string) => {
    setQuoteItems(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedSize.size === sizeId)
    ))
  }

  const updateQuantity = (productId: string, sizeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromQuote(productId, sizeId)
      return
    }
    setQuoteItems(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedSize.size === sizeId) {
        return { ...item, quantity }
      }
      return item
    }))
  }

  const handleSubmit = async () => {
    setSubmitting(true)

    const quote: Quote = {
      id: generateQuoteId(),
      partnerCode: getPartnerCode() || undefined,
      createdAt: new Date().toISOString(),
      status: 'pending',
      language,
      contact: contactInfo,
      delivery: deliveryInfo,
      items: quoteItems,
      total: calculateQuoteTotal(quoteItems),
    }

    // Save to localStorage
    saveQuote(quote)
    setQuoteId(quote.id)
    setSubmitSuccess(true)
    setSubmitting(false)

    // Clear form
    setTimeout(() => {
      setQuoteItems([])
      setCurrentStep(1)
      setContactInfo({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
      })
      setDeliveryInfo({
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        date: '',
        notes: '',
      })
    }, 3000)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return contactInfo.firstName && contactInfo.lastName &&
               contactInfo.email && contactInfo.phone
      case 2:
        return deliveryInfo.streetAddress && deliveryInfo.city &&
               deliveryInfo.state && deliveryInfo.zipCode
      case 3:
        return quoteItems.length > 0
      default:
        return true
    }
  }

  const quoteTotal = calculateQuoteTotal(quoteItems)

  return (
    <div className={styles.quotePage}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo}>
              {t('companyName', language)}
            </Link>
            <div className={styles.headerRight}>
              {partnerName && (
                <span className={styles.partnerBadge}>
                  {t('partnerReferral', language)}: {partnerName}
                </span>
              )}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className={styles.languageSwitch}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <h1>{t('quoteTitle', language)}</h1>

          {submitSuccess ? (
            <div className={styles.success}>
              <h2>{t('submitSuccess', language)}</h2>
              <p>{t('quoteId', language)}: <strong>{quoteId}</strong></p>
              <Link href="/" className="btn btn-primary">
                Return Home
              </Link>
            </div>
          ) : (
            <>
              <div className={styles.steps}>
                <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ''}`}>
                  <span className={styles.stepNumber}>1</span>
                  <span className={styles.stepTitle}>{t('step1Title', language)}</span>
                </div>
                <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ''}`}>
                  <span className={styles.stepNumber}>2</span>
                  <span className={styles.stepTitle}>{t('step2Title', language)}</span>
                </div>
                <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
                  <span className={styles.stepNumber}>3</span>
                  <span className={styles.stepTitle}>{t('step3Title', language)}</span>
                </div>
                <div className={`${styles.step} ${currentStep >= 4 ? styles.active : ''}`}>
                  <span className={styles.stepNumber}>4</span>
                  <span className={styles.stepTitle}>{t('step4Title', language)}</span>
                </div>
              </div>

              <div className={styles.formContent}>
                {currentStep === 1 && (
                  <div className={styles.stepContent}>
                    <h2>{t('step1Title', language)}</h2>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>{t('firstName', language)} *</label>
                        <input
                          type="text"
                          value={contactInfo.firstName}
                          onChange={(e) => setContactInfo({...contactInfo, firstName: e.target.value})}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>{t('lastName', language)} *</label>
                        <input
                          type="text"
                          value={contactInfo.lastName}
                          onChange={(e) => setContactInfo({...contactInfo, lastName: e.target.value})}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>{t('companyName', language)}</label>
                        <input
                          type="text"
                          value={contactInfo.company}
                          onChange={(e) => setContactInfo({...contactInfo, company: e.target.value})}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>{t('email', language)} *</label>
                        <input
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>{t('phone', language)} *</label>
                        <input
                          type="tel"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className={styles.stepContent}>
                    <h2>{t('step2Title', language)}</h2>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup + ' ' + styles.fullWidth}>
                        <label>{t('streetAddress', language)} *</label>
                        <input
                          type="text"
                          value={deliveryInfo.streetAddress}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, streetAddress: e.target.value})}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>{t('city', language)} *</label>
                        <input
                          type="text"
                          value={deliveryInfo.city}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>{t('state', language)} *</label>
                        <input
                          type="text"
                          value={deliveryInfo.state}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, state: e.target.value})}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>{t('zipCode', language)} *</label>
                        <input
                          type="text"
                          value={deliveryInfo.zipCode}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, zipCode: e.target.value})}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>{t('deliveryDate', language)}</label>
                        <input
                          type="date"
                          value={deliveryInfo.date}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, date: e.target.value})}
                        />
                      </div>
                      <div className={styles.formGroup + ' ' + styles.fullWidth}>
                        <label>{t('deliveryNotes', language)}</label>
                        <textarea
                          value={deliveryInfo.notes}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, notes: e.target.value})}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className={styles.stepContent}>
                    <h2>{t('step3Title', language)}</h2>

                    <div className={styles.filters}>
                      <input
                        type="text"
                        placeholder={t('searchProducts', language)}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                      />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={styles.categorySelect}
                      >
                        <option value="all">{t('allCategories', language)}</option>
                        <option value="trees">{t('trees', language)}</option>
                        <option value="shrubs">{t('shrubs', language)}</option>
                        <option value="perennials">{t('perennials', language)}</option>
                        <option value="annuals">{t('annuals', language)}</option>
                        <option value="grasses">{t('grasses', language)}</option>
                      </select>
                    </div>

                    <div className={styles.productGrid}>
                      {filteredProducts.map((product) => (
                        <div key={product.id} className={styles.productCard}>
                          <h3>{product.name}</h3>
                          {product.scientificName && (
                            <p className={styles.scientificName}>{product.scientificName}</p>
                          )}
                          <p className={styles.description}>{product.description}</p>

                          <div className={styles.productSizes}>
                            {product.sizes.map((size) => (
                              <div key={size.size} className={styles.sizeOption}>
                                <div className={styles.sizeInfo}>
                                  <span>{size.size} {size.unit}</span>
                                  <span className={styles.price}>${size.price.toFixed(2)}</span>
                                  {size.minOrder && (
                                    <span className={styles.minOrder}>
                                      {t('minOrder', language)}: {size.minOrder}
                                    </span>
                                  )}
                                </div>
                                <div className={styles.addControls}>
                                  <input
                                    type="number"
                                    min={size.minOrder || 1}
                                    defaultValue={size.minOrder || 1}
                                    id={`qty-${product.id}-${size.size}`}
                                    className={styles.quantityInput}
                                  />
                                  <button
                                    onClick={() => {
                                      const input = document.getElementById(`qty-${product.id}-${size.size}`) as HTMLInputElement
                                      const qty = parseInt(input.value) || 1
                                      addToQuote(product, size, qty)
                                      input.value = String(size.minOrder || 1)
                                    }}
                                    className="btn btn-primary"
                                  >
                                    {t('addToQuote', language)}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {quoteItems.length > 0 && (
                      <div className={styles.cart}>
                        <h3>{t('selectedProducts', language)}</h3>
                        <div className={styles.cartItems}>
                          {quoteItems.map((item, index) => (
                            <div key={index} className={styles.cartItem}>
                              <div className={styles.itemInfo}>
                                <strong>{item.product.name}</strong>
                                <span>{item.selectedSize.size} {item.selectedSize.unit}</span>
                              </div>
                              <div className={styles.itemControls}>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(
                                    item.product.id,
                                    item.selectedSize.size,
                                    parseInt(e.target.value) || 0
                                  )}
                                  className={styles.quantityInput}
                                />
                                <span className={styles.itemPrice}>
                                  ${(item.selectedSize.price * item.quantity).toFixed(2)}
                                </span>
                                <button
                                  onClick={() => removeFromQuote(item.product.id, item.selectedSize.size)}
                                  className={styles.removeBtn}
                                >
                                  {t('removeItem', language)}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className={styles.cartTotal}>
                          <strong>{t('estimatedTotal', language)}:</strong>
                          <span className={styles.totalAmount}>${quoteTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 4 && (
                  <div className={styles.stepContent}>
                    <h2>{t('step4Title', language)}</h2>

                    <div className={styles.reviewSection}>
                      <h3>{t('contactInfo', language)}</h3>
                      <div className={styles.reviewInfo}>
                        <p>{contactInfo.firstName} {contactInfo.lastName}</p>
                        {contactInfo.company && <p>{contactInfo.company}</p>}
                        <p>{contactInfo.email}</p>
                        <p>{contactInfo.phone}</p>
                      </div>
                    </div>

                    <div className={styles.reviewSection}>
                      <h3>{t('deliveryInfo', language)}</h3>
                      <div className={styles.reviewInfo}>
                        <p>{deliveryInfo.streetAddress}</p>
                        <p>{deliveryInfo.city}, {deliveryInfo.state} {deliveryInfo.zipCode}</p>
                        {deliveryInfo.date && <p>Date: {deliveryInfo.date}</p>}
                        {deliveryInfo.notes && <p>Notes: {deliveryInfo.notes}</p>}
                      </div>
                    </div>

                    <div className={styles.reviewSection}>
                      <h3>{t('selectedProducts', language)}</h3>
                      <div className={styles.reviewItems}>
                        {quoteItems.map((item, index) => (
                          <div key={index} className={styles.reviewItem}>
                            <span>{item.product.name} - {item.selectedSize.size} {item.selectedSize.unit}</span>
                            <span>{item.quantity} × ${item.selectedSize.price.toFixed(2)}</span>
                            <span>${(item.selectedSize.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className={styles.reviewTotal}>
                        <strong>{t('quoteTotal', language)}:</strong>
                        <strong className={styles.totalAmount}>${quoteTotal.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.formActions}>
                  {currentStep > 1 && (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="btn btn-secondary"
                    >
                      {t('back', language)}
                    </button>
                  )}
                  {currentStep < 4 ? (
                    <button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={!canProceed()}
                      className="btn btn-primary"
                    >
                      {t('next', language)}
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={submitting || !canProceed()}
                      className="btn btn-primary"
                    >
                      {submitting ? t('loading', language) : t('submit', language)}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}