'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Función para restar sesión al crear cita
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION restar_sesion_cliente_paquete() RETURNS trigger LANGUAGE plpgsql AS $$
      BEGIN
          -- Restar 1 sesión al cliente específico cuando se crea una cita
          UPDATE cliente_paquete_sesiones 
          SET sesiones_usadas = sesiones_usadas + 1,
              sesiones_restantes = sesiones_restantes - 1,
              estado = CASE 
                  WHEN sesiones_restantes - 1 <= 0 THEN 'Agotado'
                  ELSE 'Activo'
              END
          WHERE id_cliente = NEW.id_cliente 
          AND id_paquete = NEW.id_paquete
          AND sesiones_restantes > 0;
          
          RETURN NEW;
      END;
      $$;
    `);

    // Trigger para restar sesión al crear cita
    await queryInterface.sequelize.query(`
      CREATE TRIGGER trigger_restar_sesion_cliente
          AFTER INSERT ON agenda
          FOR EACH ROW EXECUTE FUNCTION restar_sesion_cliente_paquete();
    `);

    // Función para sumar sesión al cancelar/eliminar cita
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION sumar_sesion_cliente_paquete() RETURNS trigger LANGUAGE plpgsql AS $$
      BEGIN
          -- Sumar 1 sesión al cliente específico cuando se cancela/elimina una cita
          UPDATE cliente_paquete_sesiones 
          SET sesiones_usadas = sesiones_usadas - 1,
              sesiones_restantes = sesiones_restantes + 1,
              estado = 'Activo'
          WHERE id_cliente = OLD.id_cliente 
          AND id_paquete = OLD.id_paquete;
          
          RETURN OLD;
      END;
      $$;
    `);

    // Trigger para sumar sesión al eliminar cita
    await queryInterface.sequelize.query(`
      CREATE TRIGGER trigger_sumar_sesion_cliente
          AFTER DELETE ON agenda
          FOR EACH ROW EXECUTE FUNCTION sumar_sesion_cliente_paquete();
    `);

    // Función para manejar cambios de estado de cita
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION manejar_cambio_estado_cita_cliente() RETURNS trigger LANGUAGE plpgsql AS $$
      BEGIN
          -- Si se cancela una cita, sumar sesión de vuelta al cliente
          IF NEW.estado = 'Cancelada' AND OLD.estado != 'Cancelada' THEN
              UPDATE cliente_paquete_sesiones 
              SET sesiones_usadas = sesiones_usadas - 1,
                  sesiones_restantes = sesiones_restantes + 1,
                  estado = 'Activo'
              WHERE id_cliente = NEW.id_cliente 
              AND id_paquete = NEW.id_paquete;
          END IF;
          
          -- Si se reactiva una cita cancelada, restar sesión al cliente
          IF OLD.estado = 'Cancelada' AND NEW.estado != 'Cancelada' THEN
              UPDATE cliente_paquete_sesiones 
              SET sesiones_usadas = sesiones_usadas + 1,
                  sesiones_restantes = sesiones_restantes - 1,
                  estado = CASE 
                      WHEN sesiones_restantes - 1 <= 0 THEN 'Agotado'
                      ELSE 'Activo'
                  END
              WHERE id_cliente = NEW.id_cliente 
              AND id_paquete = NEW.id_paquete
              AND sesiones_restantes > 0;
          END IF;
          
          RETURN NEW;
      END;
      $$;
    `);

    // Trigger para manejar cambios de estado
    await queryInterface.sequelize.query(`
      CREATE TRIGGER trigger_cambio_estado_cita_cliente
          AFTER UPDATE ON agenda
          FOR EACH ROW EXECUTE FUNCTION manejar_cambio_estado_cita_cliente();
    `);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar triggers
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trigger_restar_sesion_cliente ON agenda;`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trigger_sumar_sesion_cliente ON agenda;`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trigger_cambio_estado_cita_cliente ON agenda;`);
    
    // Eliminar funciones
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS restar_sesion_cliente_paquete();`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS sumar_sesion_cliente_paquete();`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS manejar_cambio_estado_cita_cliente();`);
  }
}; 