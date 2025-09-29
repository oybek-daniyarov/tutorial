<?php

namespace App\Http\Controllers;

use App\Data\Posts\CreatePostPayload;
use App\Data\Posts\PostResponseData;
use App\Data\Comments\CommentResponseData;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::with(['user', 'comments.user'])
            ->where('is_published', true)
            ->latest()
            ->paginate(10);

        return Inertia::render('Posts/Index', [
            'posts' => PostResponseData::collect($posts),
        ]);
    }

    public function show(Post $post): Response
    {
        $post->load(['user', 'comments.user']);

        return Inertia::render('Posts/Show', [
            'post' => PostResponseData::fromModel($post),
            'comments' => CommentResponseData::collect($post->comments),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Posts/Create');
    }

    public function store(CreatePostPayload $data): \Illuminate\Http\RedirectResponse
    {
        $post = Post::create([
            'title' => $data->title,
            'content' => $data->content,
            'is_published' => $data->isPublished,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('posts.show', $post)
            ->with('success', 'Post created successfully!');
    }
}
