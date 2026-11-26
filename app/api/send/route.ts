import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, eventType, guests, date, duration, location, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: "Les champs nom, email et message sont obligatoires." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "L'adresse email est invalide." },
        { status: 400 }
      );
    }

    const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; }
    .header { background: #0C1915; padding: 32px 24px; text-align: center; }
    .header h1 { color: #C9A96E; font-size: 22px; margin: 0; letter-spacing: 0.08em; }
    .header p { color: #c8c0b4; font-size: 13px; margin: 6px 0 0; }
    .body { padding: 32px 24px; }
    .section-title { color: #0C1915; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 12px; border-bottom: 1px solid #e8e0d4; padding-bottom: 6px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    td { padding: 8px 0; font-size: 14px; vertical-align: top; }
    td:first-child { color: #8A7B68; width: 40%; font-weight: 600; }
    td:last-child { color: #111; }
    .message-box { background: #f9f7f4; border-left: 3px solid #C9A96E; padding: 14px 16px; border-radius: 2px; font-size: 14px; color: #333; line-height: 1.6; white-space: pre-wrap; }
    .footer { background: #0C1915; padding: 20px 24px; text-align: center; }
    .footer p { color: #8A7B68; font-size: 11px; margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Good Old Drinks</h1>
      <p>Nouvelle demande de contact</p>
    </div>
    <div class="body">
      <p class="section-title">Coordonnées</p>
      <table>
        <tr><td>Nom</td><td>${name}</td></tr>
        <tr><td>Email</td><td>${email}</td></tr>
      </table>

      <p class="section-title">Détails de l'événement</p>
      <table>
        <tr><td>Type d'événement</td><td>${eventType || "—"}</td></tr>
        <tr><td>Nombre d'invités</td><td>${guests || "—"}</td></tr>
        <tr><td>Date</td><td>${date || "—"}</td></tr>
        <tr><td>Durée</td><td>${duration || "—"}</td></tr>
        <tr><td>Lieu</td><td>${location || "—"}</td></tr>
      </table>

      <p class="section-title">Message</p>
      <div class="message-box">${message}</div>
    </div>
    <div class="footer">
      <p>Répondez directement à cet email pour contacter ${name} — ${email}</p>
    </div>
  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Good Old Drinks" <${process.env.EMAIL_USER}>`,
      to: "goodolddrinks@gmail.com",
      replyTo: email,
      subject: `Nouvelle demande — ${eventType || "Contact"} — ${name}`,
      html,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Erreur envoi email :", error);
    return Response.json(
      { error: "Erreur lors de l'envoi de l'email. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
