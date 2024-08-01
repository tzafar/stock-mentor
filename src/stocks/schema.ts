import { Static, Type } from '@sinclair/typebox';

export const StockRecord = Type.Object({
  date: Type.String(),
  open: Type.Number(),
  close: Type.Number(),
  difference: Type.Number(),
});

const StockData = Type.Array(StockRecord);

export type StockRecordType = Static<typeof StockData>;
