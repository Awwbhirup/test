# Asset Migration Script
$sourceRoot = "string_tune.fiddle.digital/string-tune.fiddle.digital/images"
$destRoot = "public/assets/img"

# Create destination directory
New-Item -ItemType Directory -Force -Path $destRoot

# Define files to move (Source relative path -> Dest filename)
$files = @(
    @("home/storm.jpg", "storm.jpg"),
    @("home/cloud.jpg", "cloud.jpg"),
    @("home/polygon-bg.jpg", "polygon-bg.jpg"),
    @("home/bamboo-1.png", "bamboo-1.png"),
    @("home/bamboo-2.png", "bamboo-2.png"),
    @("home/bamboo-3.png", "bamboo-3.png"),
    @("home/bamboo-4.png", "bamboo-4.png"),
    @("home/flashing-circle.png", "flashing-circle.png"),
    @("home/mask.jpg", "mask.jpg"),
    @("general/aika-8bit-sprite.png", "aika-8bit-sprite.png")
)

foreach ($file in $files) {
    $src = Join-Path $sourceRoot $file[0]
    $dest = Join-Path $destRoot $file[1]
    
    if (Test-Path $src) {
        Write-Host "Copying $src to $dest"
        Copy-Item -Path $src -Destination $dest -Force
    } else {
        Write-Warning "Source file not found: $src"
    }
}
