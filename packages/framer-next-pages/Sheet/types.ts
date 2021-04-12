import { MotionValue, AnimationControls } from 'framer-motion'

export type SheetVariant = 'top' | 'bottom' | 'left' | 'right'
export type SnapPoint = 'open' | 'closed' | number

export type SheetContext = {
  variant: SheetVariant
  /** `y`/ `x`-position of the Sheet */
  drag: MotionValue<number>
  /** `height`/ `width` of the SheetContainer */
  size: MotionValue<number>
  /** `maxHeight`/ `maxWidth` determined by the SheetContainer */
  maxSize: MotionValue<number>

  containerRef: React.RefObject<HTMLDivElement>

  /**
   * Animate to a snapPoint:
   *
   * ```ts
   * const snapPointIndex = 0
   * controls.start('snapPoint${snapPointIndex}')
   * ```
   */
  controls: AnimationControls

  /**
   * First entry is the opening position
   *
   * Default: `['top', 'bottom']` (only the most top position allowed)
   *
   * - `top`: the top most position
   * - `bottom`: the most bottom position
   * - Positive integer: pixels measured from the most bottom position of the sheet.
   * - Negative integer: pixels measured form the most top position of the sheet.
   */
  snapPoints: SnapPoint[]
  /** @private */
  onSnap?: (snapPoint: SnapPoint, index: number) => void
}
