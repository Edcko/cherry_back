'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Función para restar sesión al crear cita
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION restar_sesion_paquete() RETURNS trigger LANGUAGE plpgsql AS $$
      BEGIN
          -- Restar 1 sesión al paquete cuando se crea una cita
          UPDATE paquete 
          SET sesiones_restantes = sesiones_restantes - 1
          WHERE id_paquete = NEW.id_paquete;
          RETURN NEW;
      END;
      $$;
    `);

    // Trigger para restar sesión al crear cita
    await queryInterface.sequelize.query(`
      CREATE TRIGGER trigger_restar_sesion
          AFTER INSERT ON agenda
          FOR EACH ROW EXECUTE FUNCTION restar_sesion_paquete();
    `);

    // Función para sumar sesión al cancelar/eliminar cita
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION sumar_sesion_paquete() RETURNS trigger LANGUAGE plpgsql AS $$
      BEGIN
          -- Sumar 1 sesión al paquete cuando se cancela/elimina una cita
          UPDATE paquete 
          SET sesiones_restantes = sesiones_restantes + 1
          WHERE id_paquete = OLD.id_paquete;
          RETURN OLD;
      END;
      $$;
    `);

    // Trigger para sumar sesión al eliminar cita
    await queryInterface.sequelize.query(`
      CREATE TRIGGER trigger_sumar_sesion
          AFTER DELETE ON agenda
          FOR EACH ROW EXECUTE FUNCTION sumar_sesion_paquete();
    `);

    // Función para manejar cambios de estado
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION manejar_cambio_estado_cita() RETURNS trigger LANGUAGE plpgsql AS $$
      BEGIN
          -- Si se cancela una cita, sumar sesión de vuelta
          IF NEW.estado = 'Cancelada' AND OLD.estado != 'Cancelada' THEN
              UPDATE paquete 
              SET sesiones_restantes = sesiones_restantes + 1
              WHERE id_paquete = NEW.id_paquete;
          END IF;
          
          -- Si se reactiva una cita cancelada, restar sesión
          IF OLD.estado = 'Cancelada' AND NEW.estado != 'Cancelada' THEN
              UPDATE paquete 
              SET sesiones_restantes = sesiones_restantes - 1
              WHERE id_paquete = NEW.id_paquete;
          END IF;
          
          RETURN NEW;
      END;
      $$;
    `);

    // Trigger para manejar cambios de estado
    await queryInterface.sequelize.query(`
      CREATE TRIGGER trigger_cambio_estado_cita
          AFTER UPDATE ON agenda
          FOR EACH ROW EXECUTE FUNCTION manejar_cambio_estado_cita();
    `);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar triggers
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trigger_restar_sesion ON agenda;`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trigger_sumar_sesion ON agenda;`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS trigger_cambio_estado_cita ON agenda;`);
    
    // Eliminar funciones
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS restar_sesion_paquete();`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS sumar_sesion_paquete();`);
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS manejar_cambio_estado_cita();`);
  }
}; 