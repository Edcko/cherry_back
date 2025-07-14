import { Compra, Cliente, Paquete } from "../models/index.js";
import { Op } from "sequelize";

// Importa QueryTypes y la instancia de Sequelize desde tu configuración:
import { QueryTypes } from "sequelize";
import { db } from "../config/database.js"; // asumo que aquí exportas tu instancia Sequelize


const compraService = {
    
    async getAllCompras(){
        return await Compra.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ["nombre_cliente", "apellido_paterno", "apellido_materno"],
                },
                {
                   model: Paquete,
                   attributes: ["nombre_paquete", "precio"],
                }
            ],
        });
    },

    async getCompraById(id){
        return await Compra.findByPk(id);
    },

    async getCompraCompletaById(id){
        return await Compra.findByPk(id, {
            include: [
                {
                    model: Cliente,
                    attributes: ["id_cliente", "nombre_cliente", "apellido_paterno", "apellido_materno", "email", "telefono_cliente"],
                },
                {
                   model: Paquete,
                   attributes: ["id_paquete", "nombre_paquete", "precio", "descripcion"],
                }
            ],
        });
    },

    async createCompra(data){
        return await Compra.create(data);
    },

    async updateCompra(id, data){
        const compra = await Compra.findOne({ where: { id_compra: id } });
        if(compra){
            return await compra.update(data);
        } else {
            return null;
        }
    },

    async deleteCompra(id){
        const compra = await Compra.findOne({ where: { id_compra: id } });
        if(compra){
            await compra.destroy();
        }
        return compra;
    },
    // services/compra.services.js
  async getVentasPorRango(inicio, fin) {
    // ejecutamos la query sobre db.sequelize
    return await db.sequelize.query(
      `SELECT 
         COUNT(*)             AS total_compras,
         SUM(monto_original)  AS ventas_original,
         SUM(monto_pagado)    AS ventas_pagadas,
         SUM(monto_adeudado)  AS ventas_pendientes
       FROM compra
       WHERE fecha_compra BETWEEN :inicio AND :fin
      `,
      {
        replacements: { inicio, fin },
        type: QueryTypes.SELECT
      }
    );
  },

  async getVentasDetallePorRango(inicio, fin) {
    return await db.sequelize.query(
      `SELECT
         date_trunc('day', fecha_compra)::date              AS fecha,
         COUNT(*)                                          AS total_compras,
         SUM(monto_original)::numeric(12,2)                AS ventas_original,
         SUM(monto_pagado)::numeric(12,2)                  AS ventas_pagadas,
         SUM(monto_adeudado)::numeric(12,2)                AS ventas_pendientes
       FROM compra
       WHERE fecha_compra BETWEEN :inicio AND :fin
       GROUP BY date_trunc('day', fecha_compra)
       ORDER BY fecha
      `,
      {
        replacements: { inicio, fin },
        type: QueryTypes.SELECT
      }
    );
  },
     
  async getVentasDetalleConCompradores(inicio, fin) {
    return await db.sequelize.query(
      `SELECT
         c.id_compra,
         c.fecha_compra,
         c.monto_original,
         c.monto_pagado,
         c.monto_adeudado,
         c.estado_compra,
         cl.nombre_cliente,
         cl.apellido_paterno,
         cl.apellido_materno,
         p.nombre_paquete,
         p.precio
       FROM compra c
       INNER JOIN cliente cl ON c.id_cliente = cl.id_cliente
       INNER JOIN paquete p ON c.id_paquete = p.id_paquete
       WHERE c.fecha_compra BETWEEN :inicio AND :fin
       ORDER BY c.fecha_compra DESC
      `,
      {
        replacements: { inicio, fin },
        type: QueryTypes.SELECT
      }
    );
  },
     
}

export { compraService };
