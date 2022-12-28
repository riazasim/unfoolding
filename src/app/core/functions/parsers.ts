import { parseExcelFile } from '@sp-access/commons/utilities';
import { ComvexTransporter } from '../model/transporter';
import { convertExcelRowToTransporter } from './convertors';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export function parseTransportersExcel(
  file: File
): Observable<ComvexTransporter[]> {
  return parseExcelFile(file).pipe(
    map((rows) => [...rows].reverse()),
    // Pops the header row
    tap((rows) => rows.pop()),
    map((dataRows) =>
      dataRows.map((dataRow) => convertExcelRowToTransporter(dataRow))
    )
  );
}
