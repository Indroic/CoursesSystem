import { Button, Link } from "@nextui-org/react";

export default function Home( ) {
    return (
      <section className="flex flex-col gap-4 items-center justify-center w-full">
        <Link className="w-full" href="/login/"><Button className="w-full" size="lg" radius="md" color="primary" variant="bordered"> Inicia Sesión</Button></Link>
        <span className="font-bold text-lg text-foreground-400">0</span>
        <Link className="w-full" href="/register/"><Button className="w-full" size="lg" radius="md" color="primary" variant="bordered">Regístrate</Button></Link>
      </section>
    )
}