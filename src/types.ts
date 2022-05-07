export type ErrorResponse = {
  error: string;
};

export type InvitationDto = "ceremony" | "dinner" | "reception";

export type Status = "pending" | "attending" | "not attending";

export type ReservationData = {
  id: string;
  address?: string;
  invitations: InvitationDto[];
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type GuestData = {
  id: number;
  firstName: string;
  lastName: string;
  status: Status;
  meal?: string;
  reservationId: string;
};

export type SongData = {
  id: number;
  name: string;
  artist: string;
  guestId: number;
};

export type TableData = {
  id: number;
  name: string;
  tableNumber: number;
};

export type TableAssignmentData = {
  id: number;
  tableId: number;
  guestId: number;
};

export type ReservationDto = ReservationData & {
  guests: GuestDto[];
};

export type GuestDto = Omit<GuestData, "reservationId"> & {
  songs: SongDto[];
};

export type SongDto = Omit<SongData, "guestId"> & {
  requester: Pick<GuestData, "firstName" | "lastName">;
};

export type MealRestrictionDto = Pick<
  GuestData,
  "id" | "firstName" | "lastName" | "meal"
> & {
  tableNumber: TableData["tableNumber"] | null;
};

export type TableAssignmentGuestDto = Pick<
  GuestData,
  "id" | "firstName" | "lastName" | "meal" | "status"
>;

export type TableDto = TableData & {
  guests: TableAssignmentGuestDto[];
  prevTableNumber?: TableData["tableNumber"];
  nextTableNumber?: TableData["tableNumber"];
};

export type TablesDto = {
  tables: TableDto[];
};

export type UnassignedGuestDto = GuestData;

export type UnassignedGuestsDto = {
  guests: UnassignedGuestDto[];
};

export type LoginDto = {
  email: string;
  password: string;
};

export type AddReservationBody = Pick<
  ReservationDto,
  "address" | "invitations"
> & {
  guests: Pick<GuestDto, "firstName" | "lastName">[];
};

export type DeleteReservationMutationOptions = {
  reservationId: string;
};

export type UpdateReservationBody = Pick<
  ReservationDto,
  "id" | "address" | "invitations"
> & {
  guests: Pick<GuestDto, "id" | "firstName" | "lastName">[];
};

type SetReservationGuest = Omit<GuestData, "songs" | "reservationId"> & {
  songs: Pick<SongData, "name" | "artist">[];
  hasMealRestriction: "yes" | "no";
};

export type SetReservationBody = {
  guests: SetReservationGuest[];
};

export type AddTableBody = Pick<TableData, "name">;

export type UpdateTableBody = {
  name: string;
};

export type UpdateTableOrderBody = {
  prevOrder: number;
  nextOrder: number;
};

export type AddTableAssignmentBody = {
  guestId: number;
  tableId: number;
};

export type RemoveTableAssignmentParams = {
  guestId: number;
};

export type EditTableParams = UpdateTableBody & {
  tableId: number;
};

export type EditTableOrderParams = UpdateTableOrderBody & {
  tableId: number;
};

export type DeleteTableParams = {
  tableId: number;
};

export type EmptyResponse = Record<string, never>;
