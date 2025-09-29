<?php

namespace App\Data\Posts;

use App\Data\Users\UserReferenceData;
use App\Models\Post;
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
