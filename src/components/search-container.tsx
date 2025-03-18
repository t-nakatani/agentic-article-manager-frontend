interface SearchContainerProps {
  showFavorites: boolean
  onShowFavoritesChange: (show: boolean) => void
  showReadLater: boolean
  onShowReadLaterChange: (show: boolean) => void
}

export function SearchContainer({
  showFavorites,
  onShowFavoritesChange,
  showReadLater,
  onShowReadLaterChange,
}: SearchContainerProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Checkbox 
          id="show-favorites" 
          checked={showFavorites}
          onCheckedChange={onShowFavoritesChange}
        />
        <Label htmlFor="show-favorites">お気に入りのみ</Label>
      </div>
      
      <div className="flex items-center gap-2">
        <Checkbox 
          id="show-read-later" 
          checked={showReadLater}
          onCheckedChange={onShowReadLaterChange}
        />
        <Label htmlFor="show-read-later">あとで読むのみ</Label>
      </div>
    </div>
  )
} 