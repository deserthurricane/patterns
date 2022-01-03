// Интерфейс Итератора, имеет одни и те же методы 
abstract class IIterator<Collection, Element> {
  collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  abstract first(): void;
  abstract next(): void;
  abstract current(): Element;

  done(): boolean {
    // дефолтная реализация для листовых элементов в дереве
    return true;
  };
}

/**
 * Конкретный итератор для массива
 */
class ArrayIterator<T> extends IIterator<ArrayWithIterator<T>, T> {
  index: number = 0;

  first() {
    return this.index;
  }

  next() {
    this.index++;
  }

  current() {
    return this.collection.array[this.index];
  }

  done() {
    return this.index === this.collection.array.length;
  }
}

/**
 * Массив с методом создания итератора
 */
class ArrayWithIterator<T> {
  array: T[];

  constructor(arr: T[]) {
    this.array = arr;
  }

  createIterator(): ArrayIterator<T> {
    return new ArrayIterator(this);
  }
}

/**
 * Клиентский код
 */
function run() {
  const arr = new ArrayWithIterator([1, 2, 3, 4, 5]);
  const iterator = arr.createIterator();

  // Устанавливаем указатель на первый элемент массива
  iterator.first();

  while (!iterator.done()) {
    const currentItem = iterator.current(); // получение текущего элемента
    console.log(currentItem, 'currentItem');
    iterator.next(); // перемещение указателя на следующий элемент
  }
}

run();