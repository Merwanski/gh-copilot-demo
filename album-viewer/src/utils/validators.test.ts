import { describe, expect, it } from 'vitest'
import { validateDate } from './validators'

describe('validateDate', () => {
  it('returns a Date for a valid French date', () => {
    const result = validateDate('26/05/2026')

    expect(result).toBeInstanceOf(Date)
    expect(result?.getFullYear()).toBe(2026)
    expect(result?.getMonth()).toBe(4)
    expect(result?.getDate()).toBe(26)
  })

  it('accepts surrounding whitespace', () => {
    const result = validateDate('  01/01/2026  ')

    expect(result).toBeInstanceOf(Date)
    expect(result?.getDate()).toBe(1)
  })

  it('returns null for invalid format', () => {
    expect(validateDate('2026-05-26')).toBeNull()
    expect(validateDate('26-05-2026')).toBeNull()
  })

  it('returns null for impossible dates', () => {
    expect(validateDate('31/04/2026')).toBeNull()
    expect(validateDate('29/02/2023')).toBeNull()
  })

  it('handles leap year correctly', () => {
    const result = validateDate('29/02/2024')

    expect(result).toBeInstanceOf(Date)
    expect(result?.getDate()).toBe(29)
  })
})
