import debug from 'debug'

import {
  Pantograph
} from 'shinkansen-pantograph'

const log = debug('zashiki-routing-middleware')

log('`zashiki-routing-middleware` is awake')

export default (store) => {
  const {
    OMEGA: {
      ROUTE: OMEGA_ROUTE
    },
    EMBARK: {
      ROUTE: EMBARK_ROUTE
    },
    DEBARK: {
      ROUTE: DEBARK_ROUTE
    },
    ALPHA: {
      ROUTE: ALPHA_ROUTE
    }
  } = Pantograph

  return (next) => (action) => {
    const {
      type
    } = action

    if (
      type === OMEGA_ROUTE ||
      type === EMBARK_ROUTE ||
      type === DEBARK_ROUTE ||
      type === ALPHA_ROUTE
    ) {
      const {
        history
      } = action

      if (history) {
        Pantograph.graphite({
          history: {
            push (location) {
              return history.push(location)
            },
            getCurrentLocation () {
              return history.location
            }
          },
          state: store.getState(),
          action
        })
      }
    }

    return next(action)
  }
}
