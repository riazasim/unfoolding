import { convertDateCandidateToJsDate } from '@sp-access/commons/utilities';
import { Row } from 'read-excel-file/types';
import {
  GuestCompleteData,
  GuestPersonalData,
  GuestProductData, GuestTransportData,
  GuestVisitData, PhoneRegionCode,
  PhotolessGuestData,
  SplitGuestData
} from '../model/guest';
import { ComvexCountry } from '../model/i18n';
import { CheckinLog } from '../model/indicators';
import { ComvexNotification } from '../model/notifications';
import { TableRepresentableGuest } from '../model/tables/comvex-guest-table.model';
import { TableRepresentableComvexNotification } from '../model/tables/comvex-notification-table.model';
import { ComvexTransporter } from '../model/transporter';

export function convertExcelRowToTransporter(row: Row): ComvexTransporter {
  return {
    name: row[0] as string,
    num: row[1] as string,
    priority: row[2] as '0' | '1'
  };
}

export function convertCheckinLogToChartData(
  checkinLog: CheckinLog
): { name: number; value: number }[] {
  const chartData = [];
  const maxLen = Math.max(checkinLog.names.length, checkinLog.values.length);
  for (let i = 0; i < maxLen; i++) {
    const name = parseInt(checkinLog.names[i]);
    const value = parseInt(checkinLog.values[i]);
    chartData.push({ name: name === 24 ? 0 : name, value });
  }
  chartData.reverse();
  return chartData;
}

const codeToLangMap: { [key in PhoneRegionCode]: ComvexCountry } = {
  359: 'bg',
  40: 'ro'
};

export function phoneRegionCodeToCountry(code: PhoneRegionCode): ComvexCountry {
  return codeToLangMap[code];
}

export function splitCompleteGuestData(data: GuestCompleteData): SplitGuestData {
  const visit: GuestVisitData = {
    phoneRegionCode: data.phoneRegionCode,
    phone: data.phone,
    num: data.num,
    num2: data.num2,
    appointmentDate: data.appointmentDate
  };
  const personal: GuestPersonalData = {
    phoneRegionCode: data.phoneRegionCode,
    phone: data.phone,
    docNum: data.docNum,
    firstName: data.firstName,
    lastName: data.lastName
  };
  const product: GuestProductData = {
    grossWeight: data.grossWeight,
    taraWeight: data.taraWeight,
    netWeight: data.netWeight,
    countryOfOrigin: data.countryOfOrigin,
    cargoBay: data.cargoBay
  };
  const transport: GuestTransportData = {
    cargoDocumentNumber: data.cargoDocumentNumber,
    yearOfHarvest: data.yearOfHarvest,
    cargoType: data.cargoType,
    client: data.client,
    supplier: data.supplier,
    cargoDocumentDate: data.cargoDocumentDate
  };
  const photo = data.photo;
  return {
    visit,
    personal,
    product,
    transport,
    photo
  };
}


export function photolessGuestToTableRepresentableGuest(guest: PhotolessGuestData): TableRepresentableGuest {
  const checkinBufferDate = convertDateCandidateToJsDate(guest.checkinBufferDate ?? '').setSeconds(0, 0);
  const appointmentDate = convertDateCandidateToJsDate(guest.appointmentDate).setSeconds(0, 0);
  const checkoutDate = convertDateCandidateToJsDate(guest.checkoutDate ?? '').setSeconds(0, 0);
  const gtgT = Math.abs(checkoutDate - checkinBufferDate).toString();
  const delay = Math.abs(appointmentDate - checkinBufferDate).toString();
  return {
    scheduledDateTime: guest.appointmentDate,
    checkinDateTime: guest.checkinBufferDate ?? 'N/A',
    delay: delay !== 'NaN' ? delay : 'N/A',
    checkoutDateTime: guest.checkoutDate,
    gateToGateTime: gtgT !== 'NaN' ? gtgT : 'N/A',
    cargoDocumentNumber: guest.cargoDocumentNumber,
    id: guest.id,
    QRCode: guest.QRCode,
    num: guest.num,
    num2: guest.num2,
    status: guest.status
  };
}

export function notificationToTableRepresentableNotification(notification: ComvexNotification): TableRepresentableComvexNotification {
  return {
    date: notification.isoTimestamp,
    id: notification.id,
    num: notification.num,
    num2: notification.num2,
    time: notification.isoTimestamp
  };
}
