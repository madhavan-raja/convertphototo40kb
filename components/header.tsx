"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "./ui/button"
import { Cat, Github, Linkedin, Music } from "lucide-react"
import Link from "next/link"
import { Separator } from "./ui/separator"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container max-w-4xl mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-2">
                    <Link href="/" className="cursor-pointer">
                        <div className="flex flex-col">
                            <span className="text-lg font-bold tracking-tight">Convert Photo to 40 KB</span>
                            <span className="text-xs text-muted-foreground hidden sm:block">Image Compression Tool</span>
                        </div>
                    </Link>
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="https://www.madhavanraja.com" target="_blank" className="cursor-pointer">
                            <Cat />
                        </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                        <Link href="https://www.linkedin.com/in/madhavan-raja" target="_blank" className="cursor-pointer">
                            <Linkedin />
                        </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                        <Link href="https://www.github.com/madhavan-raja" target="_blank" className="cursor-pointer">
                            <Github />
                        </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                        <Link href="https://linktr.ee/cutefluffykitten" target="_blank" className="cursor-pointer">
                            <Music />
                        </Link>
                    </Button>
                    <Separator orientation="vertical" />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
