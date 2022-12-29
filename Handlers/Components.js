/**
 *
 * @param {import("../Structures/bot")} client
 */
async function loadComponents(client) {
  //Buttons
  const Buttons = await client.utils.loadFiles("./Components/Buttons");
  Buttons.forEach(async (file) => {
    const button = require(file);
    client.components.buttons.set(button.id, button);
  });

  //Select Menus
  const SelectMenus = await client.utils.loadFiles("./Components/SelectMenus");
  SelectMenus.forEach((file) => {
    const selectMenu = require(file);
    client.components.selectMenus.set(selectMenu.id, selectMenu);
  });

  //Modals
  const Modals = await client.utils.loadFiles("./Components/Modals");
  Modals.forEach((file) => {
    const modal = require(file);
    client.components.modals.set(modal.id, modal);
  });
}

module.exports = { loadComponents };
