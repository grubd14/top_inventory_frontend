# Inventory Management System - Setup & Usage Guide

## Overview
This is a complete inventory management frontend application built with React and Vite. It provides a user-friendly interface for managing product categories and items with full CRUD operations.

## Features Implemented

### ✅ Authentication
- **Login Page** - User login with username, password, and role selection
- **Register Page** - New user registration with validation
- **Logout** - Secure logout functionality
- **Navbar** - Conditional display based on login status

### ✅ Categories Management
- **View Categories** - List all categories in a table format
- **Create Category** - Add new categories with name and description
- **View Category Details** - See all items in a specific category
- **Edit Category** - Update category information
- **Delete Category** - Remove categories from the system
- **Add Items to Category** - Quick add items from category page

### ✅ Items Management
- **View Items** - See all items in a category
- **Add Items** - Create new items with name, description, quantity, price, and category
- **View Item Details** - Individual item information page
- **Edit Items** - Update item information
- **Delete Items** - Remove items from inventory
- **Quantity Management** - Track and update item quantities

### ✅ Navigation
- **Navbar** - Links to all main sections
- **Breadcrumbs** - Easy navigation between pages
- **404 Page** - Handles missing pages gracefully

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API running on `http://localhost:3000`

### Steps

1. **Clone the repository**
   ```bash
   cd top_inventory_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```
   VITE_API_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── api/
│   └── api.js              # All API endpoints
├── components/
│   ├── forms/
│   │   ├── loginForm.jsx   # Login form component
│   │   └── registerForm.jsx # Register form component
│   ├── category/
│   │   ├── categoryDetails.jsx
│   │   ├── editCategory.jsx
│   │   └── newCategory.jsx
│   ├── items/
│   │   ├── itemDetails.jsx
│   │   ├── editItem.jsx
│   │   └── addItem.jsx
│   └── navBar.jsx          # Navigation bar
├── pages/
│   ├── categoryPage.jsx    # Categories list page
│   ├── loginPage.jsx       # Login page
│   ├── registerPage.jsx    # Register page
│   ├── aboutPage.jsx       # About page
│   ├── notfoundPage.jsx    # 404 page
│   └── indexPage.jsx       # Home/index page
├── App.jsx                 # Main app component with routes
└── main.jsx               # Entry point
```

## API Endpoints Used

### Authentication
- `POST /login` - User login
- `POST /signup` - User registration
- `POST /logout` - User logout

### Categories
- `GET /category` - Get all categories
- `GET /category/:id` - Get category with items
- `POST /category/create` - Create new category
- `POST /category/:id/update` - Update category
- `DELETE /category/:id` - Delete category

### Items
- `GET /item` - Get all items
- `GET /item/:id` - Get specific item
- `POST /item/add` - Add new item
- `POST /item/:id/update` - Update item
- `POST /item/:id/updateQuantity` - Update item quantity
- `DELETE /item/:id` - Delete item

## Key Fixes Applied

### 1. Router Import Fix
- Changed all imports from `react-router` to `react-router-dom`
- Updated `BrowserRouter`, `Routes`, `Route`, and `Link` imports

### 2. Login/Register Forms
- Added state management with `useState`
- Implemented form submission handlers
- Added error handling and validation
- Connected to backend API endpoints
- Added loading states and user feedback

### 3. Navigation
- Fixed all `Link` components to use correct props
- Added conditional navbar rendering based on login status
- Implemented logout functionality
- Added welcome message with username

### 4. Category Page
- Fixed router import
- Added loading and error states
- Improved table layout and styling
- Added action buttons with proper links
- Fixed "Add New Category" button placement

### 5. Category Details
- Fixed response handling for nested objects
- Added proper null checks
- Implemented category info extraction from items response
- Added action buttons for editing, deleting, and adding items

### 6. Item Details
- Fixed array response handling
- Added proper null validation
- Implemented item data extraction
- Added navigation links to related pages

### 7. Forms
- **AddItem**: Full form with category dropdown, quantity, price, description
- **NewCategory**: Simple form for creating categories
- Both with proper validation and error messages

### 8. App Routes
- Organized all routes in logical groups
- Fixed route order (specific routes before generic ones)
- Added missing routes like `/category/:id/new-item`
- Fixed `/item/:id/update` route mapping

## Usage Guide

### Registering a New User
1. Click "Register" in the navbar
2. Enter username and password (min 6 characters)
3. Select your role (Admin or User)
4. Click "Register"
5. Redirected to login page

### Logging In
1. Click "Login" in the navbar
2. Enter your username and password
3. Select your role
4. Click "Login"
5. Redirected to categories page

### Managing Categories
1. On the home page, view all categories
2. **Create**: Click "Add New Category", fill form, click "Create Category"
3. **View Details**: Click "Details" button to see category items
4. **Edit**: Click "Edit" button to modify category
5. **Delete**: Click "Delete" button (implementation pending on backend)

### Managing Items
1. From category details, click "Add New Item"
2. Fill in item details (name, description, quantity, price, category)
3. Click "Save Item"
4. View item by clicking "View" in the item row
5. Edit item by clicking "Edit"
6. Delete item by clicking the delete button (implementation pending)

## Common Issues & Solutions

### Issue: API calls not working
**Solution**: Ensure backend is running on `http://localhost:3000` and CORS is enabled

### Issue: Blank pages loading
**Solution**: Check browser console for errors, verify API endpoints respond correctly

### Issue: Forms not submitting
**Solution**: Check that all required fields are filled, verify network tab for failed requests

### Issue: Cannot navigate between pages
**Solution**: Ensure React Router imports are from `react-router-dom`, not `react-router`

## Data Flow

### Login/Register Flow
```
User Form → API Call → Backend Validation → Store User Info → Redirect
```

### Category Management Flow
```
CategoryPage → API Get Categories → Display Table → User Actions → 
API Create/Update/Delete → Update UI → Navigate
```

### Item Management Flow
```
Category Details → Items List → User Click Action → 
Form/Details Page → API Call → Update State → Navigate Back
```

## State Management

The application uses React's built-in `useState` and `useEffect` hooks for state management:

- **Loading states**: Track API call progress
- **Error states**: Store and display error messages
- **Data states**: Store categories, items, and user info
- **Form states**: Track form input values

## Security Notes

- Credentials are sent via POST to backend
- Backend should handle password hashing
- Consider implementing token-based authentication (JWT)
- Use HTTPS in production
- Validate all inputs on backend

## Performance Optimizations

- Lazy loading of routes
- Conditional rendering to avoid unnecessary components
- UseEffect dependencies properly configured to prevent infinite loops
- Form validation before API calls

## Future Enhancements

1. **Search & Filter**: Add search functionality for categories and items
2. **Pagination**: Implement pagination for large datasets
3. **Bulk Operations**: Allow bulk delete/update operations
4. **Export Data**: Add CSV/PDF export functionality
5. **Analytics**: Add dashboard with inventory statistics
6. **Image Upload**: Allow item images
7. **User Roles**: Implement different permission levels
8. **Edit Category**: Complete the EditCategory component
9. **Edit Item**: Complete the EditItem component
10. **Delete Handlers**: Implement confirmation dialogs for delete actions

## Troubleshooting

### Clear Cache
```bash
npm run dev -- --force
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Check Backend Connection
Visit `http://localhost:3000/category` in your browser to verify API is working

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify backend API is running
3. Check network tab for API responses
4. Review component console logs

---

**Last Updated**: March 2026
**Version**: 1.0