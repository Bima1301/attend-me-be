import { IconPlus, IconSearch } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTableSearchFilter } from "@/hooks/use-table-search-filter";

interface ShiftHeaderProps {
  onAddClick: () => void;
}

export function ShiftHeader({ onAddClick }: ShiftHeaderProps) {
  const { searchValue, setSearchValue } = useTableSearchFilter({
    tabKey: "shift",
    searchKeys: ["name", "clockIn", "clockOut"],
  });

  return (
    <div className="flex items-center justify-between px-4 lg:px-6 py-4">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Cari shift..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <Button onClick={onAddClick} className="flex items-center gap-2">
        <IconPlus className="h-4 w-4" />
        Tambah Shift
      </Button>
    </div>
  );
}
