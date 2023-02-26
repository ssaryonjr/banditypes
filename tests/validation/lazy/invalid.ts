import { lazy, string } from '../../../src/index.js'

export const Struct = lazy(() => string())

export const data = 3

export const failures = [
  {
    value: 3,
    type: 'string',
    refinement: undefined,
    path: [],
    branch: [data],
  },
]
