import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { AnimatePresence, motion } from "framer-motion";

interface AutoSelectCustomProps {
  data: any[];
  dataKey: string;
  textKey: string;
  additionalTextKey?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

export default function AutoSelectCustom({ data, dataKey, textKey, additionalTextKey, placeholder, icon }: AutoSelectCustomProps) {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [validOptions, setValidOptions] = useState<any[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const addItem = useCallback((item: any) => {
    if (selectedItems.some((i) => i[dataKey] === item[dataKey])) {
      toast({ title: "Erreur", description: "Cet élément existe déjà", variant: "destructive" });
      return;
    }
    setSelectedItems((prev) => [...prev, item]);
    setInputValue("");
    setValidOptions([]);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }, [selectedItems, dataKey, toast]);

  const removeItem = useCallback((item: any) => {
    setSelectedItems((prev) => prev.filter((i) => i[dataKey] !== item[dataKey]));
  }, [dataKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    filterOptions(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      addItem(validOptions[highlightedIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < validOptions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : validOptions.length - 1));
    }
  };

  const filterOptions = useCallback((value: string) => {
    const filteredOptions = data.filter((item) => 
      item[textKey].toLowerCase().includes(value.toLowerCase()) && 
      !selectedItems.some((selected) => selected[dataKey] === item[dataKey])
    );
    setValidOptions(filteredOptions.length > 0 ? filteredOptions : [{ [textKey]: "Aucun résultat" }]);
    setHighlightedIndex(-1);
  }, [data, textKey, selectedItems, dataKey]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setValidOptions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFocus = () => {
    if (inputValue.trim() !== "") {
      filterOptions(inputValue);
    }
  };
  return (
    <div ref={containerRef} className="relative flex flex-col w-full min-h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background gap-2">
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <Badge key={item[dataKey]} onClick={() => removeItem(item)} className="cursor-pointer hover:bg-red-500 hover:text-white transition">
              {item[textKey]}
            </Badge>
          ))}
        </div>
      )}
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="p-0 border-none ring-0 focus-visible:ring-0 focus-visible:border-0 focus-visible:shadow-none focus-visible:ring-transparent focus-visible:ring-offset-0 h-full"
      />
      <AnimatePresence>
        {validOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 w-full max-h-60 overflow-y-auto bg-background border border-input rounded-md shadow-md z-50"
          >
            {validOptions.map((item, index) => (
              <motion.div
                key={index}
                className={`p-2 cursor-pointer transition ${highlightedIndex === index ? "bg-muted text-foreground" : "hover:bg-muted hover:text-muted-foreground"}`}
                onClick={() => item[textKey] !== "Aucun résultat" && addItem(item)}
              >
                {item[textKey]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
