'use client'

import { TrendingUp } from 'lucide-react'
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
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

import { useMemo } from 'react'

interface CrescimentoData {
  month: string
  crescimento: number 
}

interface ChartCrescimentoProps {
  data: CrescimentoData[]
  year: string
}

export default function ChartCrescimento({ data, year }: ChartCrescimentoProps) {
  const currentMonthName = new Date().toLocaleString('pt-BR', { month: 'long' }).toLowerCase()
  const labelAno = year === 'all' ? 'Todos os anos' : year

  const processedData = useMemo(() => {
    const currentMonthIndex = data.findIndex(item =>
      item.month.toLowerCase() === currentMonthName
    )

    return data.map((item, index) => {
      const isFutureMonth = index > currentMonthIndex
      const crescimentoVendas = isFutureMonth ? null : item.crescimento
      
      const crescimentoSobreMeta = isFutureMonth ? null : 
        ((1 + item.crescimento/100) / 1.05 - 1) * 100

      return {
        month: item.month,
        crescimento: crescimentoVendas,
        sobreMeta:crescimentoSobreMeta !== null 
        ? parseFloat(crescimentoSobreMeta.toFixed(2)) 
        : null
      }
    })
  }, [data, currentMonthName, year])

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800">
            Crescimento Mensal (%)
          </CardTitle>
          <TrendingUp className="ml-auto w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedData}>
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
                unit="%"
              />
              <Tooltip
                formatter={(value: any, name: any) => {
                  if (value === null) return ['-', name]
                  return [`${Number(value).toFixed(2)}%`, name]
                }}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="crescimento"
                stroke="#10b981"
                strokeWidth={3}
                name="Crescimento x Vendas"
                dot={{ r: 4 }}
                connectNulls={true}
              />
              <Line
                type="monotone"
                dataKey="sobreMeta"
                stroke="#f91616"
                strokeWidth={3}
                name="Crescimento x Meta"
                dot={{ r: 4 }}
                connectNulls={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}