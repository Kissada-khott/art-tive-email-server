# Art-tive Email Verification Server

Custom email verification server for Art-tive marketplace using Firebase Admin SDK and Nodemailer.

## Features

- Custom email verification using Firebase Admin SDK
- Gmail SMTP integration via Nodemailer
- Environment-based configuration
- Railway deployment ready

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file with the following variables:

```env
# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Firebase Configuration
FIREBASE_PROJECT_ID=myshop-1580d
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@myshop-1580d.iam.gserviceaccount.com

# Server Configuration
PORT=3001
NODE_ENV=production

# Frontend URL
FRONTEND_URL=https://art-tive.com

# Email Template Configuration
EMAIL_FROM=Art-tive <your-email@gmail.com>
EMAIL_SUBJECT=ยืนยันอีเมลของคุณ - Art-tive
```

### 3. Firebase Service Account
Place your Firebase service account JSON file in the root directory:
- `myshop-1580d-firebase-adminsdk-fbsvc-69296d705b.json`

## Railway Deployment

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/art-tive-email-server.git
   git push -u origin main
   ```

2. **Deploy on Railway**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will automatically deploy

### Method 2: Direct Upload

1. **Zip your project**
   - Select all files except `node_modules`
   - Create a ZIP file

2. **Upload to Railway**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project"
   - Select "Deploy from template"
   - Choose "Empty Project"
   - Upload your ZIP file

### 3. Set Environment Variables on Railway

In Railway dashboard, go to your project → Variables tab and add:

```env
EMAIL_USER=nexota.coltd@gmail.com
EMAIL_PASS=your-app-password-here
FIREBASE_PROJECT_ID=myshop-1580d
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpQJJ51KroxNr4\no9FBPLdeHEPA5riR38jUgEQG4qZ7lavv7XHVyQI7X0mEXfyQ6F8oN7wkMergOl+B\nUrWTW0cUcX3eagWeIFF8HM89UuS7Rnc5Gefg8D+iypHkr4jG5RmNcZKpWBRHZs8K\nftR4tYlf6Hm0DUM85hJajS2+dXt06khywBDxuMIdnp4Bv2HRsPt1JRyCJMmt5RJy\nY/SOiPEy+cWnyZNLvOHct24iov29mznjeBZwgTR2gK0exgOLJ86j84De8lI+MXJy\nf6FnxsCdtUABkllQ2GBJbyUO7HM3ItcTplm/1NUwnSx2izG9GPaqvt6EYu7Erpzq\n2BjpifzfAgMBAAECggEATD7qHZcoDSdNa9BEnspu4qcCAL8Pa6uwCcbknmNxU2A4\nLiQ98WyVpFCHSmmas17zKyd8iqOwJyY0ywoLAWCP005TQSRq9nKhsrM5yuryXsle\nQSuB8avZRwlRkv9esxcXHUiKJN6oeAgBAj3jkqNZSQrt9KY64Y7VutQ5xMChBqge\nTABU5XiWEa471/dyeyaEED4Q4Qqx+WjO7GYmpmHguXK6T6ivNKYbO9AZ7dPsAI4F\nE0Xl+Ye8nEhg7GIStLfA+B0HZbLfgdk1qiDpeEM3UxFldZHBVOYm+Nfs4dhKO+Dl\nALT5x5sieFn1x1aFhvHrJKjUhiRVj4Jk7gbidpAw5QKBgQDfTuQQEjU57LmvdkZm\neOrN25lQ2lD6qEHWvOtbfOp6Z5wowErh8mac1STV5jHtGiKZfLjpZ1Jz8EWz1VgO\nyLeexLjiLbQ+itg5uuTd2yzvJQrCFJJtC6H5T8XaeWlYaYOUBRlBSgHjYHXRfxuS\nofV1nzsm80F+o458KgNpdY1GOwKBgQDCB8gI6+r7UZPDBwGy6GxaT1M1B5k8TFJX\npkmUJLQplZ90T8t1dZxQwyEKbQbikKnZ3cL53T6Z/W+TMQd42hbBpG44pSBtxyfa\nTuERZX9CDuluN+ypOXIugCwG+2vtIH+9RSubYShDRx8LAhTbvjYf2bQvyphOy3x2\nVTu17BElrQKBgQCx+uTW0kxN8JlGedQ+lB1BGcemo3prbXOcPVKwxmz0RmQ2Lp0A\nXPzf/xmuyhv8yBnPj5KppMoY0eYcIOxgTCXdixl4W8kPGAaibI1BLhEwQavDaDYU\nZ3MfjC87pA0MhHx0m2O3n87FdPoykUZepmtG5jR1JOiMkLtdxvaVNTX2RQKBgGKN\noUUmz4wnu23sOSiudZrJf/IHkgXWnlx20hi1K+2TWhKyFR3sRyGee0HYbw7Ve/B1\ne3t+rTV6TRnuZWU1ISnqYzHSbc5UwiFYv2kerKzY9ihNr5+k1iJYaASD4CXpw/hX\nEfcyOkkx7sqgnAehbcxvv94mgYZERUu1r0aQSYVhAoGASwj6usbMYjwZHrDsHicM\n8Ud3anCvtRBwhL9p69ZVEr7JwTnoqxd0JMQFYoTiHtVTXFFkKY7N9fdwsLqQdCgh\n/Ajhtwxiira56prEsP1fIloOUVtEBQlFLJoBSwVXC7P/yxFCAr49R2bBkkc6gArb\nHBnFSFGZwTuFMPTsZFFQtfM=\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@myshop-1580d.iam.gserviceaccount.com
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://art-tive.com
EMAIL_FROM=Art-tive <nexota.coltd@gmail.com>
EMAIL_SUBJECT=ยืนยันอีเมลของคุณ - Art-tive
```

### 4. Upload Service Account File

In Railway dashboard:
- Go to your project → Files tab
- Upload `myshop-1580d-firebase-adminsdk-fbsvc-69296d705b.json`

## API Usage

### Send Verification Email
```bash
POST https://your-railway-app.railway.app/send-custom-verification-email
Content-Type: application/json

{
  "userEmail": "user@example.com",
  "redirectUrl": "https://art-tive.com/verify-email-success"
}
```

## Local Development

```bash
npm run dev
```

Server will run on `http://localhost:3001`

## Notes

- Make sure to create Gmail App Password for EMAIL_PASS
- Keep your Firebase service account file secure
- Railway will automatically assign a domain for your app
