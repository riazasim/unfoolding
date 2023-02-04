import { PhotolessGuestData } from '../model/guest';
import { photolessGuestToTableRepresentableGuest } from './convertors';

const mockGuest: PhotolessGuestData = {
  'id': 926,
  'firstName': 'Random',
  'lastName': 'Test',
  'status': 'checked-out',
  'phone': '0700000000',
  'phoneRegionCode': '40',
  'docNum': 'TESTRAN01',
  'num': 'TESTRAN01',
  'num2': 'TESTRAN02',
  'client': 7,
  'cargoType': 1,
  'supplier': 12,
  'grossWeight': '1500',
  'netWeight': '500',
  'taraWeight': '1000',
  'countryOfOrigin': 'Romania',
  'yearOfHarvest': '2021',
  'appointmentDate': '1636972351414',
  'cargoDocumentNumber': 'TESTRAN01',
  'cargoDocumentDate': '1636927200000',
  'cargoBay': 'B11',
  'checkinBufferDate': '1636972353000',
  'checkinProcessingDate': null,
  'checkoutDate': '1636973483000'
};

const nullCheckinBufferDateMock: PhotolessGuestData = {
  ...mockGuest,
  checkinBufferDate: null
};

const setCheckinBufferDateMock: PhotolessGuestData = {
  ...mockGuest,
  checkinBufferDate: '123456'
};

const nullCheckoutTimeDateMock: PhotolessGuestData = {
  ...mockGuest,
  checkoutDate: null
};

describe('photolessGuestToTableRepresentableGuest', () => {

  it('should keep the cargoDocumentNumber unchanged', () => {
    const target = photolessGuestToTableRepresentableGuest(mockGuest);
    expect(target.cargoDocumentNumber).toEqual(mockGuest.cargoDocumentNumber);
  });
  it('should keep the id unchanged', () => {
    const target = photolessGuestToTableRepresentableGuest(mockGuest);
    expect(target.id).toEqual(mockGuest.id);
  });
  it('should keep the vehicle num unchanged', () => {
    const target = photolessGuestToTableRepresentableGuest(mockGuest);
    expect(target.num).toEqual(mockGuest.num);
  });
  it('should keep the vehicle num2 unchanged', () => {
    const target = photolessGuestToTableRepresentableGuest(mockGuest);
    expect(target.num2).toEqual(mockGuest.num2);
  });
  it('should keep the status unchanged', () => {
    const target = photolessGuestToTableRepresentableGuest(mockGuest);
    expect(target.status).toEqual(mockGuest.status);
  });
  it('should equal the checkoutDateTime to the checkoutDate', () => {
    const target = photolessGuestToTableRepresentableGuest(mockGuest);
    expect(target.checkoutDateTime).toEqual(mockGuest.checkoutDate);
  });

  it('should use the checkinBufferDate to value the checkinDate if the checkinBufferDate is NOT null', () => {
    const target = photolessGuestToTableRepresentableGuest(setCheckinBufferDateMock);
    expect(target.checkinDateTime).toEqual(setCheckinBufferDateMock.checkinBufferDate);
  });

  it('should have the GateToGateTime set to N/A if the checkinBufferDate is null', () => {
    const target = photolessGuestToTableRepresentableGuest(nullCheckinBufferDateMock);
    expect(target.gateToGateTime).toEqual('N/A');
  });

  it('should have the GateToGateTime set to N/A if the checkoutTime is null', () => {
    const target = photolessGuestToTableRepresentableGuest(nullCheckoutTimeDateMock);
    expect(target.gateToGateTime).toEqual('N/A');
  });

  it('should have the GateToGateTime computed when both checkinBufferDate and checkoutTime are NOT null', () => {
    const target = photolessGuestToTableRepresentableGuest(mockGuest);
    expect(target.gateToGateTime).not.toEqual('N/A');
  });

  it('should correctly compute the GateToGateTime when both required parts are provided', () => {
    // The GtgTime is computed by removing the seconds and milliseconds from
    // both dates and then taking the difference between the checkout and checkin
    const checkinDate = new Date(1234567898765432);
    const checkoutDate = new Date(1234597898765432);
    const specialMockGuest: PhotolessGuestData = {
      ...mockGuest,
      checkoutDate: checkoutDate.getTime().toString(),
      checkinBufferDate: checkinDate.getTime().toString()
    };
    const reference = Math.abs(checkinDate.setSeconds(0, 0) - checkoutDate.setSeconds(0, 0)).toString();
    const target = photolessGuestToTableRepresentableGuest(specialMockGuest);
    expect(target.gateToGateTime).toEqual(reference);
  });

});
