'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar campo para sesiones restantes
    await queryInterface.addColumn('paquete', 'sesiones_restantes', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });

    // Actualizar registros existentes
    await queryInterface.sequelize.query(`
      UPDATE paquete 
      SET sesiones_restantes = numero_visitas 
      WHERE numero_visitas > 0
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('paquete', 'sesiones_restantes');
  }
}; 