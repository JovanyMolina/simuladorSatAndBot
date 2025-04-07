export async function POST(request) {
  const body = await request.json();
  const { certificatePath, keyPath, privateKeyPassword, rfc } = body;

  if (!certificatePath || !keyPath || !privateKeyPassword || !rfc) {
    return Response.json(
      { success: false, message: "Por favor llena todos los campos." },
      { status: 400 }
    );
  }
  const numeroAleatorio = Math.floor(Math.random() * 11);
  console.log("Número aleatorio:", numeroAleatorio);

  switch (numeroAleatorio) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return Response.json(
        {
          success: true,
          message: "Inicio de sesión exitoso (modo normal)",
        },
        {
          status: 200,
        }
      );

    case 6:
      await new Promise((resolve) => setTimeout(resolve, 30000)); //30 segundos
      return Response.json(
        {
          success: true,
          message: "Inicio de sesión exitoso después de 30 segundos.",
        },
        {
          status: 200,
        }
      );

    case 7:
      return Response.json(
        {
          success: false,
          message: "Error interno",
        },
        {
          status: 400,
        }
      );
    case 8:
      await new Promise((resolve) => setTimeout(resolve, 30000)); //30 segundos
      return Response.json(
        {
          success: false,
          message: "Error interno después de 30 segundos.",
        },
        {
          status: 400,
        }
      );
    case 9:
      await new Promise((resolve) => setTimeout(resolve, 2 * 60 * 1000)); //esto son 2 min
      return Response.json(
        {
          success: false,
          message: "La pagina ha tardado demasiado en responder.",
        },
        {
          status: 503,
        }
      );
    case 10:
      return Response.json(
        {
          success: false,
          message: "La pagina se encuentra en mantenimiento.",
        },
        {
          status: 503,
        }
      );
    default:
      return Response.json(
        {
          success: false,
          message: "Modo no reconocido.",
        },
        {
          status: 400,
        }
      );
  }
}
