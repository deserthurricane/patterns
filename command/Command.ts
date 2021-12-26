abstract class IEditorCommand {
  // Ссылка на конкретный receiver, из которого берётся реализация команды
  protected receiver: Editor;

  constructor(receiver: Editor) {
    this.receiver = receiver;
  }

  abstract execute(): void;
}

/**
 * Команда сохранения
 */
class SaveCommand extends IEditorCommand {
  execute() {
    this.receiver.saveOperation()
  }
}

/**
 * Команда копирования
 */
class CopyCommand extends IEditorCommand {
  execute() {
    this.receiver.copyOperation()
  }
}

/**
 * Команда вставки
 */
class PasteCommand extends IEditorCommand {
  execute() {
    this.receiver.pasteOperation()
  }
}

/**
 * Receiver
 * Содержит конкретную реализацию операций, которые были делегированы командам
 */
class Editor {
  protected text = 'Editor text';

  saveOperation() {
    console.log(`Saved ${this.text}`);
  }

  copyOperation() {
    console.log(`Copied ${this.text}`);
  }

  pasteOperation() {
    console.log(`Pasted ${this.text}`);
  }
}

/** Одну и ту же команду могут вызывать различные компоненты - инициаторы  */

/**
 * Invoker
 * хранит ссылку на команду
 */
abstract class CommandInvoker {
  command: IEditorCommand;

  setCommand(command: IEditorCommand) {
    this.command = command;
  }
}

class SaveButton extends CommandInvoker {
  save() {
    this.command.execute();
  }
}

class SaveMenuItem extends CommandInvoker {
  save() {
    this.command.execute();
  }
}

class SaveShortCut extends CommandInvoker {
  save() {
    this.command.execute();
  }
}

/**
 * История выполненных команд
 */
class EditorCommandsHistory {
  commands: IEditorCommand[] = [];

  push(command: IEditorCommand) {
    this.commands.push(command);
  }

  pop() {
    this.commands.pop();
  }
}


/**
 * Client
 * настраивает объекты для совместной работы
 */
class Application {
  editor = new Editor();
  commandHistory = new EditorCommandsHistory();
  saveButton = new SaveButton();

  init() {
    const saveCommand = new SaveCommand(this.editor);
    this.saveButton.setCommand(saveCommand);
  }
  
  save() {
    this.commandHistory.push(this.saveButton.command)
    this.saveButton.save();

    console.log(this.commandHistory, 'this.commandHistory');
  }
}

const app = new Application();
app.init();
app.save();