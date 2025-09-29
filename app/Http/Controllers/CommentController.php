<?php

namespace App\Http\Controllers;

use App\Data\Comments\CreateCommentPayload;
use App\Models\Post;

class CommentController extends Controller
{
    public function store(CreateCommentPayload $data): \Illuminate\Http\RedirectResponse
    {
        $post = Post::findOrFail($data->postId);

        $post->comments()->create([
            'content' => $data->content,
            'user_id' => auth()->id(),
        ]);

        return redirect()->back()
            ->with('success', 'Comment added successfully!');
    }
}
