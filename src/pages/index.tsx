import { useState } from "react";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { Github, Link, Linkedin, Mail, Menu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export async function getStaticProps({ locale }: { locale: string }) {
  const messages = (await import(`../public/messages/${locale}.json`)).default;
  return {

    props: {
      messages
    }
  };
}


export default function Home() {
  const t = useTranslations();
  const [open, setOpen] = useState(false); // Estado para controlar o menu


  const projects = [
    {
      title: "Neko Tracking",
      description: t("projectDesc1"), // Aqui você chama t() para a tradução
      image: "https://media1.tenor.com/m/BnIPE5qUprgAAAAd/luna-sailor-moon.gif",
      github: "https://github.com/DaniloCDev/neko-Tracking",
    },
    {
      title: "NiceTools",
      description:
      t("projectDesc2"), 
      image: "https://media1.tenor.com/m/bxKtMMCp8WsAAAAd/anime-cute.gif",
      github: "https://github.com/DaniloCDev/NiceTools",
    },
    {
      title: "Person API",
      description:
      t("projectDesc3"), 
      image: "https://giffiles.alphacoders.com/370/3703.gif",
      github: "https://github.com/DaniloCDev/csharp_webapi_mysql",
    },
  ];

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Botão para abrir o menu em telas menores */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setOpen(true)} // Abre o menu
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Passe o estado e a função para o MainNav */}
      <MainNav open={open} setOpen={setOpen} />

      <main className="flex min-h-screen flex-col items-start justify-start pt-16 md:ml-64">
        <div className=" container px-4 md:px-6 text-left">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Danilo Lopes</h1>
          <p className="mt-4 text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>
        <section id="about" className="w-full py-6 md:py-10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start justify-start space-y-4 text-left">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-200">{t("about")}</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl">
                {t("aboutText")}
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="w-full py-1 md:py-4 lg:py-2">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start justify-start space-y-4 text-left">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-200">{t("projects")}</h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("projectsDescription")}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                  <Card key={index} className="max-w-[280px] overflow-hidden bg-gray-900 border-gray-700">
                    <img
                      src={project.image}
                      width={250}
                      height={160}
                      alt={project.title}
                      className="aspect-video object-cover"
                    />
                    <CardContent className="p-3">
                      <h3 className="text-lg font-bold text-gray-200">{project.title}</h3>
                      <p className="text-xs text-gray-400">{project.description}</p>
                      <div className="mt-3 flex justify-start">
                        <a
                          href={project.github}
                          target="_blank"
                          className="w-full py-2 text-base text-gray-300 hover:text-gray-400 hover:bg-gray-700 flex justify-start items-center gap-2"
                        >
                          <Github className="h-5 w-5" />
                          Code
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="w-full py-6 md:py-6 lg:py-10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start justify-start space-y-4 text-left">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-200">Skills</h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("skillsDescription")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {[
                  "JavaScript",
                  "TypeScript",
                  "C#/.Net Core",
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
                    className="flex items-center justify-start rounded-lg border border-gray-700 bg-gray-900 p-4 shadow-sm"
                  >
                    <span className="font-medium text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-6 md:py-6 lg:py-10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start justify-start space-y-4 text-left">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-200">{t("getTouch")}</h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("getTouchDescription")}
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[600px]:flex-row">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-gray-200 hover:bg-gray-700 gap-1 flex items-center"
                >
                  <a href="mailto:hello@example.com" className="flex items-center">
                    <Mail className="h-8 w-8" /> {/* Tamanho aumentado para 24px */}
                    <span>Email</span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-gray-200 hover:bg-gray-700 gap-1 flex items-center"
                >
                  <a href="https://github.com/DaniloCDev" className="flex items-center">
                    <Github className="h-6 w-6" />
                    <span>Github</span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-gray-900 hover:bg-gray-700 gap-1 flex items-center"
                >
                  <a href="https://www.linkedin.com/in/danilo-c-dev/" className="flex items-center">
                    <span>Linkedin</span>
                  </a>
                </Button>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
