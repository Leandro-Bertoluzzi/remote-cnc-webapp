import Head from "next/head";

export default function NotFound() {
    return (
        <>
            <Head>
                <title>Página no encontrada</title>
                <meta name="description" content="Please log in before using the app" />
            </Head>
            <section className="bg-gradient-gray2 relative overflow-hidden">
                <div className="container relative z-10 mx-auto px-4">
                    <div className="flex flex-wrap">
                        <div className="w-full p-6">
                            <div className="mx-auto text-center md:max-w-xl">
                                <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-xl">
                                    Lo sentimos, esta página no se encuentra disponible!
                                </h2>
                                <p className="text-base text-gray-600">
                                    <a className="text-blue-900 hover:text-blue-400" href="/">
                                        Volver al inicio
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
