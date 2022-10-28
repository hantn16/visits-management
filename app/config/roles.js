const allRoles = {
  user: ['manageStocks', 'manageUnits', 'manageInventoryItems', 'manageAccounts'],
  partner: ['manageStocks', 'manageUnits', 'manageInventoryItems', 'manageAccounts'],
  admin: ['getUsers', 'manageUsers', 'manageStocks', 'manageUnits', 'manageInventoryItems', 'manageAccounts'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
