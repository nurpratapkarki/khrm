import { useParams, Link } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { mediaApi, type MediaAlbum } from '@/api';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GalleryAlbumDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data, loading, error } = useApi<MediaAlbum>(
    () => {
      if (!slug) {
        return Promise.reject(new Error('Missing album slug'));
      }
      return mediaApi.getAlbum(slug);
    },
    [slug]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Album</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <section className="relative bg-linear-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="container mx-auto px-4 py-20">
          <Button variant="ghost" size="sm" className="mb-6 pl-0" asChild>
            <Link to="/gallery">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Gallery
            </Link>
          </Button>

          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 flex items-center gap-2 w-fit">
              <Images className="h-4 w-4" />
              {data.album_type_display}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
            {data.description && (
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                {data.description}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(data.date).toLocaleDateString()}
              </span>
              <span className="inline-flex items-center gap-1">
                <Images className="h-4 w-4" />
                {(data.photos?.length ?? data.photo_count ?? 0).toString()} photos
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {data.photos && data.photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.photos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden group">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={photo.image}
                      alt={photo.caption || data.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  {photo.caption && (
                    <CardContent className="py-3 text-sm text-muted-foreground">
                      {photo.caption}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center">Photos will be added to this album soon.</p>
          )}
        </div>
      </section>
    </div>
  );
}

