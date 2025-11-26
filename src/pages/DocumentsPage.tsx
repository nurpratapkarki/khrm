import type React from 'react';
import { useApi } from '@/hooks/useApi';
import { documentApi, type Document } from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, FileText, FileSpreadsheet, FileSignature, FileCheck2 } from 'lucide-react';

type DocumentsByType = Record<string, Document[]>;

const typeIcons: Record<string, React.ReactNode> = {
  employer_form: <FileText className="h-4 w-4" />,
  candidate_form: <FileSpreadsheet className="h-4 w-4" />,
  demand_letter: <FileSignature className="h-4 w-4" />,
  power_of_attorney: <FileSignature className="h-4 w-4" />,
  medical_checklist: <FileCheck2 className="h-4 w-4" />,
  policy: <FileText className="h-4 w-4" />,
  other: <FileText className="h-4 w-4" />,
};

function handleDownload(documentId: number) {
  // Fire-and-forget: track download and then open returned URL in new tab.
  documentApi
    .trackDownload(documentId)
    .then((res) => {
      if (res?.file_url) {
        window.open(res.file_url, '_blank');
      }
    })
    .catch((err) => {
      console.error('Error tracking document download', err);
    });
}

export default function DocumentsPage() {
  const { data, loading, error } = useApi<DocumentsByType>(
    () => documentApi.getDocumentsByType(),
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
          <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Documents</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  const hasDocuments = data && Object.values(data).some((group) => group.length > 0);

  return (
    <div className="flex flex-col">
      <section className="relative bg-linear-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 flex items-center gap-2 w-fit">
              <Download className="h-4 w-4" />
              Forms & Downloads
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Downloads</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Access important forms and documents related to recruitment, employment and compliance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 space-y-16">
          {!hasDocuments && (
            <p className="text-muted-foreground text-center">Downloads will be available soon.</p>
          )}

          {data &&
            Object.entries(data)
              .filter(([, docs]) => docs.length > 0)
              .map(([typeKey, docs]) => {
                const label = docs[0]?.document_type_display ?? typeKey;
                return (
                  <div key={typeKey} className="space-y-6">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <h2 className="text-2xl md:text-3xl font-bold">{label}</h2>
                      <p className="text-sm text-muted-foreground">
                        {docs.length} document{docs.length !== 1 && 's'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {docs.map((doc) => (
                        <Card key={doc.id} className="flex flex-col justify-between">
                          <CardHeader>
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
                                {typeIcons[typeKey] ?? <FileText className="h-4 w-4" />}
                              </div>
                              <div>
                                <CardTitle className="text-lg mb-1">{doc.title}</CardTitle>
                                {doc.description && (
                                  <p className="text-sm text-muted-foreground line-clamp-3">
                                    {doc.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="flex items-center justify-between pt-0 pb-4 text-xs text-muted-foreground">
                            <div>
                              <p>Downloads: {doc.download_count}</p>
                              <p>Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}</p>
                            </div>
                            <Button size="sm" className="ml-4" onClick={() => handleDownload(doc.id)}>
                              <Download className="h-4 w-4 mr-2" /> Download
                            </Button>
                          </CardContent>
                        </Card>
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

