/**
 * Counter-based body scroll lock.
 * Tracks how many overlays have requested the lock - only restores scroll
 * when the last overlay releases it, preventing a race where one overlay's
 * cleanup unlocks the body while a second overlay is still open.
 */
let lockCount = 0

export function lockBodyScroll(): void {
  lockCount++
  if (lockCount === 1) {
    document.body.style.overflow = 'hidden'
  }
}

export function unlockBodyScroll(): void {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.body.style.overflow = ''
  }
}
