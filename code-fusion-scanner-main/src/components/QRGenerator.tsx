import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const QRGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);

  const downloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "qrcode.png";
          link.click();
          URL.revokeObjectURL(url);
          toast({
            title: "✅ Success",
            description: "QR code downloaded successfully!",
          });
        }
      });
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="qr-text">Text or URL</Label>
          <Input
            id="qr-text"
            placeholder="Enter text or URL to encode"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="qr-size">Size: {size}px</Label>
          <Input
            id="qr-size"
            type="range"
            min="128"
            max="512"
            step="64"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </div>
      </div>

      {text && (
        <Card className="p-6 flex flex-col items-center gap-4 bg-card shadow-lg">
          <div className="bg-white p-4 rounded-lg">
            <QRCodeSVG
              id="qr-code-svg"
              value={text}
              size={size}
              level="H"
              includeMargin
            />
          </div>
          <Button onClick={downloadQR} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
        </Card>
      )}
    </div>
  );
};
