# Figma API Setup

## 1. Revoke the exposed token

The token shared in chat should be treated as compromised.
Create a new Figma personal access token before using the API.

## 2. Create a local `.env`

Copy `.env.example` to `.env` and fill in:

```env
FIGMA_TOKEN=your_new_token
FIGMA_FILE_KEY=your_file_key
```

## 3. Find your file key

For a Figma URL like:

```text
https://www.figma.com/design/AbCdEfGh1234/File-Name?node-id=1-2
```

The file key is:

```text
AbCdEfGh1234
```

## 4. Test the API

Run:

```bash
chmod +x ./figma-api-check.sh
./figma-api-check.sh
```

If the token and file key are valid, you will get JSON from the Figma API.

## 5. Example curl request

```bash
curl --header "X-Figma-Token: $FIGMA_TOKEN" "https://api.figma.com/v1/files/$FIGMA_FILE_KEY"
```

## 6. Recommended next step

Use `figma-tokens.json` for style reference and `figma-layout-spec.json` as a build spec while working in Figma.
