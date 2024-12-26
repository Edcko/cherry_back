import { Cliente, Spa } from "../models/index.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clienteService = {
async getAllClientes(idSpa) {
    return await Cliente.findAll({
    where: { id_spa: idSpa },
    include: [
        {
        model: Spa,
        attributes: [
            "nombre_spa",
            "ciudad",
            "calle",
            "colonia",
            "codigo_postal",
            "telefono",
        ],
        },
    ],
    });
},

async getClienteById(id) {
    return await Cliente.findOne({ where: { id_cliente: id } });
},

async createCliente(data) {
    return await Cliente.create(data);
},

async updateCliente(id, data) {
    const cliente = await Cliente.findOne({ where: { id_cliente: id } });
    if (cliente) {
    return await cliente.update(data);
    } else {
    return null;
    }
},

async deleteCliente(id) {
    const cliente = await Cliente.findOne({ where: { id_cliente: id } });
    if (cliente) {
    await cliente.destroy();
    }
    return cliente;
},

async generateClientPDF(cliente) {
    const fileName = `cliente_${cliente.id_cliente}.pdf`;
    const folderPath = "/Users/misael/Documents/"; // Ruta absoluta para la carpeta de documentos en la raíz del servidor
    const filePath = path.join(folderPath, fileName); // Ruta completa del archivo

    // Verifica si la carpeta "Documents" existe; si no, la crea
    if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    }

    return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

      // Construye la ruta completa para la imagen
    const logoPath = path.join(path.resolve(), "assets", "TanyaLogo.png");

      // Coloca el logo en la parte superior
      doc.image(logoPath, 50, 10, { width: 500 }); // Ajusta el tamaño y posición según necesites

        // Agregar la fecha de registro en la esquina superior derecha, debajo del logo
        const creationDate = new Date().toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        doc.fontSize(12).text(`Fecha de Registro: ${creationDate}`, 300, 200, { align: 'right' });

      // Definir la posición inicial del texto para que quede debajo del logo
      const textStartY = 250; // Posición inicial para el texto
      let currentY = textStartY; // Variable para controlar la posición vertical dinámica

      // Agregar el texto con espaciado dinámico
      const lineSpacing = 20; // Controla el espacio entre líneas

      doc.fontSize(18).text(`Cliente: ${cliente.nombre_cliente} ${cliente.apellido_paterno}`, 50, currentY, { underline: true });
      currentY += lineSpacing + 10; // Aumenta el espacio después del nombre del cliente

      doc.fontSize(12).text(`Email: ${cliente.email}`, 50, currentY);
      currentY += lineSpacing;

      doc.text(`Teléfono: ${cliente.telefono_cliente}`, 50, currentY);
      currentY += lineSpacing;

      doc.text(`Fecha de nacimiento: ${cliente.fecha_nacimiento}`, 50, currentY);
      currentY += lineSpacing;

      doc.text(`Sexo: ${cliente.sexo}`, 50, currentY);
      currentY += lineSpacing;

      // Nuevo campo: Cómo se enteró
      doc.text(`¿Cómo se enteró?: ${cliente.como_se_entero || 'N/A'}`, 50, currentY);
      currentY += lineSpacing;

      // Nuevo campo: Nombre del que atiende
      doc.text(`Nombre del que atiende: ${cliente.nombre_atendio || 'No especificado'}`, 50, currentY);
      currentY += lineSpacing;

     // Espacio antes de la línea y texto centrado
     currentY += 175;

     // Dibujar línea centrada
     const pageWidth = doc.page.width;
     const lineWidth = 200; // Longitud de la línea
     const lineStartX = (pageWidth - lineWidth) / 2; // Centrar la línea en la página
     const lineEndX = lineStartX + lineWidth;

     doc.moveTo(lineStartX, currentY)
        .lineTo(lineEndX, currentY)
        .stroke();

     // Agregar texto centrado debajo de la línea
     currentY += 15; // Espacio entre la línea y el texto
     doc.fontSize(12).text("Firma del Cliente", 0, currentY, { align: 'center', width: pageWidth });

      // Agregar el footer en la parte inferior de la página
    const footerPath = path.join(path.resolve(), "assets", "FooterImage.png");
      doc.image(footerPath, 50, doc.page.height - 100, { width: 500 }); // Ajusta la posición y el tamaño del footer

      // Finaliza el documento
    doc.end();

    writeStream.on("finish", () => resolve(filePath));
    writeStream.on("error", (error) => reject(error));
    });
},
};

export { clienteService };