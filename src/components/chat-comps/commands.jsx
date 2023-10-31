const commandResponses = {
  "/about": "I'm a chatbot designed to assist users.",
  "/contact": "You can contact our support team at support@example.com.",
  //... add more commands and responses
};

const customHandlers = {
  "/special": function () {
    return "This is a special command with its own custom function.";
  },
  "/help": function () {
    // Generate a list of all available commands
    const allCommands = Object.keys(commandResponses).concat(
      Object.keys(customHandlers)
    );
    return "Available commands are: " + allCommands.join(", ");
  },
  // ... other commands with custom functions
};

export { commandResponses, customHandlers };
