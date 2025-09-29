<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a demo user if none exists
        $user = User::firstOrCreate(
            ['email' => 'demo@example.com'],
            [
                'name' => 'Demo User',
                'password' => bcrypt('password'),
            ]
        );

        // Create sample posts
        $posts = [
            [
                'title' => 'Getting Started with Laravel Data and TypeScript',
                'content' => "Laravel Data with TypeScript Transformer provides end-to-end type safety between your Laravel backend and frontend. This powerful combination ensures that your API contracts are always in sync with your frontend types.\n\nIn this tutorial, we'll explore how to:\n\n1. Set up Spatie Laravel Data\n2. Configure TypeScript Transformer\n3. Create type-safe API endpoints\n4. Build React components with full type safety\n\nLet's dive in!",
                'is_published' => true,
                'user_id' => $user->id,
            ],
            [
                'title' => 'Building Type-Safe APIs with Inertia.js',
                'content' => "Inertia.js bridges the gap between server-side and client-side development, allowing you to build single-page applications using your favorite server-side framework.\n\nWhen combined with Laravel Data and TypeScript Transformer, you get:\n\n- Compile-time type checking\n- Auto-completion in your IDE\n- Refactoring safety\n- Better developer experience\n\nThis approach eliminates the need for separate API endpoints while maintaining type safety throughout your application.",
                'is_published' => true,
                'user_id' => $user->id,
            ],
            [
                'title' => 'The Future of Full-Stack TypeScript',
                'content' => "TypeScript has revolutionized frontend development, and now with tools like Laravel Data and TypeScript Transformer, we can extend that type safety to our entire stack.\n\nBenefits include:\n\n- Reduced runtime errors\n- Better code maintainability\n- Improved developer productivity\n- Seamless refactoring\n\nThis tutorial demonstrates how to achieve true end-to-end type safety in a Laravel + React application.",
                'is_published' => true,
                'user_id' => $user->id,
            ],
        ];

        foreach ($posts as $postData) {
            $post = Post::create($postData);

            // Add some comments to each post
            $comments = [
                'Great tutorial! This is exactly what I was looking for.',
                'The type safety benefits are incredible. No more guessing what the API returns!',
                'This approach has saved me hours of debugging. Highly recommended!',
            ];

            foreach ($comments as $commentContent) {
                Comment::create([
                    'content' => $commentContent,
                    'post_id' => $post->id,
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}
