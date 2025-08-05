'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar columna `id_cita_origen` a la tabla `agenda`
    await queryInterface.addColumn('agenda', 'id_cita_origen', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'agenda', // Nombre de la tabla relacionada
        key: 'id_cita',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar columna `id_cita_origen` en caso de rollback
    await queryInterface.removeColumn('agenda', 'id_cita_origen');
  },
};
