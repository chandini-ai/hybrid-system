import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { QrCode, Barcode, ScanLine } from "lucide-react";
import { QRGenerator } from "@/components/QRGenerator";
import { BarcodeGenerator } from "@/components/BarcodeGenerator";
import { CodeScanner } from "@/components/CodeScanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-4xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block p-3 bg-gradient-to-r from-primary to-accent rounded-2xl mb-4">
            <QrCode className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            QR & Barcode Studio
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate, scan, and manage QR codes and barcodes with ease
          </p>
        </div>

        {/* Main Content */}
        <Card className="p-6 md:p-8 shadow-xl">
          <Tabs defaultValue="qr" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="qr" className="flex items-center gap-2 py-3">
                <QrCode className="h-4 w-4" />
                <span className="hidden sm:inline">QR Code</span>
              </TabsTrigger>
              <TabsTrigger value="barcode" className="flex items-center gap-2 py-3">
                <Barcode className="h-4 w-4" />
                <span className="hidden sm:inline">Barcode</span>
              </TabsTrigger>
              <TabsTrigger value="scan" className="flex items-center gap-2 py-3">
                <ScanLine className="h-4 w-4" />
                <span className="hidden sm:inline">Scanner</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="qr" className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Generate QR Code</h2>
                <p className="text-sm text-muted-foreground">
                  Create custom QR codes for URLs, text, or any data
                </p>
              </div>
              <QRGenerator />
            </TabsContent>

            <TabsContent value="barcode" className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Generate Barcode</h2>
                <p className="text-sm text-muted-foreground">
                  Create barcodes in various formats for products and inventory
                </p>
              </div>
              <BarcodeGenerator />
            </TabsContent>

            <TabsContent value="scan" className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Scan Codes</h2>
                <p className="text-sm text-muted-foreground">
                  Upload an image to detect and decode QR codes or barcodes
                </p>
              </div>
              <CodeScanner />
            </TabsContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Built with React • All processing happens in your browser</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
