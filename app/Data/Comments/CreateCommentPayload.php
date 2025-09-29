<?php

namespace App\Data\Comments;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\LaravelData\Data;

#[TypeScript]
class CreateCommentPayload extends Data
{
    public function __construct(
        public string $content,
        public int $postId,
    ) {}

    public static function rules(): array
    {
        return [
            'content' => ['required', 'string', 'max:1000'],
            'postId' => ['required', 'integer', 'exists:posts,id'],
        ];
    }
}
