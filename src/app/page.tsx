import { PixelButton } from '@/components/ui/PixelButton'
import { PixelPanel } from '@/components/ui/PixelPanel'
import { SectionTitle } from '@/components/ui/SectionTitle'

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-stretch justify-center gap-6 p-6">
      <SectionTitle>UI Demo</SectionTitle>

      <PixelPanel className="p-4">
        <p className="text-sm leading-relaxed">
          可读正文：Noto Sans SC。面板为双线浮雕框，背景色板奶油色。
        </p>
      </PixelPanel>

      <PixelPanel thick className="p-5">
        <p className="font-pixel text-xs leading-loose">Thick Hero Panel</p>
      </PixelPanel>

      <div className="flex flex-wrap gap-3">
        <PixelButton variant="primary">Primary</PixelButton>
        <PixelButton variant="secondary">Secondary</PixelButton>
        <PixelButton href="https://example.com" variant="primary">
          External
        </PixelButton>
      </div>
    </main>
  )
}
