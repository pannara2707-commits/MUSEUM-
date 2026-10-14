[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.IO.Compression.FileSystem

$docx = Get-ChildItem -Filter *.docx | Select-Object -First 1
Write-Output "Found file: $($docx.FullName)"

$zip = [System.IO.Compression.ZipFile]::OpenRead($docx.FullName)
$entry = $zip.GetEntry('word/document.xml')
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
$xmlText = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

$xml = [xml]$xmlText
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")

$paragraphs = $xml.SelectNodes("//w:p", $ns)
$lines = @()
foreach ($p in $paragraphs) {
    $tNodes = $p.SelectNodes(".//w:t", $ns)
    $line = ($tNodes | ForEach-Object { $_.InnerText }) -join ""
    $lines += $line
}

$fullText = $lines -join "`r`n"
[System.IO.File]::WriteAllText("extracted_content.txt", $fullText, [System.Text.Encoding]::UTF8)
Write-Output "Saved extracted_content.txt with length: $($fullText.Length)"
