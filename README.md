# Product Management Dashboard - Gupio Assignment

A responsive product management web app built with React and Vite. It lets users view, add, edit, and delete products with live search, filters, sorting options, and inventory statistics. All data is saved in localStorage so changes persist across page reloads.

## Features

- Product Management: Add, edit, delete, and view product details
- Search: Real-time search by product name and description with debounce
- Filtering: Filter products by category and stock availability (In Stock, Low Stock, Out of Stock)
- Sorting: Sort by newest, oldest, name, price, and stock levels
- Dual Views: Switch between grid cards and list/table view
- Inventory Stats: Overview cards showing total products, total stock value, low stock, and out of stock items
- Form Validation: Validation checks for product name, category, price, and stock count
- Feedback & UX: Toast notifications for user actions and modal confirmation before deleting products
- Local Storage: Automatically persists products in the browser with preloaded sample data

## Tech Stack

- React 19
- Vite
- Vanilla CSS
- ESLint

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Setup and Running

1. Clone the repository:
   git clone https://github.com/NavaneethRaj05/Gupio-Assignment.git
   cd Gupio-Assignment

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

4. Open the link shown in your terminal (usually http://localhost:5173) in your browser.

## Other Scripts

- npm run build - Builds the project for production
- npm run preview - Previews the production build locally
- npm run lint - Runs ESLint to check for code issues

## Project Structure

src/
  components/
    ConfirmDialog.jsx      - Modal for delete confirmation
    EmptyState.jsx         - Shown when no products match or catalog is empty
    FilterBar.jsx          - Search bar, category filter, stock filter, sort, and view switcher
    Modal.jsx              - Base modal overlay component
    Navbar.jsx             - Top navigation header
    ProductDetailModal.jsx - View details modal with stock indicator
    ProductForm.jsx        - Form for adding and editing products
    ProductViews.jsx       - Grid card and table list views
    StatCard.jsx           - Inventory statistics cards
    ToastContainer.jsx     - Notification toasts
  App.jsx                  - Main dashboard state and handlers
  hooks.jsx                - Custom hooks (useToast, useDebounce)
  utils.js                 - Helper functions, validation logic, seed data, and storage
  index.css                - Application styling
  main.jsx                 - React entry point
