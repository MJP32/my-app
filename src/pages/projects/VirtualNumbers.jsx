import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function VirtualNumbers({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview')

  const cardExamples = [
    {
      number: '5178051234567893',
      displayNumber: '5178 0512 3456 7893',
      network: 'Mastercard',
      color: '#eb001b',
      breakdown: [
        { label: 'Network Identifier', digits: '5', description: 'First digit identifies Mastercard network' },
        { label: 'Bank Identifier (BIN/IIN)', digits: '17805', description: 'Specific bank/issuer within Mastercard network (Bank Identification Number)' },
        { label: 'Account Number', digits: '123456', description: 'Unique account identifier assigned by the issuing bank' },
        { label: 'Sub-Account Info', digits: '789', description: 'Additional routing or sub-account information' },
        { label: 'Check Digit', digits: '3', description: 'Luhn algorithm validation digit to detect errors' }
      ]
    },
    {
      number: '378282246310005',
      displayNumber: '3782 822463 10005',
      network: 'American Express',
      color: '#006fcf',
      breakdown: [
        { label: 'Network Identifier', digits: '3', description: 'First digit identifies American Express network' },
        { label: 'AmEx Issuer Info', digits: '78282', description: 'American Express-specific issuer information and card type' },
        { label: 'Account Number', digits: '246310', description: 'Unique account identifier for the cardholder' },
        { label: 'Additional Info', digits: '0', description: 'Sub-account or routing information' },
        { label: 'Sequence', digits: '0', description: 'Card sequence number (for replacement cards)' },
        { label: 'Check Digit', digits: '5', description: 'Luhn algorithm validation digit' }
      ]
    },
    {
      number: '4513443278589083',
      displayNumber: '4513 4432 7858 9083',
      network: 'Visa',
      color: '#1a1f71',
      breakdown: [
        { label: 'Network Identifier', digits: '4', description: 'First digit identifies Visa network' },
        { label: 'Bank Identifier (BIN)', digits: '51344', description: 'Specific Visa issuing bank or financial institution' },
        { label: 'Account Number', digits: '327858', description: 'Unique account identifier within the bank' },
        { label: 'Routing Info', digits: '908', description: 'Card type, sub-account, or routing information' },
        { label: 'Check Digit', digits: '3', description: 'Luhn algorithm validation digit for error detection' }
      ]
    }
  ]

  const networkIdentifiers = [
    { digit: '1', network: 'Airlines', examples: ['United Airlines', 'Delta Airlines'], color: '#60a5fa' },
    { digit: '2', network: 'Airlines & Financial', examples: ['Mastercard (co-branded)', 'Diners Club'], color: '#34d399' },
    { digit: '3', network: 'Travel & Entertainment', examples: ['American Express', 'Diners Club', 'JCB'], color: '#a78bfa' },
    { digit: '4', network: 'Banking & Financial (Visa)', examples: ['Visa'], color: '#1a1f71' },
    { digit: '5', network: 'Banking & Financial (Mastercard)', examples: ['Mastercard'], color: '#eb001b' },
    { digit: '6', network: 'Merchandising & Banking', examples: ['Discover', 'China UnionPay'], color: '#ff6600' },
    { digit: '7', network: 'Petroleum', examples: ['Gas station cards'], color: '#fbbf24' },
    { digit: '8', network: 'Healthcare & Telecom', examples: ['Healthcare cards'], color: '#f472b6' },
    { digit: '9', network: 'National Assignment', examples: ['Government cards'], color: '#94a3b8' }
  ]

  const cardLengths = [
    {
      network: 'Visa',
      length: '13, 16, 19',
      prefix: '4',
      format: '4xxx xxxx xxxx xxxx',
      color: '#1a1f71',
      endingDigits: [
        { range: 'x0-x4', type: 'Standard Credit', description: 'Basic Visa credit cards' },
        { range: 'x5-x7', type: 'Debit/Business', description: 'Visa debit or business cards' },
        { range: 'x8-x9', type: 'Premium/Rewards', description: 'Signature, Infinite, or rewards cards' }
      ]
    },
    {
      network: 'Mastercard',
      length: '16',
      prefix: '51-55, 2221-2720',
      format: '5xxx xxxx xxxx xxxx',
      color: '#eb001b',
      endingDigits: [
        { range: 'x0-x3', type: 'Standard Credit', description: 'Standard Mastercard credit cards' },
        { range: 'x4-x6', type: 'Debit/Prepaid', description: 'Mastercard debit or prepaid cards' },
        { range: 'x7-x9', type: 'Premium', description: 'World, World Elite, or commercial cards' }
      ]
    },
    {
      network: 'American Express',
      length: '15',
      prefix: '34, 37',
      format: '3xxx xxxxxx xxxxx',
      color: '#006fcf',
      endingDigits: [
        { range: 'x0-x4', type: 'Charge Card', description: 'Traditional charge cards (Green, Gold)' },
        { range: 'x5-x7', type: 'Credit Card', description: 'Credit cards with revolving balance' },
        { range: 'x8-x9', type: 'Premium/Centurion', description: 'Platinum, Centurion (Black), premium cards' }
      ]
    },
    {
      network: 'Discover',
      length: '16',
      prefix: '6011, 622126-622925, 644-649, 65',
      format: '6xxx xxxx xxxx xxxx',
      color: '#ff6600',
      endingDigits: [
        { range: 'x0-x5', type: 'Standard Credit', description: 'Standard Discover credit cards' },
        { range: 'x6-x8', type: 'Cashback/Rewards', description: 'Cashback or rewards program cards' },
        { range: 'x9', type: 'Premium/It Card', description: 'Premium tier or special edition cards' }
      ]
    },
    {
      network: 'Diners Club',
      length: '14',
      prefix: '36, 38, 300-305',
      format: 'xxxx xxxxxx xxxx',
      color: '#0079be',
      endingDigits: [
        { range: 'x0-x6', type: 'Standard', description: 'Standard Diners Club cards' },
        { range: 'x7-x9', type: 'Premium', description: 'Premium or international cards' }
      ]
    },
    {
      network: 'JCB',
      length: '16',
      prefix: '3528-3589',
      format: 'xxxx xxxx xxxx xxxx',
      color: '#0e4c96',
      endingDigits: [
        { range: 'x0-x4', type: 'Standard', description: 'Standard JCB cards (Japan focus)' },
        { range: 'x5-x7', type: 'International', description: 'International acceptance cards' },
        { range: 'x8-x9', type: 'Premium', description: 'Premium tier cards (Platinum, etc.)' }
      ]
    },
    {
      network: 'UnionPay',
      length: '16-19',
      prefix: '62',
      format: '62xx xxxx xxxx xxxx',
      color: '#e21836',
      endingDigits: [
        { range: 'x0-x5', type: 'Debit', description: 'UnionPay debit cards (China mainland)' },
        { range: 'x6-x8', type: 'Credit/International', description: 'Credit or international cards' },
        { range: 'x9', type: 'Premium', description: 'Premium or Diamond cards' }
      ]
    },
    {
      network: 'Maestro',
      length: '12-19',
      prefix: '5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763',
      format: 'xxxx xxxx xxxx xxxx',
      color: '#eb001b',
      endingDigits: [
        { range: 'x0-x9', type: 'Debit Only', description: 'Maestro is debit-only, varies by region' }
      ]
    }
  ]

  const luhnSteps = [
    {
      step: '1. Starting from the rightmost digit (check digit), double every second digit',
      example: '4 5 1 3 4 4 3 2 7 8 5 8 9 0 8 3',
      result: '8 5 2 3 8 4 6 2 14 8 10 8 18 0 16 3',
      explanation: 'Positions 15, 13, 11, 9, 7, 5, 3, 1 are doubled'
    },
    {
      step: '2. If doubling results in a two-digit number, add the digits (or subtract 9)',
      example: '8 5 2 3 8 4 6 2 14 8 10 8 18 0 16 3',
      result: '8 5 2 3 8 4 6 2 5 8 1 8 9 0 7 3',
      explanation: '14→5, 10→1, 18→9, 16→7'
    },
    {
      step: '3. Sum all the digits',
      example: '8+5+2+3+8+4+6+2+5+8+1+8+9+0+7+3',
      result: '89',
      explanation: 'Add all individual digits together'
    },
    {
      step: '4. If sum modulo 10 equals 0, the number is valid',
      example: '89 mod 10 = 9',
      result: 'Invalid (should be 0)',
      explanation: 'Valid cards have checksum divisible by 10'
    }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          ← Back to Projects
        </button>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', margin: 0, textAlign: 'center' }}>
          🔢 Virtual Numbers
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <p style={{ fontSize: '1.1rem', color: '#9ca3af', textAlign: 'center', marginBottom: '2rem', lineHeight: '1.6' }}>
        Understanding credit card number structure, network identifiers, and the Luhn Algorithm validation
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #374151', flexWrap: 'wrap' }}>
        {[
          { id: 'overview', label: '📋 Overview', icon: '📋' },
          { id: 'examples', label: '💳 Card Examples', icon: '💳' },
          { id: 'luhn', label: '🔐 Luhn Algorithm', icon: '🔐' },
          { id: 'networks', label: '🌐 Network IDs', icon: '🌐' },
          { id: 'lengths', label: '📏 Card Lengths', icon: '📏' },
          { id: 'vcn', label: '🛡️ VCN Validation', icon: '🛡️' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              color: activeTab === tab.id ? '#14b8a6' : '#6b7280',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid #14b8a6' : '3px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'white', marginBottom: '1.5rem' }}>
            Credit Card Number Anatomy
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', backgroundColor: '#1e3a5a', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>
                🏦 Major Industry Identifier (MII)
              </h3>
              <p style={{ color: '#9ca3af', lineHeight: '1.6', marginBottom: '0.5rem' }}>
                The first digit identifies the card's industry category and network. This is the primary classification.
              </p>
              <ul style={{ color: '#9ca3af', lineHeight: '1.8', marginLeft: '1.5rem' }}>
                <li>1-2: Airlines and Financial</li>
                <li>3: Travel & Entertainment (Amex, Diners)</li>
                <li>4: Banking (Visa)</li>
                <li>5: Banking (Mastercard)</li>
                <li>6: Merchandising (Discover)</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#422006', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>
                🏛️ Bank Identification Number (BIN/IIN)
              </h3>
              <p style={{ color: '#9ca3af', lineHeight: '1.6', marginBottom: '0.5rem' }}>
                First 6-8 digits identify the issuing institution. Also called Issuer Identification Number (IIN).
              </p>
              <ul style={{ color: '#9ca3af', lineHeight: '1.8', marginLeft: '1.5rem' }}>
                <li>Identifies the bank or financial institution</li>
                <li>Determines card type (credit, debit, prepaid)</li>
                <li>Used for routing transactions</li>
                <li>Globally unique across payment networks</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#064e3b', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>
                👤 Account Number
              </h3>
              <p style={{ color: '#9ca3af', lineHeight: '1.6', marginBottom: '0.5rem' }}>
                Middle digits uniquely identify the cardholder's account within the issuing bank.
              </p>
              <ul style={{ color: '#9ca3af', lineHeight: '1.8', marginLeft: '1.5rem' }}>
                <li>6-12 digits long (varies by network)</li>
                <li>Unique to each cardholder</li>
                <li>Assigned by the issuing bank</li>
                <li>Never reused after account closure</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: '#3b0764', borderRadius: '8px', borderLeft: '4px solid #a855f7' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>
                ✅ Check Digit (Luhn)
              </h3>
              <p style={{ color: '#9ca3af', lineHeight: '1.6', marginBottom: '0.5rem' }}>
                The last digit validates the entire card number using the Luhn algorithm (modulo 10).
              </p>
              <ul style={{ color: '#9ca3af', lineHeight: '1.8', marginLeft: '1.5rem' }}>
                <li>Calculated using Luhn algorithm</li>
                <li>Detects accidental data entry errors</li>
                <li>Catches 100% of single-digit errors</li>
                <li>Catches 98% of transposition errors</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#450a0a', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>
              🔒 Security & PCI Compliance
            </h3>
            <p style={{ color: '#9ca3af', lineHeight: '1.6', marginBottom: '1rem' }}>
              Card numbers are sensitive data protected by PCI DSS (Payment Card Industry Data Security Standard):
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div>
                <strong style={{ color: 'white' }}>Storage Rules:</strong>
                <ul style={{ color: '#9ca3af', lineHeight: '1.6', marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>Never store full card number unless necessary</li>
                  <li>Must encrypt at rest and in transit</li>
                  <li>Mask all but last 4 digits for display</li>
                </ul>
              </div>
              <div>
                <strong style={{ color: 'white' }}>Transmission:</strong>
                <ul style={{ color: '#9ca3af', lineHeight: '1.6', marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>Always use TLS/SSL encryption</li>
                  <li>Tokenization for recurring payments</li>
                  <li>Never send via email or SMS</li>
                </ul>
              </div>
              <div>
                <strong style={{ color: 'white' }}>Access Control:</strong>
                <ul style={{ color: '#9ca3af', lineHeight: '1.6', marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>Limit access on need-to-know basis</li>
                  <li>Audit all access and modifications</li>
                  <li>Use payment gateways when possible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Examples Tab */}
      {activeTab === 'examples' && (
        <div style={{ display: 'grid', gap: '2rem' }}>
          {cardExamples.map((card, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#1f2937',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                borderTop: `5px solid ${card.color}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', margin: 0 }}>
                  Card {idx + 1}: {card.network}
                </h3>
                <div style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: card.color,
                  color: 'white',
                  borderRadius: '6px',
                  fontWeight: '600'
                }}>
                  {card.network}
                </div>
              </div>

              <div style={{
                padding: '1.5rem',
                backgroundColor: '#374151',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.5rem', fontWeight: '600' }}>
                  FULL NUMBER
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white', letterSpacing: '0.1em', fontFamily: 'monospace' }}>
                  {card.displayNumber}
                </div>
              </div>

              <h4 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
                Number Breakdown:
              </h4>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {card.breakdown.map((part, partIdx) => (
                  <div
                    key={partIdx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '200px 120px 1fr',
                      alignItems: 'center',
                      padding: '1rem',
                      backgroundColor: partIdx % 2 === 0 ? '#374151' : '#1f2937',
                      borderRadius: '6px',
                      gap: '1rem'
                    }}
                  >
                    <div style={{ fontWeight: '600', color: 'white' }}>
                      {part.label}
                    </div>
                    <div style={{
                      fontFamily: 'monospace',
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      color: card.color,
                      backgroundColor: '#111827',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      textAlign: 'center',
                      border: `2px solid ${card.color}`
                    }}>
                      {part.digits}
                    </div>
                    <div style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
                      {part.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Luhn Algorithm Tab */}
      {activeTab === 'luhn' && (
        <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
            🔐 Luhn Algorithm (Modulo 10)
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#9ca3af', lineHeight: '1.6', marginBottom: '2rem' }}>
            The Luhn algorithm is a checksum formula used to validate credit card numbers and detect accidental errors.
            Invented by IBM scientist Hans Peter Luhn in 1954, it's also known as the "modulus 10" or "mod 10" algorithm.
          </p>

          <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#1e3a5a', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
              How It Works
            </h3>
            {luhnSteps.map((step, idx) => (
              <div key={idx} style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: '600', color: 'white', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                  {step.step}
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#374151',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Input:</div>
                  <div style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>{step.example}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Output:</div>
                  <div style={{ fontSize: '1.1rem', color: '#14b8a6', fontWeight: '600' }}>{step.result}</div>
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.95rem', fontStyle: 'italic' }}>
                  💡 {step.explanation}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#064e3b', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
              ✅ Valid Example: Visa 4532015112830366
            </h3>
            <div style={{ fontFamily: 'monospace', marginBottom: '1rem', color: 'white' }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <strong>Step 1 - Double every 2nd digit from right:</strong><br/>
                <span style={{ color: '#9ca3af' }}>Original: </span>4 5 3 2 0 1 5 1 1 2 8 3 0 3 6 6<br/>
                <span style={{ color: '#9ca3af' }}>Doubled:  </span>8 5 6 2 0 1 10 1 2 2 16 3 0 3 12 6
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <strong>Step 2 - Sum digits of doubled values:</strong><br/>
                <span style={{ color: '#9ca3af' }}>Adjusted: </span>8 5 6 2 0 1 1 1 2 2 7 3 0 3 3 6<br/>
                <span style={{ fontSize: '0.9rem', color: '#9ca3af' }}>(10→1+0=1, 16→1+6=7, 12→1+2=3)</span>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <strong>Step 3 - Sum all digits:</strong><br/>
                8+5+6+2+0+1+1+1+2+2+7+3+0+3+3+6 = <strong style={{ color: '#10b981' }}>50</strong>
              </div>
              <div>
                <strong>Step 4 - Check modulo 10:</strong><br/>
                50 mod 10 = <strong style={{ color: '#10b981', fontSize: '1.2rem' }}>0 ✓ VALID</strong>
              </div>
            </div>
          </div>

          <div style={{ padding: '1.5rem', backgroundColor: '#450a0a', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
              Key Properties
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div>
                <div style={{ fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>✅ Error Detection</div>
                <ul style={{ color: '#9ca3af', lineHeight: '1.6', marginLeft: '1.5rem' }}>
                  <li>100% of single-digit errors</li>
                  <li>98% of adjacent transpositions</li>
                  <li>Twin errors (11→22)</li>
                  <li>Jump transpositions (101→110)</li>
                </ul>
              </div>
              <div>
                <div style={{ fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>⚠️ Limitations</div>
                <ul style={{ color: '#9ca3af', lineHeight: '1.6', marginLeft: '1.5rem' }}>
                  <li>Not cryptographically secure</li>
                  <li>Only detects accidental errors</li>
                  <li>Cannot prevent deliberate fraud</li>
                  <li>Misses some transposition errors</li>
                </ul>
              </div>
              <div>
                <div style={{ fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>🎯 Use Cases</div>
                <ul style={{ color: '#9ca3af', lineHeight: '1.6', marginLeft: '1.5rem' }}>
                  <li>Credit/debit card validation</li>
                  <li>IMEI numbers (mobile devices)</li>
                  <li>Canadian Social Insurance</li>
                  <li>Israeli ID numbers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Network Identifiers Tab */}
      {activeTab === 'networks' && (
        <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
            🌐 Major Industry Identifier (MII) - First Digit
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#9ca3af', lineHeight: '1.6', marginBottom: '2rem' }}>
            The first digit of a card number identifies the industry and payment network. This classification is defined by ISO/IEC 7812.
          </p>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {networkIdentifiers.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 250px 1fr',
                  alignItems: 'center',
                  padding: '1.5rem',
                  backgroundColor: idx % 2 === 0 ? '#374151' : '#1f2937',
                  borderRadius: '8px',
                  borderLeft: `4px solid ${item.color}`,
                  gap: '1.5rem'
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  color: 'white',
                  backgroundColor: item.color,
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  fontFamily: 'monospace'
                }}>
                  {item.digit}
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'white', marginBottom: '0.25rem' }}>
                    {item.network}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
                    MII: {item.digit}
                  </div>
                </div>
                <div style={{ color: '#9ca3af' }}>
                  <strong style={{ color: 'white' }}>Examples:</strong> {item.examples.join(', ')}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#422006', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>
              💡 Quick Identification
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#374151', borderRadius: '6px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a1f71', marginBottom: '0.5rem' }}>4xxx...</div>
                <div style={{ fontWeight: '600', color: 'white' }}>Visa</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#374151', borderRadius: '6px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#eb001b', marginBottom: '0.5rem' }}>5xxx...</div>
                <div style={{ fontWeight: '600', color: 'white' }}>Mastercard</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#374151', borderRadius: '6px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#006fcf', marginBottom: '0.5rem' }}>3xxx...</div>
                <div style={{ fontWeight: '600', color: 'white' }}>Amex / Diners</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#374151', borderRadius: '6px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ff6600', marginBottom: '0.5rem' }}>6xxx...</div>
                <div style={{ fontWeight: '600', color: 'white' }}>Discover / UnionPay</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Lengths Tab */}
      {activeTab === 'lengths' && (
        <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
            📏 Card Number Lengths by Network
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#9ca3af', lineHeight: '1.6', marginBottom: '2rem' }}>
            Different payment networks use different card number lengths and prefix patterns. This helps with validation and routing.
          </p>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {cardLengths.map((card, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#374151',
                  borderRadius: '10px',
                  borderLeft: `5px solid ${card.color}`,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'white', margin: 0, marginBottom: '0.5rem' }}>
                      {card.network}
                    </h3>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                      <div>
                        <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Length: </span>
                        <span style={{ fontWeight: '600', color: 'white' }}>{card.length} digits</span>
                      </div>
                      <div>
                        <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Prefix: </span>
                        <span style={{ fontWeight: '600', color: card.color }}>{card.prefix}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#111827',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: card.color,
                  letterSpacing: '0.05em',
                  textAlign: 'center'
                }}>
                  {card.format}
                </div>

                {/* Ending Digits Information */}
                {card.endingDigits && (
                  <div style={{ marginTop: '1rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>
                      🔢 Ending Digit Patterns (Last Digit Before Check):
                    </h4>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                      {card.endingDigits.map((ending, endIdx) => (
                        <div
                          key={endIdx}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '100px 150px 1fr',
                            alignItems: 'center',
                            padding: '0.75rem',
                            backgroundColor: '#1f2937',
                            borderRadius: '6px',
                            border: `1px solid ${card.color}33`,
                            gap: '1rem'
                          }}
                        >
                          <div style={{
                            fontFamily: 'monospace',
                            fontSize: '0.95rem',
                            fontWeight: '700',
                            color: card.color,
                            backgroundColor: `${card.color}22`,
                            padding: '0.4rem',
                            borderRadius: '4px',
                            textAlign: 'center'
                          }}>
                            {ending.range}
                          </div>
                          <div style={{
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: 'white'
                          }}>
                            {ending.type}
                          </div>
                          <div style={{
                            fontSize: '0.85rem',
                            color: '#9ca3af'
                          }}>
                            {ending.description}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{
                      marginTop: '0.75rem',
                      padding: '0.75rem',
                      backgroundColor: '#422006',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      color: '#fcd34d',
                      fontStyle: 'italic'
                    }}>
                      💡 <strong>Note:</strong> These patterns are general indicators. Actual card type and features are determined by the BIN/IIN (first 6-8 digits). The ending digits provide additional classification hints but should not be solely relied upon for card type detection.
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#1e3a5a', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
              🔍 Validation Tips
            </h3>
            <div style={{ color: '#9ca3af', lineHeight: '1.8' }}>
              <strong style={{ color: 'white' }}>When validating card numbers programmatically:</strong>
              <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li><strong style={{ color: 'white' }}>Check length first</strong> - Reject if not 13-19 digits</li>
                <li><strong style={{ color: 'white' }}>Validate prefix</strong> - Ensure it matches a known network</li>
                <li><strong style={{ color: 'white' }}>Run Luhn algorithm</strong> - Verify checksum is valid</li>
                <li><strong style={{ color: 'white' }}>Match length to network</strong> - e.g., Amex must be 15 digits</li>
                <li><strong style={{ color: 'white' }}>Remove spaces/dashes</strong> - Strip formatting before validation</li>
              </ol>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: '#450a0a', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>
              ⚠️ Important Notes
            </h3>
            <ul style={{ color: '#9ca3af', lineHeight: '1.8', marginLeft: '1.5rem' }}>
              <li><strong style={{ color: 'white' }}>Variable lengths:</strong> Some networks (Visa, Maestro, UnionPay) support multiple lengths</li>
              <li><strong style={{ color: 'white' }}>BIN expansion:</strong> Mastercard expanded to 2221-2720 range due to 51-55 exhaustion</li>
              <li><strong style={{ color: 'white' }}>Future changes:</strong> Networks may add new prefixes or lengths over time</li>
              <li><strong style={{ color: 'white' }}>Testing cards:</strong> Use network-provided test cards, never real customer data</li>
            </ul>
          </div>
        </div>
      )}

      {/* VCN Validation Tab */}
      {activeTab === 'vcn' && (
        <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
            🛡️ Virtual Card Number (VCN) Validation
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#9ca3af', lineHeight: '1.6', marginBottom: '2rem' }}>
            Similar to credit card numbers, the digits in virtual card numbers and associated transaction numbers may seem random,
            but they actually carry meaning. When a Capital One Virtual Credit Card is used, the data must be validated against
            certain business rules to arrive at a spend decision.
          </p>

          {/* VCN Structure */}
          <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#1e3a5a', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
              📊 VCN Structure (16 digits)
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 120px 1fr',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#374151',
                borderRadius: '6px',
                gap: '1rem'
              }}>
                <div style={{ fontWeight: '600', color: 'white' }}>
                  Positions 1-6
                </div>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#3b82f6',
                  backgroundColor: '#1e3a5a',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  textAlign: 'center',
                  border: '2px solid #3b82f6'
                }}>
                  IIN
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
                  Issuer Identification Number - Identifies the card issuer (Capital One)
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 120px 1fr',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#1f2937',
                borderRadius: '6px',
                gap: '1rem'
              }}>
                <div style={{ fontWeight: '600', color: 'white' }}>
                  Positions 7-15
                </div>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#10b981',
                  backgroundColor: '#064e3b',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  textAlign: 'center',
                  border: '2px solid #10b981'
                }}>
                  Account/Card ID
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
                  Unique identifier for the virtual card number
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 120px 1fr',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#374151',
                borderRadius: '6px',
                gap: '1rem'
              }}>
                <div style={{ fontWeight: '600', color: 'white' }}>
                  Position 16
                </div>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#a855f7',
                  backgroundColor: '#3b0764',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  textAlign: 'center',
                  border: '2px solid #a855f7'
                }}>
                  Check Digit
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
                  Luhn algorithm validation digit
                </div>
              </div>
            </div>
          </div>

          {/* Transaction ID Structure */}
          <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#064e3b', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
              🔢 Transaction ID Structure (8 digits)
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 120px 1fr',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#374151',
                borderRadius: '6px',
                gap: '1rem'
              }}>
                <div style={{ fontWeight: '600', color: 'white' }}>
                  Positions 1-2
                </div>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#f59e0b',
                  backgroundColor: '#422006',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  textAlign: 'center',
                  border: '2px solid #f59e0b'
                }}>
                  MCC
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
                  Merchant Category Code - Identifies the type of merchant (e.g., 52 = Clothing)
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 120px 1fr',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#1f2937',
                borderRadius: '6px',
                gap: '1rem'
              }}>
                <div style={{ fontWeight: '600', color: 'white' }}>
                  Positions 3-6
                </div>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#14b8a6',
                  backgroundColor: '#134e4a',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  textAlign: 'center',
                  border: '2px solid #14b8a6'
                }}>
                  Sequence
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
                  Sequence Number - Unique transaction sequence for this VCN
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '150px 120px 1fr',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#374151',
                borderRadius: '6px',
                gap: '1rem'
              }}>
                <div style={{ fontWeight: '600', color: 'white' }}>
                  Positions 7-8
                </div>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#ec4899',
                  backgroundColor: '#831843',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  textAlign: 'center',
                  border: '2px solid #ec4899'
                }}>
                  Control
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
                  Control Digits - Validation checksum for transaction integrity
                </div>
              </div>
            </div>
          </div>

          {/* Validation Rules */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1.5rem' }}>
              ✅ Validation Rules
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {/* Rule 1 */}
              <div style={{ padding: '1.25rem', backgroundColor: '#374151', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0 }}>
                    1. Luhn Algorithm Validation
                  </h4>
                  <code style={{ fontSize: '0.85rem', color: '#ef4444', backgroundColor: '#450a0a', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    INVALID_VCN_CHECKSUM
                  </code>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>
                  <strong style={{ color: 'white' }}>Rule:</strong> VCN position 16 (check digit) must be valid according to Luhn algorithm
                </p>
              </div>

              {/* Rule 2 */}
              <div style={{ padding: '1.25rem', backgroundColor: '#374151', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0 }}>
                    2. IIN Range Validation
                  </h4>
                  <code style={{ fontSize: '0.85rem', color: '#ef4444', backgroundColor: '#450a0a', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    INVALID_IIN
                  </code>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>
                  <strong style={{ color: 'white' }}>Rule:</strong> VCN positions 1-6 must be in range 400000-499999 (Capital One Visa virtual cards)
                </p>
              </div>

              {/* Rule 3 */}
              <div style={{ padding: '1.25rem', backgroundColor: '#374151', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0 }}>
                    3. Card Status Check
                  </h4>
                  <code style={{ fontSize: '0.85rem', color: '#ef4444', backgroundColor: '#450a0a', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    CARD_EXPIRED / CARD_SUSPENDED
                  </code>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>
                  <strong style={{ color: 'white' }}>Rule:</strong> VCN must be active (not expired, suspended, or closed)
                </p>
              </div>

              {/* Rule 4 */}
              <div style={{ padding: '1.25rem', backgroundColor: '#374151', borderRadius: '8px', borderLeft: '4px solid #a855f7' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0 }}>
                    4. Transaction Velocity Check
                  </h4>
                  <code style={{ fontSize: '0.85rem', color: '#ef4444', backgroundColor: '#450a0a', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    VELOCITY_LIMIT_EXCEEDED
                  </code>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>
                  <strong style={{ color: 'white' }}>Rule:</strong> Transaction ID positions 3-6 (sequence number) cannot increment more than 5 times in 1 hour
                </p>
              </div>

              {/* Rule 5 */}
              <div style={{ padding: '1.25rem', backgroundColor: '#374151', borderRadius: '8px', borderLeft: '4px solid #ec4899' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0 }}>
                    5. Spend Limit Validation
                  </h4>
                  <code style={{ fontSize: '0.85rem', color: '#ef4444', backgroundColor: '#450a0a', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    INSUFFICIENT_FUNDS
                  </code>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>
                  <strong style={{ color: 'white' }}>Rule:</strong> Transaction amount must not exceed VCN's remaining available credit limit
                </p>
              </div>

              {/* Rule 6 */}
              <div style={{ padding: '1.25rem', backgroundColor: '#374151', borderRadius: '8px', borderLeft: '4px solid #14b8a6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0 }}>
                    6. Merchant Category Code (MCC) Whitelist
                  </h4>
                  <code style={{ fontSize: '0.85rem', color: '#ef4444', backgroundColor: '#450a0a', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    MERCHANT_CATEGORY_BLOCKED
                  </code>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>
                  <strong style={{ color: 'white' }}>Rule:</strong> Transaction ID positions 1-2 must match one of the allowed merchant categories for this VCN
                </p>
              </div>

              {/* Rule 7 */}
              <div style={{ padding: '1.25rem', backgroundColor: '#374151', borderRadius: '8px', borderLeft: '4px solid #0ea5e9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0 }}>
                    7. Geographic Location Check
                  </h4>
                  <code style={{ fontSize: '0.85rem', color: '#ef4444', backgroundColor: '#450a0a', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    GEOGRAPHIC_RESTRICTION_VIOLATED
                  </code>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>
                  <strong style={{ color: 'white' }}>Rule:</strong> Merchant location must be within allowed geographic regions for the VCN
                </p>
              </div>

              {/* Rule 8 */}
              <div style={{ padding: '1.25rem', backgroundColor: '#374151', borderRadius: '8px', borderLeft: '4px solid #8b5cf6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0 }}>
                    8. Sequence Integrity Validation
                  </h4>
                  <code style={{ fontSize: '0.85rem', color: '#ef4444', backgroundColor: '#450a0a', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    INVALID_SEQUENCE_NUMBER
                  </code>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>
                  <strong style={{ color: 'white' }}>Rule:</strong> Transaction ID positions 3-6 must be greater than the last successful transaction sequence
                </p>
              </div>

              {/* Rule 9 */}
              <div style={{ padding: '1.25rem', backgroundColor: '#374151', borderRadius: '8px', borderLeft: '4px solid #f97316' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0 }}>
                    9. Control Digit Validation
                  </h4>
                  <code style={{ fontSize: '0.85rem', color: '#ef4444', backgroundColor: '#450a0a', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    INVALID_CONTROL_DIGITS
                  </code>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>
                  <strong style={{ color: 'white' }}>Rule:</strong> Transaction ID positions 7-8 must match computed control digits: (sum of positions 1-6) mod 97
                </p>
              </div>

              {/* Rule 10 */}
              <div style={{ padding: '1.25rem', backgroundColor: '#374151', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0 }}>
                    10. Duplicate Transaction Detection
                  </h4>
                  <code style={{ fontSize: '0.85rem', color: '#ef4444', backgroundColor: '#450a0a', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    DUPLICATE_TRANSACTION
                  </code>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>
                  <strong style={{ color: 'white' }}>Rule:</strong> The complete 8-digit transaction ID must not have been used in the last 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Processing Decision Logic */}
          <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#422006', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
              ⚖️ Processing Decision Logic
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#064e3b', borderRadius: '6px', border: '2px solid #10b981' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#10b981', marginBottom: '0.5rem' }}>
                  ✅ ACCEPT
                </div>
                <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0 }}>
                  All 10 validation rules pass → Transaction is approved and processed immediately
                </p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#450a0a', borderRadius: '6px', border: '2px solid #ef4444' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ef4444', marginBottom: '0.5rem' }}>
                  ❌ REJECT
                </div>
                <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0 }}>
                  Critical rules fail (1, 2, 3, 9, 10) → Hard rejection, transaction blocked permanently
                </p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#422006', borderRadius: '6px', border: '2px solid #f59e0b' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f59e0b', marginBottom: '0.5rem' }}>
                  🔍 REVIEW
                </div>
                <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0 }}>
                  Soft rules fail (4, 6, 7) → Manual review required, transaction held for fraud analysis
                </p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#431407', borderRadius: '6px', border: '2px solid #f97316' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f97316', marginBottom: '0.5rem' }}>
                  🚫 DECLINE
                </div>
                <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0 }}>
                  Business rules fail (5, 8) → Soft decline, transaction can be retried after resolving issues
                </p>
              </div>
            </div>
          </div>

          {/* Example Validation Scenario */}
          <div style={{ padding: '1.5rem', backgroundColor: '#3b0764', borderRadius: '8px', borderLeft: '4px solid #a855f7' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
              📝 Example Validation Scenario
            </h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: '#374151',
                  borderRadius: '6px',
                  fontWeight: '600',
                  color: 'white'
                }}>
                  VCN:
                </div>
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: '#374151',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#3b82f6'
                }}>
                  4532015112830366
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: '#374151',
                  borderRadius: '6px',
                  fontWeight: '600',
                  color: 'white'
                }}>
                  Transaction ID:
                </div>
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: '#374151',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#10b981'
                }}>
                  52001267
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1rem' }}>
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: '#374151',
                  borderRadius: '6px',
                  fontWeight: '600',
                  color: 'white'
                }}>
                  Amount:
                </div>
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: '#374151',
                  borderRadius: '6px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#10b981'
                }}>
                  $150.00
                </div>
              </div>
            </div>

            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', marginBottom: '0.75rem' }}>
              Validation Steps:
            </h4>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#374151', borderRadius: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ color: 'white' }}>Rule 1 - Luhn Check:</strong>
                  <span style={{ color: '#9ca3af', marginLeft: '0.5rem' }}>Checksum valid (digit 6 is correct)</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#374151', borderRadius: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ color: 'white' }}>Rule 2 - IIN Range:</strong>
                  <span style={{ color: '#9ca3af', marginLeft: '0.5rem' }}>453201 is in valid Capital One range (400000-499999)</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#374151', borderRadius: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ color: 'white' }}>Rule 3 - Card Status:</strong>
                  <span style={{ color: '#9ca3af', marginLeft: '0.5rem' }}>VCN is active (expires 12/2026)</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#374151', borderRadius: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ color: 'white' }}>Rule 4 - Velocity:</strong>
                  <span style={{ color: '#9ca3af', marginLeft: '0.5rem' }}>Only 2 transactions in last hour (limit: 5)</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#374151', borderRadius: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ color: 'white' }}>Rule 5 - Spend Limit:</strong>
                  <span style={{ color: '#9ca3af', marginLeft: '0.5rem' }}>Available credit: $500, Amount: $150 (OK)</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#374151', borderRadius: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ color: 'white' }}>Rule 6 - MCC Whitelist:</strong>
                  <span style={{ color: '#9ca3af', marginLeft: '0.5rem' }}>MCC 52 (Clothing Stores) is allowed for this VCN</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#374151', borderRadius: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ color: 'white' }}>Rule 7 - Geographic:</strong>
                  <span style={{ color: '#9ca3af', marginLeft: '0.5rem' }}>Merchant in USA (allowed region)</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#374151', borderRadius: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ color: 'white' }}>Rule 8 - Sequence:</strong>
                  <span style={{ color: '#9ca3af', marginLeft: '0.5rem' }}>0012 &gt; last sequence 0011 (valid increment)</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#374151', borderRadius: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ color: 'white' }}>Rule 9 - Control Digits:</strong>
                  <span style={{ color: '#9ca3af', marginLeft: '0.5rem' }}>(5+2+0+0+1+2) mod 97 = 10, expected: 67 ❌ WAIT... let me recalculate: (52+00+12) = 64 mod 97 = 64, but we have 67... This would fail!</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#450a0a', borderRadius: '6px', border: '2px solid #ef4444' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ef4444', marginBottom: '0.5rem' }}>
                ❌ Decision: REJECT
              </div>
              <p style={{ color: '#9ca3af', fontSize: '0.95rem', margin: 0 }}>
                <strong style={{ color: 'white' }}>Reason:</strong> Control digit validation failed (Rule 9). Expected 64, received 67.
                This is a critical rule failure indicating potential data corruption or fraudulent modification of the transaction ID.
              </p>
            </div>

            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#064e3b', borderRadius: '6px', fontSize: '0.9rem', color: '#34d399', fontStyle: 'italic' }}>
              💡 <strong>Note:</strong> If the control digits were correct (64 instead of 67), all 10 rules would pass,
              and the transaction would receive an <strong>ACCEPT</strong> decision, processing the $150 charge immediately.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VirtualNumbers
