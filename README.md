# 🧠 AI Form Builder SaaS

A modern, full-stack form builder that combines the flexibility of drag-and-drop form creation with the power of AI. Instantly generate, publish, and manage intelligent forms — all without writing a single line of code.

![AI Form Builder](https://via.placeholder.com/800x400?text=AI+Form+Builder+SaaS)

---

## 🚀 Key Features

- ⚙️ **Drag & Drop Builder** – Effortlessly design complex forms with a clean interface
- 🤖 **AI Field Generation** – Use OpenAI to auto-create labels, descriptions, and validations
- 🧪 **Real-time Preview** – Instantly visualize form changes before publishing
- 📬 **Public Form Links** – Share and collect responses through unique URLs
- 📊 **Dashboard & Analytics** – Track submissions and export results
- 🔒 **Form Access Control** – Publish/unpublish forms anytime
- 💡 **Field Types** – Text, Email, Number, Textarea, Select, Radio, Checkbox

---

## 🧰 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, TypeScript
- **Backend/API**: Next.js API Routes (Server Actions)
- **Database**: SQLite (dev), PostgreSQL-ready via Prisma
- **State & Validation**: React Hook Form, Zod, Zustand
- **Drag & Drop**: Powered by `@dnd-kit`
- **AI Integration**: OpenAI GPT-3.5 Turbo
- **Auth**: NextAuth.js
- **Icons & UI**: Lucide Icons, Radix UI

---

## 📦 Installation

### Prerequisites

- Node.js 18+
- OpenAI API Key
- npm, yarn, or pnpm

### Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ai-form-builder-saas
cd ai-form-builder-saas

# 2. Install dependencies
npm install

# 3. Create the .env file
cp .env.example .env
```

### Example `.env`

```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="your-openai-api-key"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

```bash
# 4. Set up the database
npx prisma generate
npx prisma db push

# 5. Run the app
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🎯 How It Works

### Creating a Form

1. Click "Create Form" on the dashboard
2. Drag fields from the sidebar into the form builder
3. Click a field to edit its properties (label, validation, etc.)
4. Use **AI tools** to suggest or generate content
5. Preview, publish, and share your form

### Sharing & Collecting Responses

- Forms get a **public link** after publishing
- Users can submit anonymously or with email
- View submissions via the dashboard

---

## 📁 Folder Structure

```
.
├── app/
│   ├── page.tsx                 # Landing / dashboard
│   ├── form/[id]/               # Public form route
│   └── api/                     # API endpoints (RESTful)
├── components/                  # UI components
├── lib/                         # Utils, Prisma, validators
├── prisma/schema.prisma         # Data models
├── public/                      # Icons and assets
└── styles/                      # Tailwind styles
```

---

## 🧠 AI Capabilities

- **Bulk Field Suggestions** – Based on title/description
- **Smart Labeling** – Automatically generate field labels
- **Auto Validations** – Email, required fields, min/max
- **Dynamic Placeholder & Help Texts** – Enhanced UX

---

## 🧪 Testing

```bash
# Run local dev
npm run dev

# Steps to test manually:
# 1. Create a form
# 2. Add fields via drag and drop
# 3. Use AI to generate field content
# 4. Publish and visit the public form
# 5. Submit responses and verify in dashboard
```

---

## 🔐 Authentication

- Powered by `NextAuth.js`
- Support for GitHub, Google, and credentials
- Users manage their own forms and data securely

---

## 📝 API Endpoints

- `GET /api/forms` – List all forms
- `POST /api/forms` – Create new form
- `GET /api/forms/[id]` – Fetch form by ID
- `PUT /api/forms/[id]` – Update form
- `DELETE /api/forms/[id]` – Delete form
- `POST /api/responses` – Submit form response
- `POST /api/ai/generate-fields` – Generate AI-powered fields

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push repo to GitHub
2. Import into [vercel.com](https://vercel.com)
3. Add your environment variables in dashboard
4. Click "Deploy"

### Docker (Optional)

```bash
docker build -t ai-form-builder .
docker run -p 3000:3000 ai-form-builder
```

---

## 📈 Roadmap

- [ ] Conditional logic between fields
- [ ] File uploads (PDFs, images)
- [ ] Email/webhook notifications
- [ ] PDF export of submissions
- [ ] Custom styling/themes
- [ ] Team collaboration
- [ ] i18n (multi-language support)

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Add tests where applicable
5. Submit a Pull Request 🚀

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

## 💬 Support

- [Submit an issue](../../issues)
- For questions, reach out via GitHub Discussions
- Give the project a ⭐ if you find it useful!

---

**Built with ❤️ using Next.js, Tailwind CSS, and OpenAI**
