/**
 * Validates a French date string (jj/mm/aaaa) and returns a Date when valid.
 */
export function validateDate(input: string): Date | null {
  const match = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(input)
  if (!match) {
    return null
  }

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])

  if (month < 1 || month > 12 || day < 1) {
    return null
  }

  const parsedDate = new Date(year, month - 1, day)

  // Ensures invalid dates such as 31/04/2026 or 29/02/2023 are rejected.
  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null
  }

  return parsedDate
}

/**
 * Validates the canonical format of a GUID string.
 */
export function validateGuid(input: string): boolean {
  const guidRegex = /^\{?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}?$/
  return guidRegex.test(input.trim())
}

/**
 * Validates the format of an IPv6 address string.
 */
export function validateIPV6(input: string): boolean {
  const value = input.trim()

  // Covers full and compressed IPv6 notations.
  const ipv6Regex =
    /^(?:(([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){1,7}:)|(([0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,5}(:[0-9A-Fa-f]{1,4}){1,2})|(([0-9A-Fa-f]{1,4}:){1,4}(:[0-9A-Fa-f]{1,4}){1,3})|(([0-9A-Fa-f]{1,4}:){1,3}(:[0-9A-Fa-f]{1,4}){1,4})|(([0-9A-Fa-f]{1,4}:){1,2}(:[0-9A-Fa-f]{1,4}){1,5})|([0-9A-Fa-f]{1,4}:((:[0-9A-Fa-f]{1,4}){1,6}))|(:(:[0-9A-Fa-f]{1,4}){1,7}|:))$/

  return ipv6Regex.test(value)
}