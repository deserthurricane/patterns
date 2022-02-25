/**
 * Абстрактный класс Строителя - предоставляет общий интерфейс для конкретных классов Строителя
 */
abstract class ABuilder<Product> {
  protected product: Product;

  buildPartA(): void {};
  buildPartB(): void {};
  buildPartC(): void {};

  getResult() {
    return this.product;
  };
}

type CharText = string;

/**
 * Пример конкретного класса Строителя - конкатенация строковых значений букв A, B, C
 */
class CharTextBuilder extends ABuilder<CharText> {
  product = ''

  buildPartA() {
    this.product += 'A';
  }

  buildPartB() {
    this.product += 'B';
  }

  buildPartC() {
    this.product += 'C';
  }
}

type ASCIIText = number;

/**
 * Пример конкретного класса Строителя - сумма кодов букв A, B, C
 */
class ASCIIBuilder extends ABuilder<ASCIIText> {
  product = 0

  buildPartA() {
    this.product += 'A'.charCodeAt(0);
  }

  buildPartB() {
    this.product += 'B'.charCodeAt(0);
  }

  buildPartC() {
    this.product += 'C'.charCodeAt(0);
  }
}

/**
 * Абстрактный класс Распорядителя (Директора) - предоставляет общий интерфейс для Клиента, 
 * скрывая детали использования методов Строителя в общем методе build()
 */
abstract class ADirector<Product> {
  protected builder: ABuilder<Product>;

  constructor(builder: ABuilder<Product>) {
    this.builder = builder;
  }

  abstract build(): void;
}

/**
 * Конкретный класс MVPDirector вызывает только первый метод Строителя (создает минимально полезную часть продукта)
 */
class MVPDirector<Product> extends ADirector<Product> {
  build(): void {
    this.builder.buildPartA();
  }
}

/**
 * Конкретный класс FullProductDirector вызывает все методы Строителя (создает продукт полностью)
 */
class FullProductDirector<Product> extends ADirector<Product> {
  build(): void {
    this.builder.buildPartA();
    this.builder.buildPartB();
    this.builder.buildPartC();
  }
}

/**
 * В клиентском коде все операции по созданию продукта инкапсулированы в Строителе,
 * а бизнес-логика их использования скрыта в Распорядителе
 */
function clientCode() {
  const charTextBuilder = new CharTextBuilder();
  const mvpCharTextDirector = new MVPDirector(charTextBuilder);
  mvpCharTextDirector.build();

  const mvpResult = charTextBuilder.getResult();
  console.log(mvpResult, 'mvpResult');
  
  const ASCIITextBuilder = new ASCIIBuilder();
  const fullTextDirector = new FullProductDirector(ASCIITextBuilder);
  fullTextDirector.build();

  const fullTextResult = ASCIITextBuilder.getResult();
  console.log(fullTextResult, 'fullTextResult');
}

clientCode();

