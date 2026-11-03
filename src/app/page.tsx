import Link from "next/link";
import Image from "next/image";
import OrbitingCirclesGlobe from "@/components/ui/orbiting-circles-02";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto flex items-center justify-between py-6 px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/LOGO.png" alt="Logo" width={40} height={40} />
          <span className="text-xl font-semibold">Arnab Chanda</span>
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="#aboutme">About Me</Link>
          <Link href="#skills">Skills</Link>
          <Link href="#projects">Projects</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </header>

      <main>
        <section id="skills" className="overflow-hidden border-y border-border bg-secondary/40 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Tools and technologies
              </p>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                My skills in orbit
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                A snapshot of the languages, frameworks, and tools I use to bring ideas to life.
              </p>
            </div>
            <div className="mt-8 flex min-h-[500px] w-full items-end justify-center md:mt-10">
              <OrbitingCirclesGlobe />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
