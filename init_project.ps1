# Init Project Structure
$dirs = @(
    "src/app/(public)",
    "src/app/(auth)",
    "src/app/(dashboard)",
    "src/app/api",
    "src/components/ui",
    "src/components/marketing",
    "src/components/dashboard",
    "src/components/shared",
    "src/lib/db",
    "src/lib/hooks",
    "src/types",
    "public"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path $dir
}

# Create empty files to ensure git tracking / initial structure
$files = @(
    "src/lib/utils.ts",
    "src/lib/db/schema.ts",
    "src/app/globals.css",
    "src/app/layout.tsx",
    "tailwind.config.ts",
    "postcss.config.js",
    "drizzle.config.ts"
)

foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        New-Item -ItemType File -Force -Path $file
    }
}
