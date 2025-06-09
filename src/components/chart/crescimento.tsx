'use client'

import { TrendingUp } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../ui/card'

import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import { useMemo } from 'react'

interface CrescimentoData {
  month: string
  crescimento: number 
}

interface ChartCrescimentoProps {
  data: CrescimentoData[]
}

export default function ChartCrescimento({ data }: ChartCrescimentoProps) {
  const currentMonthName = new Date().toLocaleString('pt-BR', { month: 'long' }).toLowerCase()

  const processedData = useMemo(() => {
    const currentMonthIndex = data.findIndex(item =>
      item.month.toLowerCase() === currentMonthName
    )

    if (currentMonthIndex === -1) return data

    return data.map((item, index) => ({
      ...item,
      crescimento: index > currentMonthIndex ? 0 : item.crescimento
    }))
  }, [data, currentMonthName])

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
            <ComposedChart data={processedData}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                unit="%"
              />
              <Tooltip
                formatter={(value: any, name: any) => [`${value.toFixed(2)}%`, 'Crescimento Vendas']}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="crescimento"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4 }}
                name="Crescimento Vendas"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
