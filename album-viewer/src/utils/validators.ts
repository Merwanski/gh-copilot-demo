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