-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

DROP FUNCTION IF EXISTS public.unassigned_guests_query();

CREATE OR REPLACE FUNCTION public.unassigned_guests_query()
    RETURNS TABLE(id integer, "firstName" text, "lastName" text, meal text, status text, "reservationId" text)
    LANGUAGE 'sql'
    VOLATILE
    PARALLEL UNSAFE
    COST 100    ROWS 1000 
    
AS $BODY$

  select
    guests.id,
    guests."firstName",
    guests."lastName",
    guests.meal,
    guests.status,
    guests."reservationId"
  from guests
    inner join reservations on guests."reservationId" = reservations.id
    left join "tableAssignments" on guests.id = "tableAssignments"."guestId"
  where "tableAssignments".id is null and 'dinner' = any(reservations.invitations)
  order by guests."firstName", guests."lastName" asc
$BODY$;
