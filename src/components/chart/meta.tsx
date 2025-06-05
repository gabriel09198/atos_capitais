'use client'

import { DollarSign } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts'

interface ChartData {
  month: string
  atual: number
  meta: number
}

interface ChartMetasProps {
  data: ChartData[]
  year: string
}

export default function ChartMetas({ data, year }: ChartMetasProps) {
  const labelAno = year === 'all' ? 'Todos os anos' : year

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800">
            Comparativo com Metas
          </CardTitle>
          <DollarSign className="ml-auto w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                interval={0}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: any, name: string) => [
                  `R$ ${Number(value).toLocaleString('pt-BR')}`,
                  name === 'atual' ? `Valor (${labelAno})` : 'Meta (105%)'
                ]}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="atual"
                stroke="#2563eb"
                strokeWidth={3}
                name={`Valor (${labelAno})`}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="meta"
                stroke="#f91616"
                strokeWidth={3}
                name="Meta (105%)"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
