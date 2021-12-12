/**
 * Общий для декоратора и основного класса интерфейс
 */
interface IStreamReader {
  read(data: ArrayBuffer): ArrayBuffer;
}

/**
 * Основной класс: читает и возвращает поток бинарных данных
 */
class StreamReaderBase implements IStreamReader {
  read(stream: ArrayBuffer) {
    console.log(stream);
    return stream;
  }
}

/**
 * Абстрактный класс, определяющий вызов метода основного класса,
 * а также хранящий ссылку на основной класс
 */
abstract class StreamReaderDecorator implements IStreamReader {
  protected baseReader: IStreamReader;

  constructor(baseReader: IStreamReader) {
    this.baseReader = baseReader;
  }

  public read(data: ArrayBuffer): ArrayBuffer {
    return this.baseReader.read(data);
  };
}

/**
 * Декоратор, создающий типизированный массив из бинарных данных
 */
class StreamTypingDecorator extends StreamReaderDecorator {
  TypedArrayConstructor: Uint8ArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor;

  constructor(baseReader: StreamReaderBase, TypedArrayConstructor: Uint8ArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor) {
    super(baseReader);
    this.TypedArrayConstructor = TypedArrayConstructor;
  }

  read(data: ArrayBuffer) {
    console.log('typing decorator called');
    return new this.TypedArrayConstructor(super.read(data));
  }
}

/**
 * Декоратор, выполняющий сжатие данных
 */
class StreamCompressingDecorator extends StreamReaderDecorator {
  // Здесь может быть инстанс любого класса, реализующего алгоритм сжатия: код Хаффмана, RLE, LZ*
  compressAlgo: (buffer: ArrayBuffer) => ArrayBuffer;

  constructor(baseReader: StreamReaderBase, compressAlgo: (buffer: ArrayBuffer) => ArrayBuffer) {
    super(baseReader);
    this.compressAlgo = compressAlgo;
  }

  read(data: ArrayBuffer) {
    console.log('compress decorator called');
    return this.compressAlgo(super.read(data));
  }
}

const base = new StreamReaderBase();
const typingDecorator = new StreamTypingDecorator(base, Uint8Array);
const compressDecorator = new StreamCompressingDecorator(typingDecorator, (buffer: ArrayBuffer) => buffer);

// typingDecorator.read(new ArrayBuffer(3));
compressDecorator.read(new ArrayBuffer(5));
