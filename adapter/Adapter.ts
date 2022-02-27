/**
 * Интерфейс Клиента - работает с объектами
 */
interface IObjectReader {
  readObj(obj: Object): Object;
}

/**
 * Интерфейс стороннего сервиса - работает с JSON
 */
interface IJSONReader {
  readJSON(text: string): string;
}

/**
 * Класс стороннего сервиса
 */
class JSONReader implements IJSONReader {
  readJSON(text: string) {
    return text;
  }
}

/**
 * Адаптер, реализующий метод клиентского кода и использующий для обработки данных сторонний сервис,
 * приводя их к целевому интерфейсу
 */
class JSONToObjectAdapter implements IObjectReader {
  adaptee: IJSONReader;

  constructor(jsonReader: IJSONReader) {
    this.adaptee = jsonReader;
  }

  readObj(text: string): Object {
    let result = {};

    try {
      result = JSON.parse(this.adaptee.readJSON(text))
    } catch(err) {
      console.log('err while reading json');
      
    }

    return result;
  }
}

function objectReadApp(data: string) {
  const adapter = new JSONToObjectAdapter(new JSONReader());
  const result = adapter.readObj(data);

  console.log(result, 'result');
}

const user = `{"name": "Anastasia","age": "32"}`;
objectReadApp(user);