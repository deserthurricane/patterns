interface IObserver {
  update(val: number): void;
}

class ConsoleObserver implements IObserver {
  update(val: number) {
    console.log('log: ', val);
  }
}

class AlertObserver implements IObserver {
  update(val: number) {
    console.log('alert: ', val);
  }
}

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

class Counter {
  private count: number = 0;
  publisher: Publisher;

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