import { Loader2 } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      <p className="mt-4 text-gray-700 text-sm">Carregando dados...</p>
    </div>
  )
}