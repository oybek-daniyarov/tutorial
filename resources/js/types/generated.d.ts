declare namespace App.Data.Comments {
    export type CommentResponseData = {
        id: number;
        content: string;
        author: App.Data.Users.UserReferenceData;
        postId: number;
        createdAt: string;
        updatedAt: string;
    };
    export type CreateCommentPayload = {
        content: string;
        postId: number;
    };
}
declare namespace App.Data.Posts {
    export type CreatePostPayload = {
        title: string;
        content: string;
        isPublished: boolean;
    };
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
declare namespace App.Data.Users {
    export type UserReferenceData = {
        id: number;
        name: string;
        email: string;
    };
}
