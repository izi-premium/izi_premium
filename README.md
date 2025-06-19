# Next.js 15 Boilerplate

This is a feature-rich boilerplate for starting new projects with Next.js 15. It's built with modern best practices, focusing on performance, developer experience, and scalability.

## ✨ Features

- **Next.js 15** with App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS** for styling
- **Shadcn UI** for beautiful, accessible components
- **Server Components** by default for optimal performance
- **ESLint** and **Prettier** for code quality
- **Ready-to-use components** to speed up development

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

The project follows a feature-driven structure, making it easy to locate and manage files.

```
next_boilerplate/
├── app/
│   ├── (components)/   # Optional: For components co-located with routes
│   ├── actions/        # Server Actions
│   │   └── sendEmail.ts
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/
│   ├── sections/       # Page sections (FaqSection, CarouselSection, etc.)
│   ├── shared/         # Reusable components (Header, Footer, Cards, etc.)
│   └── ui/             # Shadcn UI components
├── hooks/
│   └── ...             # Custom hooks
├── lib/
│   └── utils.ts        # Utility functions
└── public/
    └── fonts/          # Local fonts
```

## 🧩 Components

This boilerplate includes a variety of pre-built components to help you get started quickly.

### `Header`

- **Location:** `components/shared/Header.tsx`
- **Description:** A responsive header with navigation links and a mobile-friendly sheet menu. It is a client component (`"use client"`) to handle the state of the mobile menu.

### `Footer`

- **Location:** `components/shared/Footer.tsx`
- **Description:** A simple footer with copyright information and links. It's a server component.

### `FaqSection` (Accordion)

- **Location:** `components/sections/FaqSection.tsx`
- **Description:** A FAQ section built with the Shadcn `Accordion` component. It's a server component with static data.

### `CarouselSection`

- **Location:** `components/sections/CarouselSection.tsx`
- **Description:** A responsive carousel that displays feature cards. It shows 1 slide on mobile, 2.5 on tablets, and 3.5 on desktop devices. It is implemented as a server component using responsive Tailwind CSS classes.

### `InfoDialog`

- **Location:** `components/shared/InfoDialog.tsx`
- **Description:** A dialog component built with Shadcn `Dialog`. The close button is styled to be 44x44px for better accessibility.

### `ContactForm`

- **Location:** `components/sections/ContactForm.tsx`
- **Description:** A contact form that uses a Server Action (`sendEmail.ts`) to handle submissions. It includes validation with Zod and provides user feedback on success or error. It uses `useActionState` to manage form state.

#### Customizing the Contact Form

To make the contact form send emails to your address, you need to modify the server action file located at `app/actions/sendEmail.ts`.

Currently, the form only logs the data to the console. To send an email, you can use a service like [Resend](https://resend.com/), [Nodemailer](https://nodemailer.com/), or any other email provider.

Here is an example of where to add your email sending logic:

```typescript
// app/actions/sendEmail.ts

// ... inside the sendEmail function, after validation ...

if (validatedFields.success) {
  // Here you would implement your email sending logic
  // For example, using Resend:
  //
  // await resend.emails.send({
  //   from: 'onboarding@resend.dev',
  //   to: 'your-email@example.com', // <--- CHANGE THIS
  //   subject: 'New Message from Contact Form',
  //   react: EmailTemplate({ ...validatedFields.data }),
  // });

  console.log("Form data submitted successfully:");
  console.log(validatedFields.data);

  return {
    message: "Thank you for your message! We will get back to you shortly.",
  };
}
```

You will need to install the necessary packages (e.g., `npm install resend`) and configure any required API keys in your environment variables.

### `TabsSection`

- **Location:** `components/sections/TabsSection.tsx`
- **Description:** A section with tabs, inspired by the `esmedia` project. It uses Shadcn `Tabs` to display different content sections. It is a client component.

### `SkeletonCard`

- **Location:** `components/shared/cards/SkeletonCard.tsx`
- **Description:** A skeleton loader component used as a placeholder while content is loading. This is used in `app/page.tsx` with React's `Suspense` to demonstrate loading patterns.

## 🎨 Customization

### Theming

You can customize the theme by editing the CSS variables in `app/globals.css`. The boilerplate uses a standard set of variables for colors, fonts, and border radius, which are used by Tailwind CSS and Shadcn UI components.

### Fonts

The boilerplate uses a local font (`GeneralSans-Variable.woff2`). You can change the font by updating the `app/layout.tsx` file and adding your font files to the `public/fonts` directory.

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request. 