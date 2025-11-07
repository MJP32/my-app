import { useEffect } from 'react'

/**
 * Google Analytics 4 Component
 * Add your GA4 Measurement ID to enable tracking
 */
function GoogleAnalytics({ measurementId = 'G-XXXXXXXXXX' }) {
  useEffect(() => {
    // Only load in production
    if (import.meta.env.MODE !== 'production' || !measurementId || measurementId === 'G-XXXXXXXXXX') {
      console.log('Google Analytics: Skipped (development mode or invalid ID)')
      return
    }

    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', measurementId, {
      page_path: window.location.pathname,
      anonymize_ip: true, // GDPR compliance
      cookie_flags: 'SameSite=None;Secure' // Cookie security
    })

    console.log('Google Analytics initialized:', measurementId)
  }, [measurementId])

  return null
}

export default GoogleAnalytics

/**
 * Track custom events
 * Usage: trackEvent('button_click', { button_name: 'Start Practice' })
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams)
  } else {
    console.log('GA Event:', eventName, eventParams)
  }
}

/**
 * Track page views (for SPA navigation)
 * Usage: trackPageView('/java/java8')
 */
export const trackPageView = (pagePath, pageTitle = '') => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', window.GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle
    })
  } else {
    console.log('GA Page View:', pagePath, pageTitle)
  }
}

/**
 * Track topic/component selection
 */
export const trackTopicView = (topicName, category = '') => {
  trackEvent('topic_view', {
    topic_name: topicName,
    category: category,
    timestamp: new Date().toISOString()
  })
}

/**
 * Track practice problem attempts
 */
export const trackPracticeProblem = (problemId, action = 'view') => {
  trackEvent('practice_problem', {
    problem_id: problemId,
    action: action, // 'view', 'attempt', 'complete'
    timestamp: new Date().toISOString()
  })
}

/**
 * Track user progress milestones
 */
export const trackMilestone = (milestoneType, details = {}) => {
  trackEvent('milestone_reached', {
    milestone_type: milestoneType, // 'first_problem', '10_problems', '50_problems', etc.
    ...details
  })
}

/**
 * Track search queries
 */
export const trackSearch = (searchQuery, resultsCount = 0) => {
  trackEvent('search', {
    search_term: searchQuery,
    results_count: resultsCount
  })
}

/**
 * Track study guide downloads
 */
export const trackDownload = (downloadType, format = '') => {
  trackEvent('download', {
    download_type: downloadType,
    format: format,
    timestamp: new Date().toISOString()
  })
}

/**
 * Track social shares
 */
export const trackShare = (platform, contentType = '', contentId = '') => {
  trackEvent('share', {
    platform: platform, // 'twitter', 'linkedin', 'facebook', 'copy_link'
    content_type: contentType,
    content_id: contentId,
    timestamp: new Date().toISOString()
  })
}
