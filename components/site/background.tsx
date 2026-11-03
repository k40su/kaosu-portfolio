import { CloudShader } from "@/components/ui/cloud-shader"

export function Background() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10">
      <CloudShader
        className="min-h-0"
        speed={1.4}
        count={6}
        maxDpr={1}
        sun={0.06}
        cloudColor="#525252"
        skyTopColor="#0a0a0a"
        skyBottomColor="#1c1c1c"
      />
      <div className="absolute inset-0 bg-linear-to-b from-background/10 via-background/30 to-background/70" />
    </div>
  )
}
