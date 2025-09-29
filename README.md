# Laravel Data + TypeScript Transformer Tutorial

This project demonstrates how to achieve **end-to-end type safety** between your Laravel backend and React/Inertia.js frontend using Spatie Laravel Data and TypeScript Transformer.

## 🎯 What You'll Learn

- How to set up Spatie Laravel Data with TypeScript Transformer
- Creating type-safe Data objects with `#[TypeScript]` attributes
- Building Inertia.js controllers that return typed data
- Generating TypeScript types automatically from PHP classes
- Building React components with full type safety
- End-to-end compile-time type checking

## 🚀 Quick Start

### Prerequisites

- PHP 8.4+
- Node.js 18+
- Composer
- Laravel Herd (recommended) or local PHP/MySQL setup

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd laravel-data-typescript-tutorial
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Set up environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Run migrations and seeders**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

6. **Generate TypeScript types**
   ```bash
   php artisan typescript:transform
   ```

7. **Start the development server**
   ```bash
   composer run dev
   ```

Visit `http://localhost:8000` to see the application in action!

## 🏗️ Project Structure

```
app/
├── Data/                          # Spatie Data objects
│   ├── Posts/
│   │   ├── PostResponseData.php   # Response data with #[TypeScript]
│   │   └── CreatePostPayload.php  # Request payload with #[TypeScript]
│   ├── Comments/
│   │   ├── CommentResponseData.php
│   │   └── CreateCommentPayload.php
│   └── Users/
│       └── UserReferenceData.php
├── Http/Controllers/
│   ├── PostController.php         # Inertia controllers
│   └── CommentController.php
└── Models/
    ├── Post.php
    ├── Comment.php
    └── User.php

resources/
├── js/
│   ├── pages/Posts/               # React/Inertia pages
│   │   ├── Index.tsx
│   │   ├── Show.tsx
│   │   └── Create.tsx
│   ├── types/
│   │   └── generated.d.ts         # Auto-generated TypeScript types
│   └── actions/                   # Laravel Wayfinder generated actions
│       └── App/Http/Controllers/
│           ├── PostController.ts
│           └── CommentController.ts
```

## 🔧 Key Components

### 1. Spatie Data Objects

Our Data objects use the `#[TypeScript]` attribute to generate TypeScript types:

```php
<?php

namespace App\Data\Posts;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\LaravelData\Data;

#[TypeScript]
class PostResponseData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public string $content,
        public string $slug,
        public bool $isPublished,
        public UserReferenceData $author,
        public int $commentsCount,
        public string $createdAt,
        public string $updatedAt,
    ) {}

    public static function fromModel(Post $post): self
    {
        return new self(
            id: $post->id,
            title: $post->title,
            content: $post->content,
            slug: $post->slug,
            isPublished: $post->is_published,
            author: UserReferenceData::fromModel($post->user),
            commentsCount: $post->comments()->count(),
            createdAt: $post->created_at->toISOString(),
            updatedAt: $post->updated_at->toISOString(),
        );
    }
}
```

### 2. Inertia Controllers

Controllers return Data objects directly to the frontend:

```php
<?php

namespace App\Http\Controllers;

use App\Data\Posts\PostResponseData;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::with(['user', 'comments'])
            ->where('is_published', true)
            ->latest()
            ->paginate(10);

        $postsData = $posts->through(fn (Post $post) => PostResponseData::fromModel($post));

        return Inertia::render('Posts/Index', [
            'posts' => $postsData,
        ]);
    }
}
```

### 3. TypeScript Generation

Run this command to generate TypeScript types from your PHP Data objects:

```bash
php artisan typescript:transform
```

This creates `resources/js/types/generated.d.ts` with types like:

```typescript
declare namespace App.Data.Posts {
export type PostResponseData = {
id: number;
title: string;
content: string;
slug: string;
isPublished: boolean;
author: App.Data.Users.UserReferenceData;
commentsCount: number;
createdAt: string;
updatedAt: string;
};
}
```

### 4. Type-Safe React Components

React components use the generated types for full type safety with Inertia v2 Form components:

```tsx
import { PostResponseData } from '@/types/generated'
import PostController from '@/actions/App/Http/Controllers/PostController'

interface Props {
  posts: {
    data: PostResponseData[]
    links: any[]
  }
}

export default function PostsIndex({ posts }: Props) {
  return (
    <div>
      {posts.data.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>By {post.author.name}</p>
          <p>{post.commentsCount} comments</p>
          <Link href={PostController.show({ post: post.id }).url}>
            Read more
          </Link>
        </div>
      ))}
    </div>
  )
}
```

## 🎨 Features Demonstrated

### ✅ Type-Safe API Contracts
- PHP Data objects automatically generate TypeScript types
- No manual type definitions needed
- Compile-time type checking across the entire stack

### ✅ Inertia.js v2 Integration
- Server-side rendering with type safety
- Laravel Wayfinder for type-safe route generation
- Inertia v2 Form components with proper error handling
- No separate API endpoints needed
- Seamless data flow from backend to frontend

### ✅ Modern Laravel 12 Features
- PHP 8.4+ syntax with property promotion
- Laravel 12 streamlined structure
- Modern Eloquent relationships

### ✅ React + TypeScript Frontend
- Full type safety in React components
- Auto-completion and IntelliSense
- Refactoring safety

## 🔄 Development Workflow

1. **Create/Update Data Objects**: Add `#[TypeScript]` attribute to your PHP classes
2. **Generate Types**: Run `php artisan typescript:transform`
3. **Build Frontend**: Use the generated types in your React components
4. **Type Safety**: Enjoy compile-time type checking across your entire stack!

## 🧪 Testing the Type Safety

Try these experiments to see the type safety in action:

1. **Change a property name** in a Data object and regenerate types
2. **Add a new property** to a Data object
3. **Remove a property** from a Data object
4. **Change a property type** (e.g., `string` to `number`)

In each case, TypeScript will catch the mismatches in your React components!

## 📚 Learn More

- [Spatie Laravel Data Documentation](https://spatie.be/docs/laravel-data)
- [TypeScript Transformer Documentation](https://github.com/spatie/typescript-transformer)
- [Inertia.js Documentation](https://inertiajs.com/)
- [Laravel 12 Documentation](https://laravel.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 🙏 Acknowledgments

- [Spatie](https://spatie.be/) for the amazing Laravel Data and TypeScript Transformer packages
- [Laravel](https://laravel.com/) for the incredible framework
- [Inertia.js](https://inertiajs.com/) for bridging server and client-side development

---

**Happy coding with end-to-end type safety! 🚀**
