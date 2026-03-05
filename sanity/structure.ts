import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Efnisstjóri')
    .items([
      S.listItem()
        .title('Stillingar síðu')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.listItem()
        .title('Ljósmyndir')
        .schemaType('photo')
        .child(S.documentTypeList('photo').title('Ljósmyndir')),
      S.listItem()
        .title('Söfn / Verkefni')
        .schemaType('gallery')
        .child(S.documentTypeList('gallery').title('Söfn')),
    ])
