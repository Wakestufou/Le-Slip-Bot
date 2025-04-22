# Le-Slip-Bot

## Docker

Build Image :

```bash
podman build -t slipbot .
```

Create + start container

```bash
podman run --rm --name slipbot slipbot
```

List Images :

```bash
podman images
```

List containers :

```bash
podman container ls
```

Remove containers :

```bash
podman rm <id|name>
```
