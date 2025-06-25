# Laravel + React + Wayfinder (No Inertia)

This project uses **Laravel** as a backend API, a **React** frontend app (separate), and **Wayfinder** for auto-generating TypeScript-safe API routes.

## 📦 Project Structure

```
laravel-backend/
  ├── routes/web.php
  ├── app/Http/Controllers/PostController.php
  ├── config/wayfinder.php
  ├── resources/js/Actions/...
  └── ...

react-frontend/
  ├── src/api/Actions/...
  ├── src/App.tsx
  └── ...
```

## ⚙️ Laravel Backend Setup

### 1. Create Laravel Project

```bash
composer create-project laravel/laravel laravel-backend
cd laravel-backend
```

### 2. Install Laravel Wayfinder

```bash
composer require laravel/wayfinder
```

### 3. Add Example Controller

```bash
php artisan make:controller PostController
```

In `app/Http/Controllers/PostController.php`:

```php
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function show(Post $post)
    {
        return response()->json($post);
    }

    public function store(Request $request)
    {
        $post = Post::create($request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
        ]));

        return response()->json($post, 201);
    }
}
```

### 4. Create Model & Migration

```bash
php artisan make:model Post -m
```

In `database/migrations/xxxx_create_posts_table.php`:

```php
public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('body');
        $table->timestamps();
    });
}
```

Run migration:

```bash
php artisan migrate
```

### 5. Add Named Routes

In `routes/web.php`:

```php
use App\Http\Controllers\PostController;

Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');
Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
```

## 🚀 Generate TypeScript Routes

### 6. Generate Wayfinder Routes

```bash
php artisan wayfinder:generate --with-form
```

This creates files like:

```
resources/js/Actions/PostController.ts
resources/js/core.ts
```

### 7. Make TS Files Available to React Frontend

Copy the generated TS files from Laravel into your React project:

```bash
mkdir -p ../react-frontend/src/api
cp -r resources/js/* ../react-frontend/src/api/
```

## ⚛️ React Frontend Setup

### 1. Create React App (Vite + TS)

```bash
npm create vite@latest react-frontend -- --template react-ts
cd react-frontend
npm install
```

### 2. Use Wayfinder Routes in React

In `src/App.tsx`:

```tsx
import { useEffect, useState } from 'react';
import { show, store } from './api/Actions/PostController';

function App() {
  const [post, setPost] = useState<any>(null);

  // Fetch post with ID 1
  useEffect(() => {
    fetch(show(1).url, {
      method: show(1).method,
      headers: {
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(setPost);
  }, []);

  // Submit new post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(store().url, {
      method: store().method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        title: 'My New Post',
        body: 'This is the body of the post.',
      }),
    });
  };

  return (
    <div>
      <h1>Wayfinder Test</h1>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ) : (
        <p>Loading post...</p>
      )}

      <form onSubmit={handleSubmit}>
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
}

export default App;
```

## 🔄 Final Checklist

1. Laravel running at `http://localhost:8000`  
   ```bash
   php artisan serve
   ```

2. React app running at `http://localhost:5173`  
   ```bash
   npm run dev
   ```

3. Ensure CORS is allowed (install Laravel CORS middleware if needed):
   ```bash
   composer require fruitcake/laravel-cors
   ```

## ✅ Summary

- **Laravel** acts as backend API with named routes.
- **Wayfinder** generates TypeScript-safe API calls from those routes.
- **React** uses the generated TypeScript to make route-safe HTTP calls.
- No Inertia.js or SSR stack is used.
