import { useState } from "react";
import jsQR from "jsqr";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, ScanLine } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const CodeScanner = () => {
  const [image, setImage] = useState<string | null>(null);
  const [results, setResults] = useState<Array<{ type: string; data: string }>>([]);
  const [scanning, setScanning] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageData = event.target?.result as string;
      setImage(imageData);
      setResults([]);
      await scanImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const scanImage = async (imageData: string) => {
    setScanning(true);
    const foundCodes: Array<{ type: string; data: string }> = [];

    try {
      // Scan for QR codes
      const img = new Image();
      img.src = imageData;
      await new Promise((resolve) => (img.onload = resolve));

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      const imageDataObj = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (imageDataObj) {
        const qrCode = jsQR(imageDataObj.data, imageDataObj.width, imageDataObj.height);
        if (qrCode) {
          foundCodes.push({ type: "QR Code", data: qrCode.data });
        }
      }

      // Scan for barcodes
      try {
        const codeReader = new BrowserMultiFormatReader();
        const result = await codeReader.decodeFromImageUrl(imageData);
        if (result) {
          foundCodes.push({
            type: result.getBarcodeFormat().toString(),
            data: result.getText(),
          });
        }
      } catch (error) {
        // No barcode found
        console.log("No barcode detected");
      }

      if (foundCodes.length > 0) {
        setResults(foundCodes);
        toast({
          title: "✅ Codes Found",
          description: `Detected ${foundCodes.length} code(s)`,
        });
      } else {
        toast({
          title: "❌ No Codes Found",
          description: "No QR codes or barcodes detected in this image",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Scanning error:", error);
      toast({
        title: "❌ Scan Error",
        description: "Failed to scan the image",
        variant: "destructive",
      });
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="image-upload" className="cursor-pointer">
          <div className="border-2 border-dashed border-border rounded-lg p-8 hover:border-primary hover:bg-secondary/50 transition-colors text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm font-medium mb-1">Upload an image</p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG up to 10MB
            </p>
          </div>
        </Label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {image && (
        <Card className="p-6 space-y-4 bg-card shadow-lg">
          <div className="bg-muted/30 p-4 rounded-lg">
            <img
              src={image}
              alt="Uploaded"
              className="max-w-full h-auto mx-auto rounded"
              style={{ maxHeight: "400px" }}
            />
          </div>

          {scanning && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <ScanLine className="h-5 w-5 animate-pulse" />
              <span>Scanning image...</span>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Detected Codes:</h3>
              {results.map((result, index) => (
                <Card key={index} className="p-4 bg-secondary/50">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {result.type}
                  </p>
                  <p className="font-mono text-sm break-all">{result.data}</p>
                </Card>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
