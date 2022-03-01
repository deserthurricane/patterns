/**
 * Общий интерфейс всех подписчиков
 */
interface IObserver {
  update(val: number): void;
}

/**
 * Конкретный класс подписчика (выводит обновление в консоль)
 */
class ConsoleObserver implements IObserver {
  update(val: number) {
    console.log('log: ', val);
  }
}

/**
 * Конкретный класс подписчика (выводит обновление в алерт)
 */
class AlertObserver implements IObserver {
  update(val: number) {
    console.log('alert: ', val);
  }
}

/**
 * Менеджер событий / Издатель
 * Служебный класс, управляющий подпиской на события объектов-потребителей
 */
class Publisher {
  listeners: IObserver[] = [];

  subscribe(listener: IObserver) {
    const listenerIndex = this.listeners.indexOf(listener);

    if (listenerIndex === -1) {
      this.listeners.push(listener);
    }
  }

  unsubscribe(listener: IObserver) {
    const listenerIndex = this.listeners.indexOf(listener);

    if (listenerIndex >= 0) {
      this.listeners.splice(listenerIndex, 1);
    }
  }

  notify(value: number) {
    this.listeners.forEach(listener => {
      listener.update(value);
    })
  }
}

/**
 * Объект, содержащий в себе состояние, на которое хотят подписаться другие объекты
 */
class Counter {
  private count: number = 0;
  publisher: Publisher; // содержит ссылку на менеджера событий

  constructor(publisher: Publisher) {
    this.publisher = publisher;
  }

  increment() {
    this.count++;
    this.publisher.notify(this.count);
  }

  decrement() {
    this.count--;
    this.publisher.notify(this.count);
  }

  getCount() {
    return this.count;
  }
}

/**
 * Клиентский код
 */
function counterApp() {
  const observer1 = new ConsoleObserver();
  const observer2 = new AlertObserver();

  const publisher = new Publisher();
  publisher.subscribe(observer1);
  publisher.subscribe(observer2);

  const counter = new Counter(publisher);
  counter.increment();
  counter.increment();
  counter.decrement();
}

counterApp();