'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('files', 'uploaded_by', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('files', 'uploaded_by')
  }
}
