import { ImageCompressor } from "@/components/image-compressor"
import { Header } from "@/components/header"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container max-w-4xl mx-auto px-4 py-12 md:py-24 flex-1">
        <div className="mb-6 text-center">
          <p className="text-lg font-bold text-foreground">
            Thank you <Link className="underline" target="_blank" href={"https://youtu.be/PK_zuAuI9x0?t=598"}>Biswa</Link>, very cool. ✨ No ads and no premium membership required ✨.
          </p>
          <p className="text-sm text-muted-foreground">
            This website was <span className="line-through">built</span> vibe-coded in an hour with Next.js and some vodka. I would really appreciate it if you could check out my music, which unlike this website, was only made with some vodka: <Link className="text-blue-600 dark:text-blue-400 underline" target="_blank" href={"https://youtu.be/M3rhZJRd0eQ"}>Cute Fluffy Kitten - UwU UwU Bunbuns</Link>
          </p>
        </div>

        <ImageCompressor />
      </main>

      <footer className="border-t bg-background/95 backdrop-blur">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Madhavan Raja. Built with ❤️, Next.js, and Vodka.</p>
            <p className="mt-2">Your images are processed locally and never uploaded to the internet (I can't afford server storage). Also, special thanks to the Indian Government for not supporting pictures with more than 40 KB, which led to this website being a necessity.</p>
          </div>
        </div>
      </footer >
    </div >
  )
}
