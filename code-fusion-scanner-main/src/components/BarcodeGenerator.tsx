import { useState, useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const BarcodeGenerator = () => {
  const [text, setText] = useState("");
  const [format, setFormat] = useState("CODE128");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (text && canvasRef.current) {
      try {
        JsBarcode(canvasRef.current, text, {
          format,
          width: 2,
          height: 100,
          displayValue: true,
          margin: 10,
        });
      } catch (error) {
        console.error("Invalid barcode:", error);
      }
    }
  }, [text, format]);

  const downloadBarcode = () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "barcode.png";
        link.click();
        URL.revokeObjectURL(url);
        toast({
          title: "✅ Success",
          description: "Barcode downloaded successfully!",
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="barcode-format">Format</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger id="barcode-format">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CODE128">CODE128</SelectItem>
              <SelectItem value="EAN13">EAN-13</SelectItem>
              <SelectItem value="UPC">UPC</SelectItem>
              <SelectItem value="CODE39">CODE39</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="barcode-text">Data</Label>
          <Input
            id="barcode-text"
            placeholder={
              format === "EAN13"
                ? "Enter 12 or 13 digits"
                : "Enter text or numbers"
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="font-mono"
          />
          {format === "EAN13" && (
            <p className="text-xs text-muted-foreground">
              EAN-13 requires exactly 12 or 13 digits
            </p>
          )}
        </div>
      </div>

      {text && (
        <Card className="p-6 flex flex-col items-center gap-4 bg-card shadow-lg">
          <div className="bg-white p-4 rounded-lg w-full flex justify-center">
            <canvas ref={canvasRef} />
          </div>
          <Button onClick={downloadBarcode} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download Barcode
          </Button>
        </Card>
      )}
    </div>
  );
};
