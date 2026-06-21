# Calculadora AECO

Aplicativo de calculadora simples desenvolvido em React Native com Expo para a
disciplina de Programação para Dispositivos Móveis. O aplicativo realiza soma,
subtração, multiplicação, divisão, porcentagem e inversão de sinal.

## Testar no iPhone com Expo Go

No iPhone, instale o Expo Go pela App Store. Depois execute:

```bash
npm install
npx expo start
```

Leia o QR Code com a câmera do iPhone. Para esse teste não é necessário ter
um Mac nem uma assinatura do Apple Developer Program. O computador e o celular
devem estar conectados à mesma rede Wi-Fi.

## Executar no navegador

```powershell
npm.cmd run web
```

Se a porta `8081` estiver sendo usada por outro processo do Expo, inicie em
outra porta:

```powershell
npx.cmd expo start --web --port 8082
```

Depois acesse `http://localhost:8082` no navegador.

## Gerar o build para iPhone com EAS Build

```bash
npm install -g eas-cli
eas login
eas build:configure
eas device:create
eas build --platform ios --profile preview
```

O comando `eas device:create` cadastra o iPhone que receberá o aplicativo. O
perfil `preview` gera um build interno para instalar nesse aparelho. Esse build
exige uma assinatura ativa do Apple Developer Program. O EAS realiza a
compilação na nuvem, portanto o comando pode ser executado no Windows.

> **Atenção:** o enunciado da atividade solicita especificamente um build
> Android e a instalação de um APK. Confirme com o professor se ele aceitará um
> build iOS instalado em iPhone como substituição dessa exigência.

## Build Android solicitado no enunciado

Se o professor mantiver a exigência de APK, o projeto também está configurado
para gerá-lo:

```bash
eas build --platform android --profile preview
```

### Observação para o PowerShell

Se o Windows informar que a execução de `npm.ps1` foi desabilitada, use os
executáveis com extensão `.cmd` no terminal do VS Code:

```powershell
npm.cmd install
npx.cmd expo start
eas.cmd login
eas.cmd build:configure
eas.cmd device:create
eas.cmd build --platform ios --profile preview
```
