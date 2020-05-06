import { useCallback } from 'react'
import { createSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'
import { sendCustomEvent } from '../redux/actions'
import { useAppContext } from './context'

export const getEventsState = store => store.events
export const getLastEvent = createSelector(
  [getEventsState],
  events => events.lastEvent
)

export const useLastEvent = () => useSelector(getLastEvent)
export const useSendEvent = () => {
  const {appId} = useAppContext()
  const dispatch = useDispatch()
  return useCallback(
    (deltaTime, msg) => dispatch(sendCustomEvent(deltaTime, msg, appId)),
    [dispatch]
  )
}