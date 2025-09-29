import { Head, Link, Form } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import InputError from '@/components/input-error'
import PostController from '@/actions/App/Http/Controllers/PostController'
import CommentController from '@/actions/App/Http/Controllers/CommentController'
import { MessageCircle, Calendar, ArrowLeft } from 'lucide-react'
import { BreadcrumbItem } from '@/types'
import { show } from '@/routes/posts'
import AppLayout from '@/layouts/app-layout'
import Heading from '@/components/heading'

interface Props {
  post: App.Data.Posts.PostResponseData
  comments: App.Data.Comments.CommentResponseData[]
}

export default function PostShow({ post, comments }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: PostController.index().url,
    },
    {
        title: post.title,
        href: show({ post: post.id }).url,
    },
  ];

  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title={post.title} />
        
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
          <div className="flex items-center justify-between">
            <Heading title={post.title} description={`By ${post.author.name} • ${new Date(post.createdAt).toLocaleDateString()}`} />
            <Button variant="ghost" asChild>
              <Link href={PostController.index().url}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Posts
              </Link>
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">By {post.author.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <Badge variant="secondary" className="flex items-center">
                  <MessageCircle className="mr-1 h-3 w-3" />
                  {post.commentsCount} {post.commentsCount === 1 ? 'comment' : 'comments'}
                </Badge>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Comments</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Comment Form */}
              <Form
                action={CommentController.store().url}
                method="post"
                className="mb-8"
                resetOnSuccess
              >
                {({ processing, errors }) => (
                  <div className="space-y-4">
                   <input type="hidden" name="postId" value={post.id} />
                    <div className="space-y-2">
                      <Label htmlFor="content">Add a comment</Label>
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="Share your thoughts..."
                        rows={4}
                        required
                        aria-invalid={!!errors.content}
                        aria-describedby={errors.content ? "content-error" : undefined}
                      />
                      <InputError message={errors.content} id="content-error" />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={processing}
                    >
                      {processing ? 'Posting...' : 'Post Comment'}
                    </Button>
                  </div>
                )}
              </Form>

              <Separator className="my-6" />

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {comment.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">{comment.author.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-foreground whitespace-pre-wrap pl-8">{comment.content}</p>
                    {comment.id !== comments[comments.length - 1]?.id && <Separator />}
                  </div>
                ))}
                
                {comments.length === 0 && (
                  <div className="text-center py-8">
                    <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </>
  )
}
