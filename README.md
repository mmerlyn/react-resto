# React-Resto

A food ordering app I built to practice React and state management.

[Live Application](https://react-resto-app.vercel.app)

## About

I wanted to build something more complex - something with interconnected features and real state management challenges. A restaurant ordering system fit well: cart, favorites, order history, and search all need to work together.

## Tech Stack

React 19, Redux Toolkit, React Router, Tailwind CSS, Lucide React, React Hot Toast

## Features

- Browse 100+ menu items with search, category filter, and sorting
- Cart with quantity controls
- Save favorites
- Order history with reorder
- Dark/light mode
- Data persists in localStorage

## How I Built

- **State**: Redux Toolkit with slices for cart, favorites, orders, and theme
- **Logic**: Custom hooks (`useCart`, `useFavorites`, `useMenuSearch`) handle business logic
- **Persistence**: Redux store subscribes to changes and syncs to localStorage
- **Performance**: Debounced search input, memoized filtering and sorting

## What I Learned

- React hooks and component patterns
- State management with Redux Toolkit
- Writing custom hooks
- Performance optimization (memoization, debouncing)
- Persisting state with localStorage

## License

MIT
