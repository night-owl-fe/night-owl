// @flow
function toStringPrimitives (value: number | string | boolean) {
  return String(value)
}

toStringPrimitives('primitive')

toStringPrimitives(123)

toStringPrimitives(false)

// toStringPrimitives([1])