class Error {
  public static INVALID_REQUEST = 'INVALID_REQUEST';
  public static UNEXPECTER_ERROR = 'UNEXPECTER_ERROR';
}

export class UserProfileErrors {
  private error: any;
  private errors: Map<String, String> = new Map([
    ['user.name.notPresent', 'complete user name'],
    ['user.name.outOfBounds', 'user name lenght must be between 4 and 20'],
    ['user.email.notPresent', 'comlete email'],
    ['user.email.invalidFormat', 'invalid mail format'],
    ['user.cuil.notPresent', 'complete cuil'],
    ['user.cuil.invalidFormat', 'invalid cuil format'],
    ['user.address.notPresent', 'complete address'],
    ['vehicle.notPresent', 'complete vehicle data',],
    ['vehicle.type.notPresent', 'select a type',],
    ['vehicle.numberOfPassangers.invalid', 'the number of passangers must be between 1 and 10',],
    ['vehicle.description.outOfBounds', 'the description lenght must be between 30 and 200',],
    ['vehicle.license.notPresent', 'complete de license',],
  ]);

  private constructor(error: any) {
    this.error = error;
  }

  static from(error: any) {
    return new UserProfileErrors(error);
  }

  isInvalidRequest(): boolean {
    if (Error.INVALID_REQUEST === this.error.error.errorCode) {
      return !this.error.error.errors.includes('user.id.notPresent');
    }
    return false;
  }

  formatErors(): String {
    return this.error.error.errors.reduce((accumulator, value) => {
      accumulator = (accumulator + this.errors.get(value) + ', ');
      return accumulator;
    }, '');
  }

  isUnexpecterError() {
    return Error.UNEXPECTER_ERROR === this.error.error.errorCode;
  }
}
