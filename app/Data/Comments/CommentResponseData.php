<?php

namespace App\Data\Comments;

use App\Data\Users\UserReferenceData;
use App\Models\Comment;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\LaravelData\Data;

#[TypeScript]
class CommentResponseData extends Data
{
    public function __construct(
        public int $id,
        public string $content,
        public UserReferenceData $author,
        public int $postId,
        public string $createdAt,
        public string $updatedAt,
    ) {}

    public static function fromModel(Comment $comment): self
    {
        return new self(
            id: $comment->id,
            content: $comment->content,
            author: UserReferenceData::fromModel($comment->user),
            postId: $comment->post_id,
            createdAt: $comment->created_at->toISOString(),
            updatedAt: $comment->updated_at->toISOString(),
        );
    }
}
