import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex tems-center justify-center ml-10 h-screen">
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-8xl font-bold mb-2">
          Calorie<span className="text-[#3da54b]">Pal</span>
        </h1>
          <p className="mb-7 text-2xl">Start tracking your calorie consumption today!</p>
      </div>
  </main>
  )
}