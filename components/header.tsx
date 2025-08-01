"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "./ui/button"
import { Cat, Github, Linkedin, Music } from "lucide-react"
import Link from "next/link"
import { Separator } from "./ui/separator"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-2">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold tracking-tight">Convert Photo to 40 KB</span>
                        <span className="text-xs text-muted-foreground hidden sm:block">Image Compression Tool</span>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Link href="https://www.madhavanraja.com" target="_blank" className="cursor-pointer">
                        <Button variant="outline" size="icon">
                            <Cat />
                        </Button>
                    </Link>
                    <Link href="https://www.linkedin.com/in/madhavan-raja" target="_blank" className="cursor-pointer">
                        <Button variant="outline" size="icon">
                            <Linkedin />
                        </Button>
                    </Link>
                    <Link href="https://www.github.com/madhavan-raja" target="_blank" className="cursor-pointer">
                        <Button variant="outline" size="icon">
                            <Github />
                        </Button>
                    </Link>
                    <Link href="https://linktr.ee/cutefluffykitten" target="_blank" className="cursor-pointer">
                        <Button variant="outline" size="icon">
                            <Music />
                        </Button>
                    </Link>
                    <Separator orientation="vertical" />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
