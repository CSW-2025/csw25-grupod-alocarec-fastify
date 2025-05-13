$env:AWS_ACCESS_KEY_ID="SUA_ACCESS_KEY"
$env:AWS_SECRET_ACCESS_KEY="SUA_SECRET_KEY"
$env:AWS_SESSION_TOKEN="SEU_SESSION_TOKEN"

#após definir as variáveis de ambiente, rodar o comando: .\aws-env.ps1 na raiz do projeto
# Para verificar se as variáveis de ambiente foram definidas corretamente, execute o seguinte comando:
#aws sts get-caller-identity
# Se as variáveis de ambiente estiverem definidas corretamente, você verá informações sobre sua conta AWS.
