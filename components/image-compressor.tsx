"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import imageCompression from "browser-image-compression"
import { UploadCloud, ImageIcon, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function ImageCompressor() {
    const [originalImage, setOriginalImage] = useState<File | null>(null)
    const [originalPreview, setOriginalPreview] = useState<string | null>(null)
    const [compressedImage, setCompressedImage] = useState<File | null>(null)
    const [compressedPreview, setCompressedPreview] = useState<string | null>(null)
    const [isCompressing, setIsCompressing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState<string | null>(null)

    const targetSizeKb = 40
    const targetSizeBytes = targetSizeKb * 1024

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return

        const file = acceptedFiles[0]
        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file")
            return
        }

        setError(null)
        setOriginalImage(file)
        setCompressedImage(null)
        setCompressedPreview(null)
        setProgress(0)

        // Create preview for original image
        const reader = new FileReader()
        reader.onload = () => {
            setOriginalPreview(reader.result as string)
        }
        reader.readAsDataURL(file)

        // Start compression automatically
        await compressImage(file)
    }, [])

    const compressImage = async (file: File) => {
        setIsCompressing(true)
        setProgress(10)

        try {
            // Initial compression options
            const options = {
                maxSizeMB: targetSizeBytes / (1024 * 1024),
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                onProgress: (p: number) => setProgress(Math.min(10 + Math.round(p * 80), 90)),
            }

            // Compress the image
            const compressedFile = await imageCompression(file, options)
            setProgress(95)

            // Create preview for compressed image
            const reader = new FileReader()
            reader.onload = () => {
                setCompressedPreview(reader.result as string)
                setProgress(100)
            }
            reader.readAsDataURL(compressedFile)

            setCompressedImage(compressedFile)

            // Check if we hit the target size
            const compressedSizeKb = compressedFile.size / 1024
            if (compressedSizeKb > targetSizeKb) {
                setError(
                    `Compressed to ${compressedSizeKb.toFixed(1)}kb. For better results, try a smaller image or one with less detail.`,
                )
            }
        } catch (err) {
            setError("Error compressing image. Please try again.")
            console.error(err)
        } finally {
            setIsCompressing(false)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
        },
        multiple: false,
        disabled: isCompressing,
    })

    const downloadCompressedImage = () => {
        if (!compressedImage) return

        const link = document.createElement("a")
        link.href = URL.createObjectURL(compressedImage)

        // Create filename with size info
        const originalExt = originalImage?.name.split(".").pop() || "jpg"
        const compressedSizeKb = (compressedImage.size / 1024).toFixed(1)
        const filename = `compressed-${compressedSizeKb}kb.${originalExt}`

        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const formatFileSize = (bytes: number | undefined) => {
        if (!bytes) return "0 KB"
        if (bytes < 1024) return `${bytes} B`
        return `${(bytes / 1024).toFixed(1)} KB`
    }

    return (
        <div className="space-y-6">
            {/* Upload Area */}
            <Card className={`border-2 ${isDragActive ? "border-primary border-dashed" : "border-border"}`}>
                <CardContent className="p-6">
                    <div
                        {...getRootProps()}
                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg p-8 text-center"
                    >
                        <input {...getInputProps()} />
                        <div className="mb-4 rounded-full bg-primary/10 p-3">
                            <UploadCloud className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium">
                            {isDragActive ? "Drop the image here" : "Drag & drop your image here"}
                        </h3>
                        <p className="mb-4 text-sm text-muted-foreground">or click to browse (JPG, PNG, WebP, GIF)</p>
                        <Button disabled={isCompressing}>Select Image</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Processing Status */}
            {isCompressing && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Compressing image...</span>
                        <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            )}

            {/* Error Message */}
            {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

            {/* Results */}
            {originalImage && (
                <div className="space-y-6">
                    <Separator />

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Original Image */}
                        <div className="space-y-2">
                            <h3 className="font-medium">Original</h3>
                            <Card className="overflow-hidden">
                                <div className="aspect-square bg-slate-100 dark:bg-slate-800">
                                    {originalPreview && (
                                        <img
                                            src={originalPreview || "/placeholder.svg"}
                                            alt="Original"
                                            className="h-full w-full object-contain"
                                        />
                                    )}
                                </div>
                                <div className="flex items-center justify-between p-3">
                                    <div className="flex items-center gap-2">
                                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">{originalImage.name}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{formatFileSize(originalImage.size)}</span>
                                </div>
                            </Card>
                        </div>

                        {/* Compressed Image */}
                        <div className="space-y-2">
                            <h3 className="font-medium">Compressed (Target: {targetSizeKb}KB)</h3>
                            <Card className="overflow-hidden">
                                <div className="aspect-square bg-slate-100 dark:bg-slate-800">
                                    {compressedPreview ? (
                                        <img
                                            src={compressedPreview || "/placeholder.svg"}
                                            alt="Compressed"
                                            className="h-full w-full object-contain"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-muted-foreground">
                                            {isCompressing ? <RefreshCw className="h-8 w-8 animate-spin" /> : <span>Processing...</span>}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-between p-3">
                                    <div className="flex items-center gap-2">
                                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Compressed</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{formatFileSize(compressedImage?.size)}</span>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Download Button */}
                    {compressedImage && (
                        <div className="flex justify-center">
                            <Button onClick={downloadCompressedImage} className="gap-2">
                                <Download className="h-4 w-4" />
                                Download Compressed Image
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
