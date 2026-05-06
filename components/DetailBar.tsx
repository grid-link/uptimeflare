import { MonitorState, MonitorTarget } from '@/types/config'
import { getColor } from '@/util/color'
import { Box, Tooltip, Modal } from '@mantine/core'
import { useResizeObserver } from '@mantine/hooks'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
const moment = require('moment')
require('moment-precise-range-plugin')

export default function DetailBar({
  monitor,
  state,
}: {
  monitor: MonitorTarget
  state: MonitorState
}) {
  const { t } = useTranslation('common')
  const [barRef, barRect] = useResizeObserver()
  const [modalOpened, setModalOpened] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modelContent, setModelContent] = useState(<div />)

  const overlapLen = (x1: number, x2: number, y1: number, y2: number) => {
    return Math.max(0, Math.min(x2, y2) - Math.max(x1, y1))
  }

  const uptimePercentBars = []

  const currentTime = Math.round(Date.now() / 1000)
  const montiorStartTime = state.incident[monitor.id][0].start[0]

  // Each bar is 1 hour wide; 90 bars = ~3.75 days of recent history. Aligns to
  // the top of the current hour so the rightmost bar is "now".
  const HOUR_SECONDS = 3600
  const currentHourStart =
    Math.floor(Math.round(Date.now() / 1000) / HOUR_SECONDS) * HOUR_SECONDS

  for (let i = 89; i >= 0; i--) {
    const bucketStart = currentHourStart - i * HOUR_SECONDS
    const bucketEnd = bucketStart + HOUR_SECONDS

    const bucketMonitorTime = overlapLen(bucketStart, bucketEnd, montiorStartTime, currentTime)
    let bucketDownTime = 0

    let incidentReasons: string[] = []

    for (let incident of state.incident[monitor.id]) {
      const incidentStart = incident.start[0]
      const incidentEnd = incident.end ?? currentTime

      const overlap = overlapLen(bucketStart, bucketEnd, incidentStart, incidentEnd)
      bucketDownTime += overlap

      // Incident history for the bucket
      if (overlap > 0) {
        for (let i = 0; i < incident.error.length; i++) {
          let partStart = incident.start[i]
          let partEnd =
            i === incident.error.length - 1 ? incident.end ?? currentTime : incident.start[i + 1]
          partStart = Math.max(partStart, bucketStart)
          partEnd = Math.min(partEnd, bucketEnd)

          if (overlapLen(bucketStart, bucketEnd, partStart, partEnd) > 0) {
            const startStr = new Date(partStart * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
            const endStr = new Date(partEnd * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
            incidentReasons.push(`[${startStr}-${endStr}] ${incident.error[i]}`)
          }
        }
      }
    }

    const bucketLabel = new Date(bucketStart * 1000).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    const bucketPercent = (
      ((bucketMonitorTime - bucketDownTime) / bucketMonitorTime) *
      100
    ).toPrecision(4)

    uptimePercentBars.push(
      <Tooltip
        multiline
        key={i}
        events={{ hover: true, focus: false, touch: true }}
        label={
          Number.isNaN(Number(bucketPercent)) ? (
            t('No Data')
          ) : (
            <>
              <div>
                {t('percent at date', {
                  percent: bucketPercent,
                  date: bucketLabel,
                })}
              </div>
              {bucketDownTime > 0 && (
                <div>
                  {t('Down for', {
                    duration: moment.preciseDiff(moment(0), moment(bucketDownTime * 1000)),
                  })}
                </div>
              )}
            </>
          )
        }
      >
        <div
          style={{
            height: '20px',
            width: '7px',
            background: getColor(bucketPercent, false),
            borderRadius: '2px',
            marginLeft: '1px',
            marginRight: '1px',
          }}
          onClick={() => {
            if (bucketDownTime > 0) {
              setModalTitle(
                t('incidents at', {
                  name: monitor.name,
                  date: bucketLabel,
                })
              )
              setModelContent(
                <>
                  {incidentReasons.map((reason, index) => (
                    <div key={index}>{reason}</div>
                  ))}
                </>
              )
              setModalOpened(true)
            }
          }}
        />
      </Tooltip>
    )
  }

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={modalTitle}
        size={'40em'}
      >
        {modelContent}
      </Modal>
      <Box
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          marginTop: '10px',
          marginBottom: '5px',
        }}
        visibleFrom="540"
        ref={barRef}
      >
        {uptimePercentBars.slice(Math.floor(Math.max(9 * 90 - barRect.width, 0) / 9), 90)}
      </Box>
    </>
  )
}
