import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import PostController from '@/actions/App/Http/Controllers/PostController'
import { BreadcrumbItem, Pagination } from '@/types'
import { Plus, MessageCircle, Calendar } from 'lucide-react'
import AppLayout from '@/layouts/app-layout'
import Heading from '@/components/heading'

interface Props {
  posts: Pagination<App.Data.Posts.PostResponseData>
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: PostController.index().url,
    },
];

export default function PostsIndex({ posts }: Props) {
    console.log(PostController.create().url);
  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Posts" />

       <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="flex items-center justify-between">
            <Heading title="Posts" description="Discover amazing content from our community" />
            <Button asChild>
                <Link href={PostController.create().url}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Post
                </Link>
            </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.data.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {post.author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{post.author.name}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="flex items-center">
                      <MessageCircle className="mr-1 h-3 w-3" />
                      {post.commentsCount} {post.commentsCount === 1 ? 'comment' : 'comments'}
                    </Badge>
                    
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={PostController.show({ post: post.id }).url}>
                        Read more →
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {posts.links && (
            <div className="mt-8 flex justify-center">
              <nav className="flex space-x-2">
                {posts.links.map((link, index) => (
                  <Button
                    key={index}
                    variant={link.active ? "default" : "outline"}
                    size="sm"
                    asChild
                    disabled={!link.url}
                  >
                    <Link
                      href={link.url || '#'}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  </Button>
                ))}
              </nav>
            </div>
          )}
       </div>
      </AppLayout>
    </>
  )
}
