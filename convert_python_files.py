#!/usr/bin/env python3
"""
Script to batch convert Python topic files to match CorePython format
"""
import os
import re

# Files to update (excluding already completed ones)
files_to_update = [
    'IndexSlicing.jsx',
    'ListComprehension.jsx',
    'LambdaFunctions.jsx',
    'PythonAdvanced.jsx',
    'BisectFunctions.jsx',
    'PythonPitfalls.jsx',
    'PythonStringMethods.jsx',
    'PythonTuples.jsx',
    'PythonDictOperations.jsx',
    'PythonSetOperations.jsx',
    'PythonMapFunctions.jsx',
    'PythonRegex.jsx',
    'Itertools.jsx',
    'CollectionsModule.jsx',
    'SortingFunctions.jsx',
    'LeetCodePatterns.jsx',
    'PythonHeapsReference.jsx',
]

base_path = '/mnt/c/Users/micha/Documents/dev/oct/my-app/src/pages/python/'

def get_header_replacement():
    """Return the new header styling"""
    return '''  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={onBack}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← Back to Python Topics
            </button>'''

print(f"Files to update: {len(files_to_update)}")
print("Run this script to see conversion patterns")
