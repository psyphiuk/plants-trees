export const translations = {
  en: {
    // Common
    companyName: 'Southern High Farms',
    next: 'Next',
    back: 'Back',
    submit: 'Submit Quote Request',
    required: 'Required',
    loading: 'Loading...',

    // Quote Form
    quoteTitle: 'Request a Quote',
    partnerReferral: 'Referred by',
    step1Title: 'Contact Information',
    step2Title: 'Delivery Details',
    step3Title: 'Select Products',
    step4Title: 'Review Your Quote',

    // Contact Fields
    firstName: 'First Name',
    lastName: 'Last Name',
    companyName: 'Company Name',
    email: 'Email',
    phone: 'Phone Number',
    preferredLanguage: 'Preferred Language',

    // Delivery Fields
    deliveryAddress: 'Delivery Address',
    streetAddress: 'Street Address',
    city: 'City',
    state: 'State',
    zipCode: 'ZIP Code',
    deliveryDate: 'Preferred Delivery Date',
    deliveryNotes: 'Delivery Notes (Optional)',

    // Product Selection
    searchProducts: 'Search plants...',
    category: 'Category',
    allCategories: 'All Categories',
    trees: 'Trees',
    shrubs: 'Shrubs',
    perennials: 'Perennials',
    annuals: 'Annuals',
    grasses: 'Ornamental Grasses',
    addToQuote: 'Add to Quote',
    quantity: 'Quantity',
    size: 'Size',
    unitPrice: 'Unit Price',
    subtotal: 'Subtotal',
    removeItem: 'Remove',
    emptyCart: 'No products selected',
    minOrder: 'Min. order',

    // Review
    quoteTotal: 'Quote Total',
    contactInfo: 'Contact Information',
    deliveryInfo: 'Delivery Information',
    selectedProducts: 'Selected Products',
    estimatedTotal: 'Estimated Total',
    submitSuccess: 'Quote submitted successfully!',
    submitError: 'Error submitting quote. Please try again.',
    quoteId: 'Quote ID',

    // Product Details
    sunRequirement: 'Sun Requirement',
    waterRequirement: 'Water Requirement',
    matureSize: 'Mature Size',
    bloomTime: 'Bloom Time',
    fullSun: 'Full Sun',
    partialShade: 'Partial Shade',
    fullShade: 'Full Shade',
    lowWater: 'Low Water',
    mediumWater: 'Medium Water',
    highWater: 'High Water',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
  },
  es: {
    // Common
    companyName: 'Southern High Farms',
    next: 'Siguiente',
    back: 'Atrás',
    submit: 'Enviar Solicitud de Cotización',
    required: 'Requerido',
    loading: 'Cargando...',

    // Quote Form
    quoteTitle: 'Solicitar Cotización',
    partnerReferral: 'Referido por',
    step1Title: 'Información de Contacto',
    step2Title: 'Detalles de Entrega',
    step3Title: 'Seleccionar Productos',
    step4Title: 'Revisar Su Cotización',

    // Contact Fields
    firstName: 'Nombre',
    lastName: 'Apellido',
    companyName: 'Nombre de la Empresa',
    email: 'Correo Electrónico',
    phone: 'Número de Teléfono',
    preferredLanguage: 'Idioma Preferido',

    // Delivery Fields
    deliveryAddress: 'Dirección de Entrega',
    streetAddress: 'Dirección',
    city: 'Ciudad',
    state: 'Estado',
    zipCode: 'Código Postal',
    deliveryDate: 'Fecha de Entrega Preferida',
    deliveryNotes: 'Notas de Entrega (Opcional)',

    // Product Selection
    searchProducts: 'Buscar plantas...',
    category: 'Categoría',
    allCategories: 'Todas las Categorías',
    trees: 'Árboles',
    shrubs: 'Arbustos',
    perennials: 'Perennes',
    annuals: 'Anuales',
    grasses: 'Pastos Ornamentales',
    addToQuote: 'Agregar a Cotización',
    quantity: 'Cantidad',
    size: 'Tamaño',
    unitPrice: 'Precio Unitario',
    subtotal: 'Subtotal',
    removeItem: 'Eliminar',
    emptyCart: 'No hay productos seleccionados',
    minOrder: 'Pedido mín.',

    // Review
    quoteTotal: 'Total de Cotización',
    contactInfo: 'Información de Contacto',
    deliveryInfo: 'Información de Entrega',
    selectedProducts: 'Productos Seleccionados',
    estimatedTotal: 'Total Estimado',
    submitSuccess: '¡Cotización enviada exitosamente!',
    submitError: 'Error al enviar la cotización. Por favor intente de nuevo.',
    quoteId: 'ID de Cotización',

    // Product Details
    sunRequirement: 'Requerimiento de Sol',
    waterRequirement: 'Requerimiento de Agua',
    matureSize: 'Tamaño Maduro',
    bloomTime: 'Tiempo de Floración',
    fullSun: 'Sol Completo',
    partialShade: 'Sombra Parcial',
    fullShade: 'Sombra Completa',
    lowWater: 'Poca Agua',
    mediumWater: 'Agua Media',
    highWater: 'Mucha Agua',
    inStock: 'En Stock',
    outOfStock: 'Agotado',
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en

export function detectLanguage(): Language {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('es')) {
      return 'es'
    }
  }
  return 'en'
}

export function t(key: TranslationKey, lang?: Language): string {
  const currentLang = lang || detectLanguage()
  return translations[currentLang][key] || translations.en[key]
}