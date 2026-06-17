import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PoliticaDePrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-36 pb-24">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-grafito mb-2">
            Política de Privacidad
          </h1>
          <p className="text-sm text-grafito/50 mb-10">
            Última actualización: 16 de junio de 2026
          </p>

          <div className="flex flex-col gap-6 text-grafito/80 leading-relaxed">
            <p>
              Esta Política de Privacidad describe cómo Loreto Consultora (&quot;nosotros&quot;, &quot;nuestro&quot; o &quot;la empresa&quot;) recopila, usa y protege la información cuando interactúas con nuestras cuentas y automatizaciones en Instagram.
            </p>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-grafito mt-4 mb-3">1. Quiénes somos</h2>
              <p>
                Loreto Consultora es un negocio dedicado a la consultoría y formación, identificado en Instagram bajo el usuario @anyvillegas.v. Puedes contactarnos en cualquier momento a través de hello@loretoconsultora.lat.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-grafito mt-4 mb-3">2. Qué información recopilamos</h2>
              <p className="mb-3">
                Cuando interactúas con nuestras publicaciones o historias de Instagram comentando o respondiendo con ciertas palabras clave (por ejemplo, la palabra &quot;clase&quot;), nuestra automatización puede recopilar y procesar la siguiente información, proporcionada directamente por la plataforma de Instagram a través de su API oficial:
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-1.5">
                <li>Tu nombre de usuario de Instagram</li>
                <li>El identificador único de tu cuenta de Instagram (ID de usuario)</li>
                <li>El contenido del comentario o mensaje que enviaste</li>
                <li>El identificador de la publicación o historia en la que comentaste</li>
              </ul>
              <p className="mt-3">
                No solicitamos ni recopilamos contraseñas, datos financieros, ni ninguna otra información sensible a través de esta automatización.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-grafito mt-4 mb-3">3. Cómo usamos tu información</h2>
              <p className="mb-3">Usamos la información anterior exclusivamente para:</p>
              <ul className="list-disc pl-6 flex flex-col gap-1.5">
                <li>Identificar que tu comentario o respuesta a una historia contiene una palabra clave relacionada con nuestras masterclasses</li>
                <li>Responder públicamente a tu comentario con un mensaje de confirmación</li>
                <li>
                  Enviarte, por mensaje directo de Instagram, el enlace de registro a la masterclass correspondiente:{" "}
                  <a href="https://loretoconsultora.lat/eventos/registro-masterclass" className="underline" style={{ color: "#c0005a" }}>
                    https://loretoconsultora.lat/eventos/registro-masterclass
                  </a>
                </li>
              </ul>
              <p className="mt-3">
                No utilizamos esta información para ningún otro propósito, no la vendemos, ni la compartimos con terceros con fines publicitarios.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-grafito mt-4 mb-3">4. Con quién compartimos la información</h2>
              <p className="mb-3">No compartimos tu información personal con terceros, salvo:</p>
              <ul className="list-disc pl-6 flex flex-col gap-1.5">
                <li>Cuando es necesario para operar la automatización a través de proveedores de infraestructura técnica que actúan como procesadores de datos en nuestro nombre (por ejemplo, plataformas de automatización de flujos de trabajo), bajo medidas de confidencialidad equivalentes a las descritas en este documento</li>
                <li>Cuando la ley nos obligue a hacerlo</li>
              </ul>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-grafito mt-4 mb-3">5. Almacenamiento y conservación de datos</h2>
              <p>
                La información recopilada se procesa únicamente durante el tiempo necesario para responder a tu interacción y enviarte el enlace solicitado. No mantenemos un registro permanente de comentarios o conversaciones más allá de lo necesario para fines operativos y de soporte.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-grafito mt-4 mb-3">6. Tus derechos</h2>
              <p className="mb-3">Puedes solicitarnos en cualquier momento:</p>
              <ul className="list-disc pl-6 flex flex-col gap-1.5">
                <li>Información sobre los datos que tenemos asociados a tu cuenta de Instagram</li>
                <li>La eliminación de dichos datos</li>
                <li>Aclaraciones sobre el uso que hacemos de tu información</li>
              </ul>
              <p className="mt-3">
                Para ejercer cualquiera de estos derechos, contáctanos en hello@loretoconsultora.lat.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-grafito mt-4 mb-3">7. Seguridad</h2>
              <p>
                Implementamos medidas técnicas razonables para proteger la información procesada por esta automatización, incluyendo el uso de tokens de acceso seguros y verificación de origen de las solicitudes recibidas a través de la API de Instagram.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-grafito mt-4 mb-3">8. Cambios a esta política</h2>
              <p>
                Podemos actualizar esta Política de Privacidad ocasionalmente. Cualquier cambio será publicado en esta misma página con la fecha de actualización correspondiente.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-grafito mt-4 mb-3">9. Contacto</h2>
              <p>
                Si tienes preguntas sobre esta Política de Privacidad o sobre cómo manejamos tu información, escríbenos a hello@loretoconsultora.lat.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
