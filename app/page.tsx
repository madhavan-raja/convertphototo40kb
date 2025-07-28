import { ImageCompressor } from "@/components/image-compressor";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
              Convert Photo to 40 KB
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Thank you Biswa, very cool. No premium subscriptions required.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              This website was <span className="line-through">built</span> vibe-coded in an hour with Next.js and some vodka. I would really appreciate it if you could check out my music, which unlike this website, was only made with some vodka: <Link className="text-blue-600 dark:text-blue-400 underline" target="_blank" href={"https://youtu.be/M3rhZJRd0eQ"}>Cute Fluffy Kitten - UwU UwU Bunbuns</Link>
            </p>
          </div>
          <ImageCompressor />
        </div>
      </div>
    </main >
  );
}
