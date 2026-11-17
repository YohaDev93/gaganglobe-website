# Download the original Pexels stock images once and save them inside assets/images.
# These are public Pexels images with free-use licenses. Review Pexels terms before production use.
$ErrorActionPreference = "Stop"
$destination = Join-Path $PSScriptRoot "assets\images"
New-Item -Path $destination -ItemType Directory -Force | Out-Null
$photos = @(
  @{ File = "team-meeting.jpg"; Url = "https://images.pexels.com/photos/36733421/pexels-photo-36733421/free-photo-of-diverse-business-team-meeting-in-modern-office.jpeg?auto=compress&w=1440" }
  @{ File = "job-interview.jpg"; Url = "https://images.pexels.com/photos/5439152/pexels-photo-5439152.jpeg?auto=compress&w=1440" }
  @{ File = "manufacturing.jpg"; Url = "https://images.pexels.com/photos/38804512/pexels-photo-38804512/free-photo-of-modern-industrial-production-facility-interior.jpeg?auto=compress&w=1440" }
  @{ File = "commercial.jpg"; Url = "https://images.pexels.com/photos/28589010/pexels-photo-28589010/free-photo-of-modern-office-building-facade-with-windows.jpeg?auto=compress&w=1440" }
  @{ File = "hospital.jpg"; Url = "https://images.pexels.com/photos/36078152/pexels-photo-36078152/free-photo-of-aerial-view-of-hospital-building-at-sunset.jpeg?auto=compress&w=1440" }
  @{ File = "hospitality.jpg"; Url = "https://images.pexels.com/photos/19627822/pexels-photo-19627822/free-photo-of-exterior-of-a-building.jpeg?auto=compress&w=1440" }
  @{ File = "automation.jpg"; Url = "https://images.pexels.com/photos/38217230/pexels-photo-38217230/free-photo-of-industrial-control-room-with-electrical-panels.jpeg?auto=compress&w=1440" }
  @{ File = "energy.jpg"; Url = "https://images.pexels.com/photos/36358684/pexels-photo-36358684/free-photo-of-high-voltage-electrical-substation-in-somerville.jpeg?auto=compress&w=1440" }
)
foreach ($photo in $photos) {
  $file = Join-Path $destination $photo.File
  Write-Host "Downloading $($photo.File) ..."
  Invoke-WebRequest -Uri $photo.Url -OutFile $file
  if ((Get-Item $file).Length -lt 10000) { throw "Downloaded image appears incomplete: $file" }
}
Write-Host "All stock images are saved locally under assets/images/"
