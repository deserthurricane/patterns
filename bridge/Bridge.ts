/**
 * Абстрактный класс, содержащий ссылку на класс реализации
 */
abstract class DeviceController {
  protected device: IDeviceImplementation;

  constructor(device: IDeviceImplementation) {
    this.device = device;
  }

  abstract toggleDevice(): void;
  abstract volumeUp(): void;
  abstract volumeDown(): void;
}

/**
 * Кнопочный пульт управления
 */
class ButtonController extends DeviceController {
  toggleDevice() {
    this.device.toggleIsOn();
    console.log('switch remote');
  }

  volumeUp() {
    this.device.setVolume(this.device.volume + 1);
    console.log('volumeUp remote');
  }

  volumeDown() {
    this.device.setVolume(this.device.volume - 1);
    console.log('volumeDown remote');
  }

  // собственный уникальный метод
  mute() {
    this.device.setVolume(0);
    console.log('device is muted');
  }
}

/**
 * Голосовое управление
 */
class VoiceController extends DeviceController {
  toggleDevice() {
    this.device.toggleIsOn();
    console.log('switch voice');
  }

  volumeUp() {
    this.device.setVolume(this.device.volume + 1);
    console.log('volumeUp voice');
  }

  volumeDown() {
    this.device.setVolume(this.device.volume - 1);
    console.log('volumeDown voice');
  }

  // собственный уникальный метод
  toggleByVoice() {
    this.device.toggleIsOn();
    console.log('toggleByVoice');
  }
}

/**
 * Общий интерфейс для разных реализаций (платформ)
 */
abstract class IDeviceImplementation {
  volume: number;
  isOn: boolean;

  abstract toggleIsOn(): void;
  abstract setVolume(vol: number): void;
}

/**
 * Платформа TV
 */
class TV extends IDeviceImplementation {
  volume = 0;
  isOn = false;
  voiceControlEnabled = false;
  
  toggleIsOn() {
    this.isOn = !this.isOn;
  }

  setVolume(vol: number) {
    this.volume = vol;
  }
}

/**
 * Платформа Radio
 */
class Radio extends IDeviceImplementation {
  volume = 0;
  isOn = false;
  
  toggleIsOn() {
    this.isOn = !this.isOn;
  }

  setVolume(vol: number) {
    this.volume = vol;
  }
}

const device1 = new Radio();
const deviceCtrl1 = new ButtonController(device1);
deviceCtrl1.toggleDevice();
deviceCtrl1.volumeUp();
deviceCtrl1.mute(); // применяем уникальный метод управляющего класса к классу устройства 

const device2 = new TV();
const deviceCtrl2 = new VoiceController(device2);
deviceCtrl2.toggleDevice();
deviceCtrl2.volumeUp();
deviceCtrl2.toggleByVoice();  // применяем уникальный метод управляющего класса к классу устройства
