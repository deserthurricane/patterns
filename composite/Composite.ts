/**
 * Абстрактный класс 
 */
abstract class Component {
  parent: Component | null = null;

  // Операция, присущая конкретному подклассу
  abstract Operation(): void;

  // Добавление нового узла в дерево
  Add(c: Component): void { } // базовая реализация, необходимая для компонентов-листьев

  // Удаление узла
  Remove(c: Component): Component | void { } // базовая реализация, необходимая для компонентов-листьев

  // Получение узла
  GetChild(c: Component): Component | void { } // базовая реализация, необходимая для компонентов-листьев
}

/**
 * Узел, имеющий потомков
 */
class Composite extends Component {
  // Дочерние узлы
  children: Component[] = [];

  // Логирование списка дочерних узлов
  Operation(): void {
    console.log(this.children, 'children');
  };

  // Добавление нового узла в дерево
  Add(c: Component) {
    this.children.push(c);
    // Обновляем родителя узлового компонента
    c.parent = this;
  };
  
  // Удаление узла
  Remove(c: Component): Component {
    const index = this.children.indexOf(c);
    const removed = this.children.splice(index, 1)[0];

    // Обновляем родителя узлового компонента
    c.parent = null;
    return removed;
  };

  // Получение узла
  GetChild(c: Component): Component {
    const index = this.children.indexOf(c);
    return this.children[index];
  };
}

class Leaf1 extends Component {
  // Операция, присущая конкретному подклассу
  Operation(): void {
    console.log('this is leaf one');
  };
}

class Leaf2 extends Component {
  // Операция, присущая конкретному подклассу
  Operation(): void {
    console.log('this is leaf two');
  };
}

const composite1 = new Composite();
const composite2 = new Composite();
composite1.Add(composite2);

const leaf1 = new Leaf1();
const leaf2 = new Leaf2();
const leaf3 = new Leaf2();

/**
 * Благодаря единому интерфейсу компоновщика
 */
function useAnyComponent(component: Component) {
  component.Add(leaf1);
  component.Add(leaf2);
  component.Operation();

  component.Remove(leaf2);
  component.Operation();

  component.GetChild(leaf1);
}

// Все доступные для Component операции удается выполнить как с узловым компонентом,
// так и с листом - они выполняются "вхолостую" и не возвращают ошибок
useAnyComponent(composite2);
useAnyComponent(leaf3);