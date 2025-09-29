import { Head, Link, Form } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import InputError from '@/components/input-error'
import PostController from '@/actions/App/Http/Controllers/PostController'
import { Textarea } from '@/components/ui/textarea'
import { BreadcrumbItem } from '@/types'
import { create } from '@/routes/posts'
import AppLayout from '@/layouts/app-layout'
import Heading from '@/components/heading'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: PostController.index().url,
    },
    {
        title: 'Create Post',
        href: create().url,
    },
];

export default function PostCreate() {
  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Create Post" /> 
        
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
          <Heading title="Create New Post" description="Share your thoughts with the community" />
          
          <Card>
            <CardContent className="pt-6">
              <Form
                action={PostController.store().url}
                method="post"
                className="space-y-6"
                resetOnSuccess
              >
                {({ processing, errors }) => (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Enter your post title..."
                        required
                        aria-invalid={!!errors.title}
                        aria-describedby={errors.title ? "title-error" : undefined}
                      />
                      <InputError message={errors.title} id="title-error" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="Write your post content here..."
                        rows={12}
                        required
                        aria-invalid={!!errors.content}
                        aria-describedby={errors.content ? "content-error" : undefined}
                      />
                      <InputError message={errors.content} id="content-error" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isPublished"
                        name="isPublished"
                        value="1"
                      />
                      <Label htmlFor="isPublished" className="text-sm font-normal">
                        Publish immediately
                      </Label>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        asChild
                      >
                        <Link href={PostController.index().url}>
                          Cancel
                        </Link>
                      </Button>
                      <Button
                        type="submit"
                        disabled={processing}
                      >
                        {processing ? 'Creating...' : 'Create Post'}
                      </Button>
                    </div>
                  </>
                )}
              </Form>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </>
  )
}