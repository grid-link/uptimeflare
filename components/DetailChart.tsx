import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  TimeScale,
} from 'chart.js'
import 'chartjs-adapter-moment'
import { MonitorState, MonitorTarget } from '@/types/config'
import { codeToCountry } from '@/util/iata'
import { useTranslation } from 'react-i18next'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  TimeScale
)

export default function DetailChart({
  monitor,
  state,
}: {
  monitor: MonitorTarget
  state: MonitorState
}) {
  const { t } = useTranslation('common')

  // Bucket raw probe samples (one per minute) into 5-minute windows. Each
  // bucket plots the average latency of the probes in it; the most-frequent
  // probe location for that bucket is shown in the tooltip. Smooths the line
  // from per-minute jitter and reduces tooltip noise to ~12 points/hour.
  const BUCKET_SECONDS = 300
  type RawSample = { time: number; ping: number; loc: string }
  const buckets = new Map<number, RawSample[]>()
  for (const sample of state.latency[monitor.id] as RawSample[]) {
    const bucketKey = Math.floor(sample.time / BUCKET_SECONDS) * BUCKET_SECONDS
    let bucket = buckets.get(bucketKey)
    if (!bucket) {
      bucket = []
      buckets.set(bucketKey, bucket)
    }
    bucket.push(sample)
  }

  const latencyData = Array.from(buckets.entries())
    .sort(([a], [b]) => a - b)
    .map(([bucketStart, samples]) => {
      const avgPing = Math.round(
        samples.reduce((acc, s) => acc + s.ping, 0) / samples.length
      )
      const locCounts = new Map<string, number>()
      for (const s of samples) locCounts.set(s.loc, (locCounts.get(s.loc) ?? 0) + 1)
      const dominantLoc = Array.from(locCounts.entries()).sort((a, b) => b[1] - a[1])[0][0]
      return {
        x: bucketStart * 1000,
        y: avgPing,
        loc: dominantLoc,
      }
    })

  let data = {
    datasets: [
      {
        data: latencyData,
        borderColor: 'rgb(112, 119, 140)',
        borderWidth: 2,
        radius: 0,
        cubicInterpolationMode: 'monotone' as const,
        tension: 0.4,
      },
    ],
  }

  let options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    animation: {
      duration: 0,
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (item: any) => {
            if (item.parsed.y) {
              return `${item.parsed.y}ms (${codeToCountry(item.raw.loc)})`
            }
          },
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: t('Response times'),
        align: 'start' as const,
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        ticks: {
          source: 'auto' as const,
          maxRotation: 0,
          autoSkip: true,
        },
      },
    },
  }

  return (
    <div style={{ height: '150px' }}>
      <Line options={options} data={data} />
    </div>
  )
}
