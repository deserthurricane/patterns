/**
 * Посетитель, который выводит в консоль различные структуры данных
 */
interface IVisitor {
  visitArray: (value: any[]) => void;
  visitObject: (value: Record<string, any>) => void;
  visitMap: (value: Map<any, any>) => void;
}

/**
 * Класс Посетителя
 */
class PrintingVisitor implements IVisitor {
  visitArray(arr: any[]) {
    console.log(arr, 'this is array');
  }

  visitObject(obj: Record<string, any>) {
    const objStr = JSON.stringify(obj);
    console.log(objStr, 'this is object');
  }

  visitMap(map: Map<any, any>) {
    const mapStr = [...map.entries()];
    console.log(mapStr, 'this is map');
  }
}

/**
 * Общий интерфейс для всех классов, принимающих экземпляр Посетителя
 */
interface DataStructureWithVisitor {
  accept(v: IVisitor): void;
}

/**
 * Массив с Посетителем
 */
class ArrayWithVisitor implements DataStructureWithVisitor {
  arr: any[];

  constructor(arr: any[]) {
    this.arr = arr;
  }

  accept(v: IVisitor) {
    v.visitArray(this.arr);
  }
}

/**
 * Объект с Посетителем
 */
class ObjectWithVisitor implements DataStructureWithVisitor {
  obj: Record<string, any>;

  constructor(obj: Record<string, any>) {
    this.obj = obj;
  }

  accept(v: IVisitor) {
    v.visitObject(this.obj);
  }
}

/**
 * Map с Посетителем
 */
class MapWithVisitor implements DataStructureWithVisitor {
  map: Map<any, any>;

  constructor(map: Map<any, any>) {
    this.map = map;
  }

  accept(v: IVisitor) {
    v.visitMap(this.map);
  }
}

/**
 * Общий код приложения
 */
function run() {
  const arr = new ArrayWithVisitor([1, 2, 3]);
  arr.accept(new PrintingVisitor());

  const obj = new ObjectWithVisitor({ name: 'Ivan', surname: 'Petrov', age: 30 });
  obj.accept(new PrintingVisitor());

  const map = new MapWithVisitor(new Map([
    [1, 123],
    [2, 0],
    [3, 745],
  ]));
  map.accept(new PrintingVisitor());
}

run();