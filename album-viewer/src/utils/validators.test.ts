import { describe, expect, it } from "vitest"
import { validateDate, validateGuid, validateIPV6 } from "./validators"

describe('validateDate', () => {
  it('returns a Date for a valid Belgian date', () => {
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
    expect(validateDate('1/1/2026')).toBeNull()
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

describe('validateGuid', () => {
  it('returns true for a valid GUID', () => {
    expect(validateGuid('550e8400-e29b-41d4-a716-446655440000')).toBe(true)
  })

  it('returns true for a valid GUID with braces', () => {
    expect(validateGuid('{550e8400-e29b-41d4-a716-446655440000}')).toBe(true)
  })

  it('returns false for an invalid GUID', () => {
    expect(validateGuid('550e8400e29b41d4a716446655440000')).toBe(false)
    expect(validateGuid('invalid-guid')).toBe(false)
  })
})

describe('validateIPV6', () => {
  it('returns true for full and compressed IPv6', () => {
    expect(validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true)
    expect(validateIPV6('2001:db8::1')).toBe(true)
    expect(validateIPV6('::1')).toBe(true)
  })

  it('returns false for invalid IPv6', () => {
    expect(validateIPV6('2001:db8:::1')).toBe(false)
    expect(validateIPV6('192.168.1.1')).toBe(false)
    expect(validateIPV6('not-an-ip')).toBe(false)
  })
})
