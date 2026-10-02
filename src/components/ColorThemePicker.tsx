import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { colorThemes } from "@/config/color-themes.config";
import { useTheme } from "@/hooks/use-theme";

export function ColorThemePicker() {
  const { colorTheme, setColorTheme } = useTheme();

  return (
    <div className="flex flex-wrap gap-2">
      <Select value={colorTheme.id} onValueChange={(value) => setColorTheme(value)}>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Themes</SelectLabel>
            {colorThemes.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                <div className="flex items-center gap-2">
                  <span
                    className="size-4 rounded-full border"
                    style={{ background: t.previewColor }}
                  />
                  {t.label}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
