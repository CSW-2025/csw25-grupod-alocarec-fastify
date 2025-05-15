# Carrega variáveis do .env.aws
Get-Content .env.aws | ForEach-Object {
    if ($_ -match "^(.*?)=(.*)$") {
        $name = $matches[1]
        $value = $matches[2]
        Set-Item -Path "env:$name" -Value $value
    }
}

# Atualiza o ~/.aws/credentials automaticamente
$awsCredentialsPath = "$HOME\.aws\credentials"

$profileContent = @"
[default]
aws_access_key_id=$env:AWS_ACCESS_KEY_ID
aws_secret_access_key=$env:AWS_SECRET_ACCESS_KEY
aws_session_token=$env:AWS_SESSION_TOKEN

"@

$utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($awsCredentialsPath, $profileContent, $utf8NoBomEncoding)

Write-Host "Credenciais AWS atualizadas com sucesso!"

#executar no powershell: .\set-aws-creds.ps1