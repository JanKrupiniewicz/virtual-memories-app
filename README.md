## About This Project

This application allows users to create, store, and share their memories in a virtual space. The application leverages the power of server-side rendering and static site generation to deliver a fast and seamless user experience.

Users can perform CRUD operations on posted memories, add comments, and discover public memories posted by other users. The application provides an admin panel with a small dashboard for managing content and users.

## Features

- **User Authentication** - Secure login and registration system.
- **Memory Management** - Perform CRUD operations to manage virtual memories.
- **Image Uploads** - Upload images directly to Cloudinary.
- **Public and Private Memories** - Filter memories based on privacy settings.
- **Comment System** - Add comments to memories and interact with other users.
- **Admin Dashboard** - Manage users, monitor activities, and moderate content.
- **Responsive Design** - Optimized for mobile and desktop devices.

## Technologies Used

- **Next.js** - React framework for server-side rendering and static site generation.
- **ShadcnUI** - Modern and customizable UI components.
- **Drizzle ORM** - Lightweight SQL ORM for database interaction.
- **PostgreSQL** - Relational database for data storage.
- **Tailwind CSS** - Utility-first CSS framework for responsive designs.
- **Fetch API** - Built-in web API for handling HTTP requests.
- **Docker Compose** - Containerization for easier deployment and development.
- **Cloudinary** - Cloud-based image and video storage service.
- **Lucia V1** - Implementing auth from scratch based on Lucia project.
- **Zod** - TypeScript-first schema declaration and validation library.
- **React Hook Form** - Performant, flexible and extensible forms handling.

## Getting Started

1. **Clone the Repository**

```bash
git clone https://github.com/your-repository/virtual-memories-app.git
cd virtual-memories-app
```

2. **Install Dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Variables**
   Create a `.env.local` file in the root directory and add the following:

```
DATABASE_URL=your_postgresql_database_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. **Run Migrations**

```bash
npm run db:migrate
```

5. **Run the Development Server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

6. **Building for Production**

```bash
npm run build
npm start
```

## Deployment

This project is ready for deployment on platforms like Vercel, Netlify, or Docker-based hosting providers.
