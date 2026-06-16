import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nombre, telefono, lada, correo, empresa, consultorias, comentarios } = body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  const listaConsultorias = Array.isArray(consultorias) && consultorias.length
    ? (consultorias as string[]).map((c) => `• ${c}`).join("\n")
    : "Ninguna seleccionada";

  const html = `
    <h2>Nuevo contacto de consultorías</h2>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Teléfono:</strong> +${lada} ${telefono}</p>
    <p><strong>Correo:</strong> ${correo}</p>
    <p><strong>Empresa:</strong> ${empresa || "—"}</p>
    <p><strong>Consultorías de interés:</strong></p>
    <pre>${listaConsultorias}</pre>
    <p><strong>Comentarios:</strong> ${comentarios || "—"}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"Loreto Consultora Web" <${process.env.SMTP_USER}>`,
      to: "hello@loretoconsultora.lat",
      subject: `Nueva consulta de ${nombre}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("SMTP error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
