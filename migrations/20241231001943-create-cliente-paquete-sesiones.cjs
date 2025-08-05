'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear tabla cliente_paquete_sesiones
    await queryInterface.createTable('cliente_paquete_sesiones', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cliente',
          key: 'id_cliente'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_paquete: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'paquete',
          key: 'id_paquete'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      sesiones_compradas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      sesiones_usadas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      sesiones_restantes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      fecha_compra: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      estado: {
        type: Sequelize.ENUM('Activo', 'Agotado', 'Expirado'),
        allowNull: false,
        defaultValue: 'Activo'
      }
    });

    // Agregar índices para mejorar rendimiento
    await queryInterface.addIndex('cliente_paquete_sesiones', ['id_cliente', 'id_paquete']);
    await queryInterface.addIndex('cliente_paquete_sesiones', ['estado']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cliente_paquete_sesiones');
  }
}; 