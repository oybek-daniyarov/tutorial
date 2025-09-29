<?php

namespace App\Data\Posts;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\LaravelData\Data;

#[TypeScript]
class CreatePostPayload extends Data
{
    public function __construct(
        public string $title,
        public string $content,
        public bool $isPublished = false,
    ) {}

    public static function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'isPublished' => ['boolean'],
        ];
    }
}
