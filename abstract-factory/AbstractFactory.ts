/***** Фабрики *****/
interface UIFactory {
  createWindow(): IWindow;

  createButton(): IButton;

  createCheckbox(): ICheckbox;
}

class WindowsFactory implements UIFactory {
  createWindow() {
    return new WindowsWindow();
  };

  createButton() {
    return new WindowsButton();
  };

  createCheckbox() {
    return new WindowsCheckbox();
  };
}

class MacFactory implements UIFactory {
  createWindow() {
    return new MacWindow();
  };

  createButton() {
    return new MacButton();
  };

  createCheckbox() {
    return new MacCheckbox();
  };
}

/***** Окна *****/
interface IWindow {
  paint(): void;
}

class WindowsWindow implements IWindow {
  paint() {
    console.log('WindowsWindow');
  }
}

class MacWindow implements IWindow {
  paint() {
    console.log('MacWindow');
  }
}

/***** Кнопки *****/
interface IButton {
  onclick(): void;
}

class WindowsButton implements IButton {
  onclick() {
    console.log('WindowsButton');
  }
}

class MacButton implements IButton {
  onclick() {
    console.log('MacButton');
  }
}

/***** Чекбоксы *****/
interface ICheckbox {
  onchange(): void;
}

class WindowsCheckbox implements ICheckbox {
  onchange() {
    console.log('WindowsCheckbox');
  }
}

class MacCheckbox implements ICheckbox {
  onchange() {
    console.log('MacCheckbox');
  }
}

// Приложение взаимодействует с семействами классов через интерфейс абстрактной фабрики
function init(factory: UIFactory) {
  const window = factory.createWindow();
  window.paint();

  const button = factory.createButton();
  button.onclick();

  const checkbox = factory.createCheckbox();
  checkbox.onchange();
}

init(new MacFactory());

init(new WindowsFactory());