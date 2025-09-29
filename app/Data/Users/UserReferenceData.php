<?php

namespace App\Data\Users;

use App\Models\User;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\LaravelData\Data;

#[TypeScript]
class UserReferenceData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
    ) {}

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
        );
    }
}
