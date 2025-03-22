import { Github, Mail, Linkedin } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-gray-300">
      <header className="sticky top-0 z-10 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Portfolio</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="#about" className="transition-colors hover:text-gray-400">
                About
              </Link>
              <Link href="#projects" className="transition-colors hover:text-gray-400">
                Projects
              </Link>
              <Link href="#skills" className="transition-colors hover:text-gray-400">
                Skills
              </Link>
              <Link href="#contact" className="transition-colors hover:text-gray-400">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button variant="outline" size="icon" className="ml-auto hidden h-8 w-8 md:flex border-gray-700">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </div>
            <nav className="flex items-center md:hidden">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col justify-center space-y-4 max-w-3xl mx-auto text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-200">
                  John Doe
                </h1>
                <p className="text-xl text-gray-400">Full Stack Developer</p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button className="bg-gray-700 hover:bg-gray-600 text-gray-200" asChild>
                  <Link href="#contact">Contact Me</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-gray-200 hover:bg-gray-800"
                  asChild
                >
                  <Link href="#projects">View Projects</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-200">About Me</h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I'm a passionate full stack developer with 5 years of experience building web applications. I
                  specialize in React, Node.js, and modern web technologies. My goal is to create beautiful, functional,
                  and user-friendly applications that solve real-world problems.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-200">Projects</h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out some of my recent work
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden bg-gray-800 border-gray-700">
                    <img
                      src={`/placeholder.svg?height=300&width=400&text=Project+${i}`}
                      width={400}
                      height={300}
                      alt={`Project ${i}`}
                      className="aspect-video object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="text-xl font-bold text-gray-200">Project {i}</h3>
                      <p className="text-sm text-gray-400">
                        A brief description of project {i} and the technologies used.
                      </p>
                      <div className="mt-4 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:text-gray-200 hover:bg-gray-700"
                          asChild
                        >
                          <Link href="#">View Project</Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-300 hover:text-gray-200 hover:bg-gray-700"
                          asChild
                        >
                          <Link href="#">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-200">Skills</h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Technologies and tools I work with
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {[
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "PostgreSQL",
                  "Tailwind CSS",
                  "Git",
                  "Docker",
                  "AWS",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center justify-center rounded-lg border border-gray-700 bg-gray-900 p-4 shadow-sm"
                  >
                    <span className="font-medium text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-200">Get in Touch</h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Feel free to reach out for collaborations or just a friendly hello
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button className="bg-gray-700 hover:bg-gray-600 text-gray-200 gap-1" asChild>
                  <Link href="mailto:hello@example.com">
                    <Mail className="h-4 w-4" />
                    Email
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-gray-200 hover:bg-gray-700 gap-1"
                  asChild
                >
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-gray-200 hover:bg-gray-700 gap-1"
                  asChild
                >
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-gray-800 py-6 bg-gray-900">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} John Doe. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="mailto:hello@example.com" className="text-gray-400 hover:text-gray-300">
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

