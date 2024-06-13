# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:9400/ with your browser to see the result.

## Database
- เพื่อสร้างไฟล์ ดาต้าเบส และไฟล์ model structure (ทำครั้งเดียวตอนที่ยังไม่มี ไฟล์ sqlite หรือ อัพเดทตาราง)
- ไม่ต้องทำใน dockerfile

```
RUN bun generate
RUN bun src/migrate.ts
```

## API

see at http://localhost:9400/swagger


### แก้ไขเรื่อง puppeteer บน docker
https://siriphonnot.medium.com/deploy-node-js-puppeteer-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-docker-%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99-5-%E0%B8%99%E0%B8%B2%E0%B8%97%E0%B8%B5-546d5ed24cb1