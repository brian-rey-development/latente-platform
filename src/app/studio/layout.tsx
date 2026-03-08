export default function StudioLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
