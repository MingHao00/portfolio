/**
 * Join class names, omitting falsey entries.
 */
export function cn(...inputs: Array<string | false | undefined>): string {
  return inputs.filter(Boolean).join(' ')
}
