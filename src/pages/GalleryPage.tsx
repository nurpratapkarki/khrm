import { useApi } from '@/hooks/useApi';
import { mediaApi, type MediaAlbum } from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Images } from 'lucide-react';
import { Link } from 'react-router-dom';

 type AlbumsByType = Record<string, MediaAlbum[]>;

export default function GalleryPage() {
  const { data, loading, error } = useApi<AlbumsByType>(
    () => mediaApi.getAlbumsByType(),
    []
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
          <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Gallery</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  const hasAlbums = data && Object.values(data).some((group) => group.length > 0);

  return (
    <div className="flex flex-col">
      <section className="relative bg-linear-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 flex items-center gap-2 w-fit">
              <Images className="h-4 w-4" />
              Visual Stories From Our Work
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Photo Gallery</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore moments from our recruitment drives, trainings, orientations and client visits
              that showcase how we prepare and deploy skilled manpower from Nepal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 space-y-16">
          {!hasAlbums && (
            <p className="text-muted-foreground text-center">Gallery will be updated soon.</p>
          )}

          {data &&
            Object.entries(data)
              .filter(([, albums]) => albums.length > 0)
              .map(([typeKey, albums]) => {
                const label = albums[0]?.album_type_display ?? typeKey;
                return (
                  <div key={typeKey} className="space-y-6">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <h2 className="text-2xl md:text-3xl font-bold">{label}</h2>
                      <p className="text-sm text-muted-foreground">
                        {albums.length} album{albums.length !== 1 && 's'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {albums.map((album) => (
                        <Link
                          key={album.id}
                          to={`/gallery/${album.slug}`}
                          className="group"
                        >
                          <Card className="overflow-hidden h-full flex flex-col">
                            <div className="relative aspect-4/3 overflow-hidden">
                              <img
                                src={album.cover_image}
                                alt={album.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-80" />
                              <div className="absolute bottom-3 left-3 text-xs text-white flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5">
                                  <Images className="h-3 w-3" />
                                  {album.photo_count ?? 0} photos
                                </span>
                              </div>
                            </div>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg line-clamp-2">{album.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 pb-4 flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(album.date).toLocaleDateString()}</span>
                              </div>
                              <span>{album.album_type_display}</span>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
        </div>
      </section>
    </div>
  );
}

