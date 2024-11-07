import { Cliente, Spa } from "../models/index.js";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clienteService = {

    async getAllClientes(idSpa) {
        return await Cliente.findAll({
            where: {id_spa: idSpa},
            include: [{
                model: Spa,
                attributes: ["nombre_spa", "ciudad", "calle", "colonia", "codigo_postal", "telefono"],
            }],
        });
    },

    async getClienteById(id){
        return  await Cliente.findOne({ where: {id_cliente: id}});
    },

    async createCliente(data){
        return await Cliente.create(data);
    },

    async updateCliente(id, data){

        const cliente = await Cliente.findOne({ where: {id_cliente: id} });
        if(cliente){
            return await cliente.update(data);
        } else {
            return null;
        }
    },
    
    async deleteCliente(id){
        const cliente = await Cliente.findOne({ where: {id_cliente: id} });
        if(cliente){
            await cliente.destroy();
        }
            return cliente;
    },

    async generateClientPDF(cliente) {
        const fileName = `cliente_${cliente.id_cliente}.pdf`;
        const folderPath = '/var/documents'; // Ruta absoluta para la carpeta de documentos en la raíz del servidor
        const filePath = path.join(folderPath, fileName); // Ruta completa del archivo
    
        // Verifica si la carpeta "Documents" existe; si no, la crea
        if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        }
    
        return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream(filePath);
    
        doc.pipe(writeStream);
    
        doc.fontSize(20).text(`Cliente: ${cliente.nombre_cliente} ${cliente.apellido_paterno}`, { underline: true });
        doc.moveDown();
        doc.fontSize(12).text(`Email: ${cliente.email}`);
        doc.text(`Teléfono: ${cliente.telefono_cliente}`);
          // Agrega más datos aquí
    
        doc.end();
    
        writeStream.on('finish', () => resolve(filePath));
        writeStream.on('error', (error) => reject(error));
        });
    },
};

export { clienteService };