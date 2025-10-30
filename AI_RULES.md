# AI Rules for Girls in STEM Application

This document outlines the technical stack and guidelines for using various libraries within the Girls in STEM web application.

## Tech Stack Overview

*   **Framework:** Next.js (App Router) for server-side rendering, routing, and overall application structure.
*   **Language:** TypeScript for type safety and improved developer experience across the entire codebase.
*   **Styling:** Tailwind CSS for all styling, ensuring a consistent and utility-first approach to design.
*   **UI Components:** A hybrid approach using Material-UI (MUI) and shadcn/ui.
*   **Animation:** GSAP and `motion` (Framer Motion) for dynamic and engaging user interfaces.
*   **Carousel/Slider:** `react-slick` for responsive image and content carousels.
*   **Icons:** `@mui/icons-material` for a wide range of vector icons.
*   **Toasts:** `sonner` for elegant and accessible toast notifications.
*   **Image Optimization:** `next/image` for efficient image loading and delivery.
*   **Scroll Effects:** `react-scroll-parallax` for parallax scrolling animations.
*   **Utility Functions:** `clsx` and `tailwind-merge` for combining CSS classes.

## Library Usage Guidelines

To maintain consistency and efficiency, please adhere to the following rules when using libraries:

*   **Next.js:** Always use Next.js features for routing (`app` directory, `next/link`, `next/navigation`), data fetching, and image optimization (`next/image`).
*   **TypeScript:** All new code must be written in TypeScript. Ensure proper typing for components, props, and state.
*   **Tailwind CSS:** Apply styling exclusively using Tailwind CSS utility classes. Avoid inline styles or custom CSS files unless absolutely necessary for complex animations or specific component overrides (e.g., `TextType.css`, `RotatingText.css`).
*   **Material-UI (MUI):**
    *   **Admin Section:** Use MUI components for all UI elements within the `/admin` section (e.g., `Dashboard`, `Projects`, `Members`, `News` pages) to maintain a consistent administrative interface.
    *   **Main Site:** Use MUI for existing components on the main site (e.g., `Breadcrumbs`, `TextField`, `Button` in `Contact`) and for any new UI elements that naturally fit its design system and are not covered by existing custom components.
*   **shadcn/ui:** For new general-purpose UI components on the *main site* that are not already covered by existing custom components or MUI, prefer using shadcn/ui components.
*   **GSAP:** Use for complex, timeline-based animations, scroll-triggered animations, or when precise control over animation properties is required (e.g., `TextType`, `PixelTransition`, `Masonry`).
*   **Motion (Framer Motion):** Use for declarative, component-based animations, especially for entrance/exit transitions, simple property animations, and interactive elements (e.g., `RotatingText`).
*   **react-slick:** This library is the standard for all carousel and slider implementations.
*   **@mui/icons-material:** Use for all icon needs, especially within MUI components and the admin section.
*   **sonner:** Implement all toast notifications using `sonner` for a unified user feedback experience.
*   **react-router-dom:** This library is specifically used for internal routing within the `/admin` section to manage sub-routes and layouts. The main application navigation should use Next.js routing.