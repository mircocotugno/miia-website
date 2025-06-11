import { Logo } from '@public/logo'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { tv } from 'tailwind-variants'
import { Link, Button } from '@heroui/react'

export default function Feedback() {
  const router = useRouter()
  const params = router.query

  if (!params) {
    return router.replace('/')
  }

  let collegamentoCorso
  if (params.corso) {
    const corsoParam = Array.isArray(params.corso)
      ? params.corso[0]
      : params.corso
    const paths = corsoParam.split('-')
    collegamentoCorso = `corsi/${paths[0]}/corso-${paths[0]}-${paths[1]}-livello`
  }

  const { title, subtitle, description, wrapper } = classes()

  return (
    <main>
      <section className="relative flex flex-col justify-center p-6 sm:py-8 md:py-10 lg:py-12 max-w-[1280px] min-h-inherit mx-auto h-screen">
        <div className="absolute top-8 left-8">
          <Logo
            classes="md:max-lg:hidden"
            // primary={theme == 'dark' ? '#F3F3F2' : '#262C2A'}
            // secondary={theme == 'dark' ? '#686D6C' : '#262C2A'}
            primary="#262C2A"
            secondary="#262C2A"
          />
        </div>
        <div className={wrapper()}>
          {params.studente && (
            <Fragment>
              <h1 className={title()}>
                <span>Grazie {params.nome || null},</span>
                <br />
                <span className="text-5xl">
                  grazie per aver confermato la tua identità!
                </span>
              </h1>
              <p className={description()}>
                Abbiamo ricevuto la tua richiesta: a breve ti invieremo una mail
                con tutte le informazioni necessarie. Nel frattempo, puoi
                visitare il nostro blog e scoprire gli ultimi eventi e
                approfondimenti dal mondo dell’interior design.
              </p>
              <Button href="/blog" color="primary" as={Link}>
                Visita il blog
              </Button>
            </Fragment>
          )}
          {params.cliente && (
            <Fragment>
              <h1 className={title()}>
                <span>Buongiorno {params.nome || null},</span>
                <br />
                <span className="text-5xl">
                  la ringraziamo per aver confermato la sua identità.
                </span>
              </h1>
              <p className={description()}>
                Abbiamo ricevuto la sua richiesta: a breve le invieremo una mail
                con tutte le informazioni necessarie. Nel frattempo, può
                visitare il nostro blog e scoprire gli ultimi eventi e
                approfondimenti dal mondo dell’interior design.
              </p>
              <Button href="/blog" color="primary" as={Link}>
                Visita il blog
              </Button>
            </Fragment>
          )}
          {params.openday && (
            <Fragment>
              <h1 className={title()}>
                <span>Buongiorno {params.nome || null},</span>
                <br />
                <span className="text-5xl">
                  grazie per aver confermato la tua partecipazione all’Open Day!
                </span>
              </h1>
              <p className={description()}>
                Nelle prossime ore riceverai via mail il link per accedere
                all’incontro. Se vuoi iniziare a farti un’idea dei temi che
                affronteremo, visita la pagina del corso.
              </p>
              {collegamentoCorso && (
                <Button href={collegamentoCorso} color="primary" as={Link}>
                  Visita la pagina
                </Button>
              )}
            </Fragment>
          )}
        </div>
      </section>
    </main>
  )
}

const classes = tv({
  slots: {
    title: 'font-serif font-black text-6xl mb-6',
    subtitle: 'font-sans font-medium text-3xl mb-3',
    description: 'font-sans text-lg mb-12',
    wrapper: 'md:max-w-2/3',
  },
})
